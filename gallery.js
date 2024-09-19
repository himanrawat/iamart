document.addEventListener("DOMContentLoaded", function () {
	const images = JSON.parse(document.body.dataset.images || "[]");

	const columns = Array.from({ length: 3 }, (_, i) =>
		document.getElementById(`parallax-column-${i + 1}`)
	);

	images.forEach((src, index) => {
		const img = document.createElement("img");
		img.dataset.src = src;
		img.classList.add("parallax-image");
		img.setAttribute("loading", "lazy");
		img.addEventListener("click", () => openImageSlider(index));
		columns[index % columns.length].appendChild(img);
	});

	const parallaxContainer = document.getElementById("parallax-scroll");

	const lazyLoadImages = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target;
				img.src = img.dataset.src;
				img.removeAttribute("data-src");
				observer.unobserve(img);
			}
		});
	};

	const observer = new IntersectionObserver(lazyLoadImages, {
		root: parallaxContainer,
		rootMargin: "0px",
		threshold: 0.1,
	});

	document
		.querySelectorAll("img[data-src]")
		.forEach((img) => observer.observe(img));

	parallaxContainer.addEventListener("scroll", () => {
		const scrollTop = parallaxContainer.scrollTop;
		columns.forEach((column, index) => {
			const direction = index % 2 === 0 ? -0.2 : 0.2;
			column.style.transform = `translateY(${scrollTop * direction}px)`;
		});
	});

	const imageSlider = document.getElementById("image-slider");
	const sliderImage = document.getElementById("slider-image");
	const prevBtn = document.querySelector(".prev-btn");
	const nextBtn = document.querySelector(".next-btn");

	let currentImageIndex = 0;

	const openImageSlider = (index) => {
		currentImageIndex = index;
		sliderImage.src = images[currentImageIndex];
		imageSlider.style.display = "flex";
	};

	const closeImageSlider = () => {
		imageSlider.style.display = "none";
	};

	const showNextImage = () => {
		currentImageIndex = (currentImageIndex + 1) % images.length;
		sliderImage.src = images[currentImageIndex];
	};

	const showPrevImage = () => {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
		sliderImage.src = images[currentImageIndex];
	};

	nextBtn.addEventListener("click", showNextImage);
	prevBtn.addEventListener("click", showPrevImage);

	imageSlider.addEventListener("click", (e) => {
		if (e.target === imageSlider || e.target === sliderImage) {
			closeImageSlider();
		}
	});

	// GSAP Loader Animation
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

	// Shery Integration
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
