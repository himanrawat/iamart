function locomotiveAnimation() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});

	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}

function loadingAnimation() {
	let tl = gsap.timeline();

	function loadingCounter() {
		const timmer = document.querySelector(".count");
		let count = 0; // Start count from 0

		const intervalId = setInterval(function () {
			if (count < 100) {
				timmer.innerHTML = `${count++}`;
			} else {
				clearInterval(intervalId); // Stop the interval when count reaches 100
				timmer.innerHTML = `${count}`;
				// Check if the website has finished loading
				if (document.readyState === "complete") {
					// If the website has finished loading, hide the loader
					tl.to("#loader", {
						opacity: 0,
						duration: 0.5,
						onComplete: function () {
							// Optionally, you can remove the loader from the DOM
							document.getElementById("loader").style.display = "none";
						},
					});
					tl.from(".content h1, .page-no", {
						opacity: 0,
						delay: 0.6,
						y: 200,
						stagger: 0.3,
					});
				} else {
					// If the website hasn't finished loading, wait for it to finish
					window.addEventListener("load", function () {
						// Hide the loader after the website finishes loading
						tl.to("#loader", {
							opacity: 0,
							duration: 0.5,
							onComplete: function () {
								// Optionally, you can remove the loader from the DOM
								document.getElementById("loader").style.display = "none";
							},
						});
					});
					tl.from(".content h1, .page-no", {
						opacity: 0,
						delay: 0.6,
						y: 200,
						stagger: 0.3,
					});
				}
			}
		}, 35);
	}

	tl.from(".loader-content h1, .loader-content-para", {
		y: 200,
		opacity: 0,
		duration: 1.3,
		stagger: 0.3,
	});
	tl.to(".animate", {
		animationName: "anime",
		opacity: 1,
	});
	tl.from(".counter", {
		opacity: 1,
		stagger: 0.3,
		onComplete: loadingCounter,
	});

	document.addEventListener("mousemove", function (dets) {
		gsap.to("#crsr", {
			left: dets.x,
			top: dets.y,
		});
	});
}

loadingAnimation();

function cursorAnimation() {
	Shery.makeMagnet("nav img, .navitems a " /* Element to target.*/, {
		//Parameters are optional.
		ease: "cubic-bezier(0.23, 1, 0.320, 1)",
		duration: 1,
	});
}

cursorAnimation();
locomotiveAnimation();

// testing

function locomotiveAnimation() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
	});
	// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
	locoScroll.on("scroll", ScrollTrigger.update);

	// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		}, // we don't have to define a scrollLeft because we're only scrolling vertically.
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});

	// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

	// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
	ScrollTrigger.refresh();
}

function loadingAnimation() {
	let tl = gsap.timeline();
	tl.from(".loader-content h1, .loader-content-para", {
		y: 200,
		opacity: 0,
		stagger: 0.25,
		duration: 0.6,
		delay: 0.5,
	});
	tl.from(".counter", {
		opacity: 1,
		stagger: 0.3,
		onStart: function () {
			let timer = document.querySelector(".count");
			let count = 0;
			setInterval(function () {
				if (count < 100) {
					timer.innerHTML = count++;
				} else {
					timer.innerHTML = count;
				}
			}, 35);
		},
	});
	tl.to(".animate", {
		animationName: "anime",
		opacity: 1,
	});
	tl.to("#loader", {
		opacity: 0,
		duration: 0.2,
		delay: 2.6,
	});
	tl.from(".hero", {
		delay: 0.1,
		y: 1600,
		duration: 0.5,
		ease: Power4,
	});
	tl.to("#loader", {
		display: "none",
	});
	tl.from("nav", {
		opacity: 0,
	});
	tl.from(".content h1, .page-no", {
		opacity: 0,
		delay: 0.6,
		y: 200,
		stagger: 0.2,
	});
	tl.from(".video-shoot", {
		opacity: 0,
		x: 200,
		stagger: 0.3,
	});
	tl.from(".underline", {
		x: -1001,
		opacity: 0,
		duration: 1.3,
		stagger: 0.8,
	});
	// document.addEventListener("mousemove", function (dets) {
	// 	gsap.to("#crsr", {
	// 		left: dets.x,
	// 		top: dets.y,
	// 	});
	// });
}

loadingAnimation();

function cursorAnimation() {
	Shery.makeMagnet("nav img, .navitems a " /* Element to target.*/, {
		//Parameters are optional.
		ease: "cubic-bezier(0.23, 1, 0.320, 1)",
		duration: 1,
	});
}

cursorAnimation();
locomotiveAnimation();
