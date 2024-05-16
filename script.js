function locomotiveAnimation() {
	gsap.registerPlugin(ScrollTrigger);

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
		smartphone: {
			smooth: true,
		},
	});

	locoScroll.on("scroll", ScrollTrigger.update);

	ScrollTrigger.scrollerProxy("#main", {
		scrollTop(value) {
			return arguments.length
				? locoScroll.scrollTo(value, 0, 0)
				: locoScroll.scroll.instance.scroll.y;
		},
		getBoundingClientRect() {
			return {
				top: 0,
				left: 0,
				width: window.innerWidth,
				height: window.innerHeight,
			};
		},
		pinType: document.querySelector("#main").style.transform
			? "transform"
			: "fixed",
	});

	const ourteamBg = document.querySelector(".ourteam-bg");
	const inner = document.querySelector(".section-inner");

	ScrollTrigger.create({
		scroller: "#main",
		trigger: ourteamBg,
		start: "top top",
		end: "+=100%",
		pin: inner,
		pinSpacing: false,
		pinType: "transform",
	});

	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	ScrollTrigger.refresh();
}

function loadingAnimation() {
	let tl = gsap.timeline();

	function loadingCounter() {
		const timer = document.querySelector(".count");
		let count = 0;

		const intervalId = setInterval(function () {
			if (count < 100) {
				timer.innerHTML = `${count++}`;
			} else {
				clearInterval(intervalId);
				timer.innerHTML = `${count}`;
				if (document.readyState === "complete") {
					tl.to("#loader", {
						opacity: 0,
						duration: 0.5,
						onComplete: function () {
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
					window.addEventListener("load", function () {
						tl.to("#loader", {
							opacity: 0,
							duration: 0.5,
							onComplete: function () {
								document.getElementById("loader").style.display = "none";
							},
						});
						tl.from(".content h1, .page-no", {
							opacity: 0,
							delay: 0.6,
							y: 200,
							stagger: 0.3,
						});
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

	if (window.innerWidth >= 1024) {
		Shery.mouseFollower({
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

function updateTimeFromAPI() {
	fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
		.then((response) => response.json())
		.then((data) => {
			const utcTimeString = data.utc_datetime;
			const utcTime = new Date(utcTimeString);
			const istOptions = {
				timeZone: "Asia/Kolkata",
				hour12: false,
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
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

document.addEventListener("DOMContentLoaded", () => {
	if (window.location.pathname === "/index.html") {
		loadingAnimation();
	}

	if (window.location.pathname === "/contact.html") {
		setInterval(updateTimeFromAPI, 1000);
		updateTimeFromAPI();
	}
	locomotiveAnimation();
	cursorAnimation();
});
