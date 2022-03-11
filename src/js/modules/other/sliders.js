//================================================================================
import Swiper, { Autoplay, Navigation, Scrollbar } from 'swiper';
// Autoplay, Navigation, Pagination, Controller, Scrollbar, Thumbs

window.addEventListener("load", () => { initSliders(); });

function initSliders() {
	const slidersArray = document.querySelectorAll('[data-swiper]');
	if (slidersArray.length) {
		slidersArray.forEach(sliderItem => {
			const sliderWrapper = sliderItem.firstElementChild;
			const sliderSlides = sliderWrapper.children;

			const sliderArrows = sliderItem.querySelector('[data-swiper-arrows]');
			const sliderScrollbar = sliderItem.querySelector('[data-swiper-scrollbar]');

			sliderItem.classList.add('swiper');
			sliderWrapper.classList.add('swiper-wrapper');
			for (let index = 0; index < sliderSlides.length; index++) {
				const sliderSlide = sliderSlides[index];
				sliderSlide.classList.add('swiper-slide');
			}

			if (sliderArrows) {
				sliderArrows.firstElementChild.classList.add('swiper-button', 'swiper-button-prev');
				sliderArrows.lastElementChild.classList.add('swiper-button', 'swiper-button-next');
			}
			if (sliderScrollbar) {
				sliderScrollbar.classList.add('swiper-scrollbar');
				sliderScrollbar.firstElementChild.classList.add('swiper-scrollbar-drag');
			}
		});
		setSliders();
	}
}

function setSliders() {
	if (document.querySelector('.slider-coaches')) {
		const coachesSlider = new Swiper('.slider-coaches', {
			modules: [Autoplay, Navigation, Scrollbar],
			observer: true,
			observeParents: true,
			speed: 800,
			navigation: {
				nextEl: '.slider-coaches .swiper-button-next',
				prevEl: '.slider-coaches .swiper-button-prev',
			},
			scrollbar: {
				el: '.slider-coaches .swiper-scrollbar',
				draggable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 15,
				},
				480: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
				768: {
					slidesPerView: 'auto',
					spaceBetween: 40,
				},
			},
		});
	}
}
//================================================================================