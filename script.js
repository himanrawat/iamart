document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);

	const locoScroll = new LocomotiveScroll({
		el: document.querySelector("#main"),
		smooth: true,
		smartphone: { smooth: true },
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

	ScrollTrigger.create({
		scroller: "#main",
		trigger: ".ourteam-bg",
		start: "top top",
		end: "+=100%",
		pin: ".section-inner",
		pinSpacing: false,
		pinType: "transform",
	});

	ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
	ScrollTrigger.refresh();

	let tl = gsap.timeline();

	function loadingCounter() {
		const timer = document.querySelector(".count");
		let count = 0;

		const intervalId = setInterval(() => {
			if (count < 100) {
				timer.innerHTML = `${count++}`;
			} else {
				clearInterval(intervalId);
				timer.innerHTML = `${count}`;
				if (document.readyState === "complete") {
					hideLoader();
				} else {
					window.addEventListener("load", hideLoader);
				}
			}
		}, 35);
	}

	function hideLoader() {
		tl.to("#loader", {
			opacity: 0,
			duration: 0.5,
			onComplete: () =>
				(document.getElementById("loader").style.display = "none"),
		}).from(".content h1, .page-no", {
			opacity: 0,
			delay: 0.6,
			y: 200,
			stagger: 0.3,
		});
	}

	tl.from(".loader-content h1, .loader-content-para", {
		y: 200,
		opacity: 0,
		duration: 1.3,
		stagger: 0.3,
	})
		.to(".animate", { animationName: "anime", opacity: 1 })
		.from(".counter", { opacity: 1, stagger: 0.3, onComplete: loadingCounter });

	const videoContainer = document.querySelector(".video-container");
	const video = document.querySelector(".video-container video");

	if (window.innerWidth >= 1024) {
		Shery.mouseFollower({
			skew: true,
			ease: "cubic-bezier(0.23, 1, 0.320, 1)",
			duration: 1,
		});
		Shery.makeMagnet(".logo, .navitems a", {
			ease: "cubic-bezier(0.23, 1, 0.320, 1)",
			duration: 1,
		});

		videoContainer.addEventListener("mouseenter", () => {
			videoContainer.addEventListener("mousemove", (dets) => {
				gsap.to(".mousefollower", { opacity: 0 });
				gsap.to("#video-cursor", { left: dets.x - 500, top: dets.y - 200 });
			});
		});

		videoContainer.addEventListener("mouseleave", () => {
			gsap.to(".mousefollower", { opacity: 1 });
			gsap.to("#video-cursor", { left: "80%", top: "-10%" });
		});

		videoContainer.addEventListener("click", () => {
			if (video.paused) {
				video.play();
				video.style.opacity = 1;
				document.querySelector(
					"#video-cursor"
				).innerHTML = `<i class="fa-solid fa-pause" style="color: #ffffff; font-size: 2vw"></i>`;
				gsap.to("#video-cursor", { scale: 0.8 });
			} else {
				video.pause();
				video.style.opacity = 1;
				document.querySelector(
					"#video-cursor"
				).innerHTML = `<i class="fa-solid fa-play play-icon" style="color: #ffffff; font-size: 2vw"></i>`;
				gsap.to("#video-cursor", { scale: 1 });
			}
		});
	} else {
		videoContainer.addEventListener("touchstart", () => {
			if (video.paused) {
				video.play();
				video.style.opacity = 1;
				document.querySelector("#video-cursor").style.opacity = 0;
			} else {
				video.pause();
				video.style.opacity = 1;
				document.querySelector("#video-cursor").style.opacity = 1;
				document.querySelector(
					"#video-cursor"
				).innerHTML = `<i class="fa-solid fa-play play-icon" style="color: #ffffff; font-size: 2vw"></i>`;
				gsap.to("#video-cursor", { scale: 1 });
			}
		});
	}
});

// Select the social-icons container
const socialIconsContainer = document.querySelector(".social-icons");

// Define the social media links
const socialMediaLinks = {
	linkedin: "https://www.linkedin.com/company/iamartproduction/",
	instagram: "https://www.instagram.com/iamart.india?igsh=MWppZjAwcHA3bnpzeg==",
	facebook: "https://www.facebook.com/share/obxUATrgM2hJQwHi/?mibextid=LQQJ4d",
};

// Select all img elements inside the social-icons container
const socialIcons = socialIconsContainer.querySelectorAll("img");

// Loop through each icon and wrap it in an anchor tag with the respective link
socialIcons.forEach((icon) => {
	// Get the src attribute of the icon to identify the platform
	const iconSrc = icon.getAttribute("src");

	// Determine the platform from the src and get the respective URL
	let platform = "";
	if (iconSrc.includes("linkedin")) {
		platform = "linkedin";
	} else if (iconSrc.includes("instagram")) {
		platform = "instagram";
	} else if (iconSrc.includes("fb")) {
		platform = "facebook";
	}

	// Create a new anchor tag
	const link = document.createElement("a");
	link.href = socialMediaLinks[platform]; // Set the href attribute
	link.target = "_blank"; // Open link in a new tab

	// Insert the anchor tag before the icon and append the icon to the anchor tag
	icon.parentNode.insertBefore(link, icon);
	link.appendChild(icon);
});
