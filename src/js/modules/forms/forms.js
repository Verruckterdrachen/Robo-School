//================================================================================

// data-validate - для поля формы
// data-error="text" = вывод блока ошибки под полем
//  @text - текст ошибки

// .focus - появляется при фокусировке на поле
// .error - появляется при ошибки на поле

import { modules } from "../modules.js";
import "inputmask/dist/inputmask.min.js";

export function formFieldsInit() {
	// Получаем все поля с placeholder
	const formFields = document.querySelectorAll('input[placeholder],textarea[placeholder]');
	if (formFields.length) {
		// Создаем для каждого свой data-placeholder
		formFields.forEach(formField => {
			formField.dataset.placeholder = formField.placeholder;
		});
	}
	// Слушаем весь body на вхождение фокуса
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') && (targetElement.type !== 'tel')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = '';
			}
			formValidate.removeError(targetElement);
		}
		if (targetElement.type === 'tel') {
			const mask = '+7(___)-___-__-__'.replaceAll('_', '9');
			Inputmask({ "mask": mask, showMaskOnHover: false }).mask(targetElement);
		}
	});
	// Слушаем весь body на выход фокуса
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (targetElement.dataset.placeholder) {
				targetElement.placeholder = targetElement.dataset.placeholder;
			}
			if (targetElement.hasAttribute('data-validate')) {
				formValidate.validateInput(targetElement);
			}
		}
	});
}

export let formValidate = {
	getErrors(form) {
		let error = 0;
		const formItemsRequired = form.querySelectorAll('[data-validate]');
		if (formItemsRequired.length) {
			formItemsRequired.forEach(formItemRequired => {
				if (formItemRequired.offsetParent !== null && !formItemRequired.disabled) {
					error += this.validateInput(formItemRequired);
				}
			});
		}
		return error;
	},
	validateInput(formItem) {
		let error = 0;
		if (formItem.type === 'email') {
			if (this.emailTest(formItem)) {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		} else if (formItem.type === 'tel') {
			let numbers = formItem.value;
			// Отслеживаем нужное кол-во введенных цифр
			numbers = numbers.replace(/[^0-9]/g, '');
			if (numbers.length < 11) {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		} else if (formItem.type === 'checkbox' && !formItem.checked) {
			this.addError(formItem);
			error++;
		} else {
			// Проверка на пустую строку
			if (formItem.value.trim() === '') {
				this.addError(formItem);
				error++;
			} else {
				this.removeError(formItem);
			}
		}
		return error;
	},
	addError(formItem) {
		formItem.classList.add('error');
		const inputError = formItem.parentElement.querySelector('.form__error');
		if (inputError) { formItem.parentElement.removeChild(inputError); }
		if (formItem.dataset.error) {
			formItem.parentElement.insertAdjacentHTML(
				'beforeend',
				`<div class = "form__error">${formItem.dataset.error}</div>`
			)
		}
	},
	formClean(form, popupSubmitId) {
		form.reset();
		setTimeout(() => {
			const inputs = form.querySelectorAll('input,textarea');
			inputs.forEach(input => input.classList.remove('focus'));
			if (modules.popup.includes(popupSubmitId)) {
				modules.popup.splice(modules.popup.indexOf(popupSubmitId), 1);
			}
		}, 0);
	},
	removeError(formItem) {
		formItem.classList.remove('error');
		if (formItem.parentElement.querySelector('.form__error')) {
			formItem.parentElement.removeChild(formItem.parentElement.querySelector('.form__error'));
		}
	},
	// Стандартная проверка на валидный e-mail
	emailTest(formItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formItem.value);
	}
}

// Имитация отправки формы со всплывающим попапом
export function formSubmit() {
	const forms = document.forms;
	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', (e) => {
				const form = e.target;
				formSubmitAction(form, e);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = formValidate.getErrors(form);
		if (error === 0) {
			const popupSubmit = form.querySelector('button[type=submit]');
			const popupSubmitId = popupSubmit.dataset.popupOpen;
			e.preventDefault();
			// Чтобы попап стал отслеживатся по его id в атрибуте data-popup-open
			// необходимо на время добавить его в список доступных попапов
			if (!modules.popup.includes(popupSubmitId)) {
				modules.popup.push(popupSubmitId);
			}
			formValidate.formClean(form, popupSubmitId);
		} else {
			e.preventDefault();
		}
	}
}
//================================================================================