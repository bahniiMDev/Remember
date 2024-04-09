const motionItemMenu = document.querySelector('#motion'),
	menuList = document.querySelector('.header__menu'),
	menuItems = document.querySelectorAll('.menu__item'),
	menuBurgerButton = document.querySelector('.menu__burger')

let activItem = menuItems[0]
let aIndexMot = menuItems[0]

function setMotionStyle(who) {
	motionItemMenu.style.left = `${who.offsetLeft}px`
	motionItemMenu.style.top = `${who.offsetTop}px`
	motionItemMenu.style.width = `${who.offsetWidth}px`
	motionItemMenu.style.height = `${who.offsetHeight}px`
}
function setMotionStyleClick(who) {
	motionItemMenu.style.left = `${
		who.offsetLeft + (who.offsetWidth - who.offsetWidth * 0.7) / 2
	}px`
	motionItemMenu.style.top = `${
		who.offsetTop + (who.offsetHeight - who.offsetHeight * 0.8) / 2
	}px`
	motionItemMenu.style.width = `${who.offsetWidth * 0.7}px`
	motionItemMenu.style.height = `${who.offsetHeight * 0.8}px`
}

window.addEventListener('load', () => {
	setMotionStyle(activItem)
})

const anActive = e => {
	return e.target.closest('.menu__link') ? e.target.parentElement : e.target
}

function toEnter(e) {
	aIndexMot = anActive(e)
	setMotionStyle(e.target)
}
function toDown(e) {
	activItem = anActive(e)
	setMotionStyleClick(activItem)
}

menuItems.forEach(item => {
	item.addEventListener('mouseenter', toEnter)
	item.addEventListener('mousedown', toDown)
	item.addEventListener('mouseup', () => setMotionStyle(activItem))
})

window.addEventListener('resize', () => {
	setMotionStyle(activItem)
})

let isMobileSize = window.matchMedia('(width <= 460px)')

menuList.addEventListener('mouseleave', e => {
	if (aIndexMot != activItem) {
		motionItemMenu.style.transitionDuration = `0.5s`

		motionItemMenu.style.width = `${activItem.offsetWidth * 0.5}px`
		motionItemMenu.style.height = `${activItem.offsetHeight * 0.5}px`
		motionItemMenu.style.left = `${
			motionItemMenu.offsetLeft +
			(motionItemMenu.offsetWidth - motionItemMenu.offsetWidth * 0.5) / 2
		}px`
		motionItemMenu.style.top = isMobileSize.matches
			? `${
					activItem.offsetTop +
					(activItem.offsetHeight - activItem.offsetHeight * 0.5)
			  }px`
			: `${
					activItem.offsetTop +
					(activItem.offsetHeight - activItem.offsetHeight * 0.5) / 2
			  }px`
		setTimeout(() => {
			!isMobileSize.matches
				? (motionItemMenu.style.left = `${activItem.offsetLeft}px`)
				: null
			motionItemMenu.style.transitionDuration = `0.75s`
			motionItemMenu.children[0].style.backgroundColor =
				'rgba(255, 255, 255, 0.25)'
		}, 150)

		setTimeout(() => {
			isMobileSize.matches
				? (motionItemMenu.style.left = `${activItem.offsetLeft}px`)
				: null
			motionItemMenu.style.transitionDuration = `0.5s`
			motionItemMenu.style.width = `${activItem.offsetWidth}px`
			motionItemMenu.style.top = `${activItem.offsetTop}px`
			motionItemMenu.style.height = `${activItem.offsetHeight}px`
		}, 350)
		setTimeout(() => {
			document.querySelector('.menu__motion-item span').style.backgroundColor =
				'rgba(255, 255, 255, 1)'
		}, 500)
	}
})
const menu = document.querySelector('.menu__list')
menuBurgerButton.addEventListener('click', () => {
	motionItemMenu.children[0].style.backgroundColor = '#ffffff00'
	menuBurgerButton.classList['1']
		? menuBurgerButton.classList.remove('menu__burger-active')
		: menuBurgerButton.classList.add('menu__burger-active')
	menu.classList['1']
		? menu.classList.remove('menu__list-show')
		: menu.classList.add('menu__list-show')

	menu.classList['1']
		? setTimeout(() => {
				motionItemMenu.children[0].style.backgroundColor = '#fff'
				setMotionStyle(activItem)
		  }, 800)
		: (motionItemMenu.style.top = `-25%`)
})

const text = SplitType.create('.main-text__title')
text.chars

gsap
	.timeline({ delay: 1.2 })
	.from('#main-text__title-1 .line .word .char', {
		yPercent: 200,
		duration: 0.6,
		ease: 'power4.out',
		stagger: 0.02,
	})
	.from(
		'#main-text__title-2 .line .word .char',
		{
			yPercent: 200,
			duration: 0.6,
			ease: 'power4.out',
			stagger: 0.02,
		},
		'-=0.4'
	)

gsap.registerPlugin(ScrollTrigger)
//str = '.projects__text'

function createDefaultTextAnimation(str) {
	const textNoteProjects = SplitType.create(str, {
		types: 'line',
	})
	textNoteProjects.lines.forEach(e => {
		const newText = e.innerHTML
		e.innerHTML = ''
		e.insertAdjacentHTML('afterbegin', `<div class="line2">${newText}</div>`)
	})

	gsap.set(`${str} .line .line2`, {
		yPercent: 150,
	})
	const tl = gsap.timeline()

	setTimeout(() => {
		tl.to(`${str} .line .line2`, {
			yPercent: 0,
			duration: 30,
			delay: 0.2,
			stagger: 2,
			ease: 'back.out(2)',
			scrollTrigger: {
				start: 'top 90%',
				scrub: 2,
				end: 'bottom 40%',
				trigger: `${str}`,
			},
		})
	}, 1200)
}

createDefaultTextAnimation('.info__text')
createDefaultTextAnimation('.projects__text')
createDefaultTextAnimation('#expertise__cart-text1')
createDefaultTextAnimation('#expertise__cart-text2')
createDefaultTextAnimation('#expertise__cart-text3')
createDefaultTextAnimation('#expertise__cart-text4')
createDefaultTextAnimation('.coment__text')

document.querySelectorAll('.cart__img').forEach(e => {
	gsap.set(e, {
		transformOrigin: 'center center',
		opacity: 0,
		scale: 0.5,
		x: `${
			window.matchMedia('(max-width: 460px)').matches
				? Math.random() >= 0.5
					? 200
					: -200
				: e.offsetLeft > document.body.offsetWidth / 2
				? 200
				: -200
		}px`,
	})
})

document.querySelectorAll('.cart__img').forEach(e => {
	setTimeout(() => {
		gsap.to(e, {
			scale: 1,
			opacity: 1,
			x: 0,
			duration: 0.4,
			//toggleActions: 'play pause resume reset',
			ease: 'ease.out',
			scrollTrigger: {
				start: 'top 90%',
				end: 'bottom 40%',
				trigger: e,
			},
		})
	}, 1200)
})

//function createDefaultTextAnimation2(el) {
//	const textNoteProjects = SplitType.create(el, {
//		types: 'line',
//	})

//	textNoteProjects.lines.forEach(e => {
//		const newText = e.innerHTML
//		e.innerHTML = ''
//		e.insertAdjacentHTML('afterbegin', `<div class="line2">${newText}</div>`)
//	})

//	el.childNodes.forEach(e => {
//		gsap.set(e.children[0], {
//			yPercent: 200,
//		})
//	})
//	const tl = gsap.timeline()
//	setTimeout(() => {
//		el.childNodes.forEach((e, i) => {
//			tl.to(e.children[0], {
//				yPercent: 0,
//				duration: 0.6,
//				delay: i * 0.5,
//				ease: 'back.out(2)',
//				scrollTrigger: {
//					start: 'center 90%',
//					end: 'center 20%',
//					scrub: 1,
//					trigger: e,
//					markers: true,
//				},
//			})
//		})
//	}, 1200)
//}
//document.querySelectorAll('.expertise__cart-text').forEach(e => {
//	createDefaultTextAnimation2(e)
//})
// document.getElementById("animate").onclick = function () {
//   tl.restart();
// };

// gsap.set(".header__menu", {ease: "back.out"})
// let isMobile = window.matchMedia("(max-width: 460px)");
// let headerTL = gsap.timeline()
// gsap.set("body", { overflow: "hidden" })
// headerTL.set(".screen-hide", {
//   opacity: 0, ease: "ease.out",
// });
// if (!isMobile.matches) {
//   headerTL
//     .set(".menu__item", { opacity: 0, yPercent: 100 })
//     .from(".header__logo", {
//       delay: 1.2,
//       duration: 1.2,
//       width: "100vw",
//       height: "100lvh",
//       ease: "back.inOut(1)",
//     })
//     .from(
//       ".header__logo svg path",
//       {
//         yPercent: function () {
//           return Math.random() < 0.5
//             ? -(Math.random() * 100 + 200)
//             : Math.random() * 100 + 200;
//         },
//         opacity: 0,
//         ease: "back.out(2)",
//         stagger: {
//           from: "random",
//           each: 0.2,
//         },
//         duration: 0.4,
//       },
//       "-=2"
//     )
//     .from(
//       ".header__menu",
//       {
//         duration: 0.8,
//         width: 40,
//         height: 40,
//         ease: "back.out",
//         delay: 0.6,
//       },
//       "-=0.4"
//     )
//     .from(
//       ".header__menu",
//       {
//         w: 0,
//         opacity: 0,
//         scale: 0,
//         transform: "translatey(-75px)",
//         duration: 0.8,
//         ease: "back.out",
//       },
//       "-=1.2"
//     )
//     .to(
//       ".menu__item",
//       { opacity: 1, duration: 0.4, yPercent: 0, ease: "ease", stagger: 0.1 },
//       "-=0.6"
//     );
// }
// if (isMobile.matches) {
//   headerTL
//     .set(".header__menu", {
//       opacity: 0,
//       display: "none",
//       padding: "0px",
//       xPercent: 300,
//     })
//     .set("body", { overflow: "hidden" })
//     .set(".menu__item", { opacity: 0, yPercent: 100 })
//     .from(".header__logo", {
//       delay: 1.2,
//       duration: 1.2,
//       width: "100vw",
//       height: "100lvh",
//       ease: "back.inOut(1)",
//     })
//     .from(
//       ".header__logo svg path",
//       {
//         yPercent: function () {
//           return Math.random() < 0.5
//             ? -(Math.random() * 100 + 200)
//             : Math.random() * 100 + 200;
//         },
//         opacity: 0,
//         ease: "back.out(2)",
//         stagger: {
//           from: "random",
//           each: 0.2,
//         },
//         duration: 0.4,
//       },
//       "-=2"
//     )
//     .set(
//       ".header__menu",
//       {
//         display: "flex",
//       },
//       "-=0.6"
//     )
//     .to(
//       ".header__menu",
//       {
//         xPercent: 0,
//         padding: "5px",
//         opacity: 1,
//         ease: "back.out",
//         duration: 0.4,
//       },
//       "-=0.4"
//     );
// }
// let isMobileold = isMobile.matches;
// headerTL.set("body", { overflow: "visible" });
// window.addEventListener("resize", () => {
//   if (isMobileold != isMobile.matches) {
//     isMobileold = isMobile.matches;
//     headerTL.set(".screen-hide", {
//       opacity: 1, ease: "ease.out",
//     });
//     if (!isMobile.matches) {
//       headerTL.set(".screen-hide", {
//         opacity: 0, ease: "ease.out",
//       })
//         .set(
//           ".header__menu",
//           {
//             height: " calc(40px + (56 - 40) * ((100vw - 375px) / (768 - 375)))",
//             background: "#000",
//             padding: "5px",
//             justifyContent: "center",
//           },
//           "-=0.4"
//         )
//         .set(".header__list", {
//           width: "100%",
//         })
//         .set("body", { overflow: "hidden" })
//         .set(".menu__item", { opacity: 0, yPercent: 100 })
//         .from(".header__logo", {
//           delay: 1.2,
//           duration: 1.2,
//           width: "100vw",
//           height: "100lvh",
//           ease: "back.inOut(1)",
//         })
//         .from(
//           ".header__logo svg path",
//           {
//             yPercent: function () {
//               return Math.random() < 0.5
//                 ? -(Math.random() * 100 + 200)
//                 : Math.random() * 100 + 200;
//             },
//             opacity: 0,
//             ease: "back.out(2)",
//             stagger: {
//               from: "random",
//               each: 0.2,
//             },
//             duration: 0.4,
//           },
//           "-=2"
//         )
//         .from(
//           ".header__menu",
//           {
//             duration: 0.8,
//             width: 40,
//             height: 40,
//             ease: "back.out",
//             delay: 0.6,
//           },
//           "-=0.4"
//         )
//         .from(
//           ".header__menu",
//           {
//             w: 0,
//             opacity: 0,
//             scale: 0,
//             transform: "translatey(-75px)",
//             duration: 0.8,
//             ease: "back.out",
//           },
//           "-=1.2"
//         )
//         .to(
//           ".menu__item",
//           {
//             opacity: 1,
//             duration: 0.4,
//             yPercent: 0,
//             ease: "ease",
//             stagger: 0.1,
//           },
//           "-=0.6"
//         ).set("body", { overflow: "visible" });
//     }
//     if (isMobile.matches) {
//       headerTL.set(".screen-hide", {
//         opacity: 1, ease: "ease.out",
//       })
//         .set(".header__menu", {
//           opacity: 0,
//           height: "calc(40px + (56 - 40) * ((100vw - 375px) / (768 - 375)))",
//           background: "transparent",
//           justifyContent: "flex-end",
//           display: "none",
//           padding: "0px",
//           xPercent: 50,
//         })
//         .set("body", { overflow: "hidden" })
//         .set(".menu__item", { opacity: 0, yPercent: 100 })
//         .from(".header__logo", {
//           delay: 1.2,
//           duration: 1.2,
//           width: "100vw",
//           height: "100lvh",
//           ease: "back.inOut(1)",
//         })
//         .from(
//           ".header__logo svg path",
//           {
//             yPercent: function () {
//               return Math.random() < 0.5
//                 ? -(Math.random() * 100 + 200)
//                 : Math.random() * 100 + 200;
//             },
//             opacity: 0,
//             ease: "back.out(2)",
//             stagger: {
//               from: "random",
//               each: 0.2,
//             },
//             duration: 0.4,
//           },
//           "-=2"
//         )
//         .set(
//           ".header__menu",
//           {
//             display: "flex",
//           },
//           "-=0.6"
//         )
//         .to(
//           ".header__menu",
//           {
//             xPercent: 0,
//             opacity: 1,
//             ease: "back.out",
//             duration: 0.4,
//           },
//           "-=0.4"
//         ).set("body", { overflow: "visible" });
//     }
//   }
// });
