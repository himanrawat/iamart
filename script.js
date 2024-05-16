function locomotiveAnimation() {
	gsap.registerPlugin(ScrollTrigger);

	// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
		smartphone: {
			smooth: true,
		},
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
	const ourteamBg = document.querySelector(".ourteam-bg"); // Corrected from gsap.utils to document.querySelector
	const inner = document.querySelector(".section-inner"); // Assuming you meant to select the section-inner class

	ScrollTrigger.create({
		scroller: "#main",
		trigger: ourteamBg,
		start: "top top",
		end: "+=100%",
		pin: inner,
		pinSpacing: false,
		pinType: "transform",
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
}

function cursorAnimation() {
	let videoContainer = document.querySelector(".video-container");
	let video = document.querySelector(".video-container video");

	// Your cursor animation code here
	// Check if the device is in desktop mode based on viewport width
	if (window.innerWidth >= 1024) {
		Shery.mouseFollower({
			//Parameters are optional.
			skew: true,
			ease: "cubic-bezier(0.23, 1, 0.320, 1)",
			duration: 1,
		});
		Shery.makeMagnet(".logo, .navitems a ", {
			ease: "cubic-bezier(0.23, 1, 0.320, 1)",
			duration: 1,
		});
		if (videoContainer) {
			videoContainer.addEventListener("mouseenter", function () {
				videoContainer.addEventListener("mousemove", function (dets) {
					gsap.to(".mousefollower", {
						opacity: 0,
					});
					gsap.to("#video-cursor", {
						left: dets.x - 500,
						top: dets.y - 200,
					});
				});
			});
			videoContainer.addEventListener("mouseleave", function () {
				gsap.to(".mousefollower", {
					opacity: 1,
				});
				gsap.to("#video-cursor", {
					left: "80%",
					top: "-10%",
				});
			});

			videoContainer.addEventListener("click", function () {
				if (video.paused) {
					video.play();
					video.style.opacity = 1;
					document.querySelector(
						"#video-cursor"
					).innerHTML = `<i class="fa-solid fa-pause" style="color: #ffffff; font-size: 2vw"></i>`;
					gsap.to("#video-cursor", {
						scale: 0.8,
					});
				} else {
					video.pause();
					video.style.opacity = 1;
					document.querySelector("#video-cursor").innerHTML = `<i
						class="fa-solid fa-play play-icon"
						style="color: #ffffff; font-size: 2vw"
					></i>`;
					gsap.to("#video-cursor", {
						scale: 1,
					});
				}
			});
		} else {
			// For mobile devices, add touch event listeners
			videoContainer.addEventListener("touchstart", function () {
				if (video.paused) {
					video.play();
					video.style.opacity = 1;
					document.querySelector("#video-cursor").style.opacity = 0;
				} else {
					video.pause();
					video.style.opacity = 1;
					document.querySelector("#video-cursor").style.opacity = 1;
					document.querySelector("#video-cursor").innerHTML = `<i
						class="fa-solid fa-play play-icon"
						style="color: #ffffff; font-size: 2vw"
					></i>`;
					gsap.to("#video-cursor", {
						scale: 1,
					});
				}
			});
		}
	}
}

// Fetch current time from WorldTimeAPI and update time display
function updateTimeFromAPI() {
	fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
		.then((response) => response.json())
		.then((data) => {
			const utcTimeString = data.utc_datetime;
			const utcTime = new Date(utcTimeString);
			const istOptions = {
				timeZone: "Asia/Kolkata", // Set the timezone to IST
				hour12: false, // Use 24-hour format
				hour: "numeric", // Display hour
				minute: "numeric", // Display minute
				second: "numeric", // Display second
			};
			const istTimeString = utcTime.toLocaleString("en-IN", istOptions);
			const [hours, minutes, seconds] = istTimeString.split(":");
			const formattedTime = `${hours}:${minutes} <span class="timestamp-seconds">${seconds}</span>`;
			document.querySelector(".current-time").innerHTML = formattedTime;
		})
		.catch((error) => {
			console.error("Error fetching time:", error);
		});
}

// Check if the current page is the contact page
if (window.location.pathname === "/index.html") {
	loadingAnimation();
}

if (window.location.pathname === "/contact.html") {
	// Update the time every second
	setInterval(updateTimeFromAPI, 1000);

	// Initial call to display the time immediately
}
updateTimeFromAPI();
locomotiveAnimation();
cursorAnimation();
