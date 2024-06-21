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
});
