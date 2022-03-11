//================================================================================

// .menu-toggle--open - для кнопки открытия меню
// .menu--open - для меню

import { focusTrap, scrollLockToggle } from "../functions.js";

function headerMenu() {
	const menuToggle = document.querySelector('.menu-toggle');
	if (menuToggle) {
		const menu = document.querySelector('.menu');
		menuToggle.addEventListener('click', menuStyles);
		function menuStyles() {
			let expanded = 'false' === menuToggle.getAttribute('aria-expanded');
			menuToggle.setAttribute('aria-expanded', expanded);
			if (!expanded) {
				menuToggle.setAttribute('aria-label', 'Открыть меню');
				document.removeEventListener('keydown', menuKeyboard);
			} else {
				menuToggle.setAttribute('aria-label', 'Закрыть меню');
				document.addEventListener('keydown', menuKeyboard);
			}
			menuToggle.classList.toggle('menu-toggle--open');
			menu.classList.toggle('menu--open');
			scrollLockToggle();
		}
		function menuKeyboard(e) {
			if (e.key === 'Escape') {
				menuToggle.focus();
				menuStyles();
			}
			if (e.key === 'Tab' || e.shiftKey && e.key === 'Tab') {
				focusTrap(e, menu, e.shiftKey && e.key === 'Tab', true, menuToggle);
			}
		}
	}
}

headerMenu();
//================================================================================