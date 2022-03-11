// ФУНКЦИИ =======================================================================

import * as functions from "./modules/functions.js";

// Проверка поддержки WebP
functions.isWebp();

// Исправление наложения нижней панели на смартфонах
functions.fullVHfix();

// Скролл фиксированного header
functions.headerScroll();

// КОМПОНЕНТЫ ====================================================================

// Бургер меню
import "./modules/components/headerMenu.js";

// Попап
import "./modules/components/popup.js";

// Спойлеры
// import "./modules/components/spoilers.js";

// Табы
import "./modules/components/tabs.js";

// Тултипы
import "./modules/components/tooltips.js";

// РАБОТА С ФОРМАМИ ==============================================================

import * as forms from "./modules/forms/forms.js";

// Валидация формы
forms.formFieldsInit();

// Отправка формы (Требуется подключение попапа)
forms.formSubmit();

// ПРОЧЕЕ ========================================================================

// Динамический адаптив
// import "./modules/other/dynamic-adapt.js";

// Параллакс мышью
// import "./modules/other/parallax-mouse.js";

// Анимация при скролле
// import "./modules/other/scroll.js";

// Swiper
import "./modules/other/sliders.js";

// Свои скрипты
// import "./modules/other/script.js";