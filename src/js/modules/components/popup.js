//================================================================================

// data-popup="id" - для попапа
//  @id - id секции
// data-popup-close - закрывающий попап элемент
// data-popup-open="id" - кнопка открытия попапа
//  @id - id открывабщего попапа

// .popup--open - стиль открытого попапа
// ! Все попапы, кроме попапа после отправки формы, стоит добавлять в modules.js !

import { focusTrap, scrollLockToggle } from "../functions.js";
import { modules } from "../modules.js";

function popup() {
	const popupOpenButtons = document.querySelectorAll('[data-popup-open]');
	if (popupOpenButtons.length) {
		popupOpenButtons.forEach(popupOpen => {
			const popupId = popupOpen.dataset.popupOpen;
			const popup = document.querySelector(`[data-popup="${popupId}"]`);
			// При наличии > 1 закрывающего элемента
			const popupClose = Array.from(popup.querySelectorAll('[data-popup-close]'));
			const popupWrapper = popup.firstElementChild;
			document.addEventListener('click', popupEvents);
			function popupEvents(e) {
				if (e.target === popupOpen) {
					// setTimeout для корректной работы попапа при заполненной форме
					setTimeout(() => {
						if (modules.popup.includes(popupId)) {
							popupStyles(popupClose[0]);
							document.addEventListener('keydown', popupKeyboard);
						}
					}, 0);
				} else if (popupClose.includes(e.target) || e.target === popupWrapper) {
					popupStyles(popupOpen);
				}
			}
			function popupStyles(popupElement) {
				scrollLockToggle();
				popup.classList.toggle('popup--open');
				popupElement.focus();
				// При закрытии попапа отменяем прослушку клавиатуры
				popupElement === popupOpen ? document.removeEventListener('keydown', popupKeyboard) : null;
			}
			function popupKeyboard(e) {
				if (e.key === 'Escape') { popupStyles(popupOpen); }
				if (e.key === 'Tab' || e.shiftKey && e.key === 'Tab') {
					focusTrap(e, popupWrapper, e.shiftKey && e.key === 'Tab');
				}
			}
		});
	}
}

popup();
//================================================================================