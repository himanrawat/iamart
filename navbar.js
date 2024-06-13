document.addEventListener("DOMContentLoaded", () => {
	const menuToggle = document.getElementById("menuToggle");
	const menuBar = gsap.timeline({ paused: true });

	menuBar
		.to(
			".bar-1",
			{ attr: { d: "M8,2 L2,8" }, x: 1, ease: Power2.easeInOut },
			"start"
		)
		.to(".bar-2", { autoAlpha: 0 }, "start")
		.to(
			".bar-3",
			{ attr: { d: "M8,8 L2,2" }, x: 1, ease: Power2.easeInOut },
			"start"
		);

	menuBar.reverse();

	const navTl = gsap.timeline({ paused: true });

	navTl
		.to(".fullpage-menu", { display: "block", ease: Expo.easeInOut })
		.to(".menu-bg", { opacity: 1, ease: Expo.easeInOut })
		.from(
			".main-menu li a",
			{ y: "100%", rotateY: 30, stagger: 0.2, ease: Expo.easeInOut },
			"-=0.5"
		);

	navTl.reverse();

	menuToggle.addEventListener("click", () => {
		menuBar.reversed(!menuBar.reversed());
		navTl.reversed(!navTl.reversed());
	});
});
