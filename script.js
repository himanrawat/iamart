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

function cursorAnimation() {
	Shery.makeMagnet("nav img, .navitems a " /* Element to target.*/, {
		//Parameters are optional.
		ease: "cubic-bezier(0.23, 1, 0.320, 1)",
		duration: 1,
	});
}

function gooeyImg() {
	Shery.imageEffect(".image-container", {
		style: 6,
		gooey: true,
		// debug: true,
		config: {
			a: { value: 0.46, range: [0, 30] },
			b: { value: 0.75, range: [-1, 1] },
			zindex: { value: -9996999, range: [-9999999, 9999999] },
			aspect: { value: 0.7856871844263491 },
			ignoreShapeAspect: { value: true },
			shapePosition: { value: { x: 0, y: 0 } },
			shapeScale: { value: { x: 0.5, y: 0.5 } },
			shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
			shapeRadius: { value: 0, range: [0, 2] },
			currentScroll: { value: 0 },
			scrollLerp: { value: 0.07 },
			gooey: { value: true },
			infiniteGooey: { value: false },
			growSize: { value: 4, range: [1, 15] },
			durationOut: { value: 1, range: [0.1, 5] },
			durationIn: { value: 1.5, range: [0.1, 5] },
			displaceAmount: { value: 0.5 },
			masker: { value: false },
			maskVal: { value: 1, range: [1, 5] },
			scrollType: { value: 0 },
			geoVertex: { range: [1, 64], value: 1 },
			noEffectGooey: { value: false },
			onMouse: { value: 1 },
			noise_speed: { value: 0.2, range: [0, 10] },
			metaball: { value: 0.66, range: [0, 2] },
			discard_threshold: { value: 0.5, range: [0, 1] },
			antialias_threshold: { value: 0, range: [0, 0.1] },
			noise_height: { value: 0.2, range: [0, 2] },
			noise_scale: { value: 16.79, range: [0, 100] },
		},
	});
}

cursorAnimation();
locomotiveAnimation();
loadingAnimation();
gooeyImg();
