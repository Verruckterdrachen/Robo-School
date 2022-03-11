//================================================================================

// data-anim="dir,length,duration,delay" - для анимируемого элемента
//  @dir - направление конечного положения
//   {top} - вверх
//   {right} - вправа
//   {bottom} - вниз
//   {left} - влево
//  @length - дистанция в px
//  @duration - продолжительность в секундах
//  @delay - задержка в секундах

const animArray = document.querySelectorAll('[data-anim]');

if (animArray.length) {
	window.addEventListener('scroll', anim);
	function anim() {
		animArray.forEach(animItem => {
			const animHeight = animItem.offsetHeight;
			const animOffset = offset(animItem);
			const animStart = 40;

			let animPoint = window.innerHeight - animHeight / animStart;
			if (animPoint > window.innerHeight) {
				animPoint = window.innerHeight - window.innerHeight / animStart;
			}

			const animData = animItem.dataset.anim.split(',');
			const animDir = animData[0];
			const animLen = animData[1];
			const animDur = animData[2] * 1000;
			const animDel = animData[3] * 1000;

			let xPos, yPos;
			switch (animDir) {
				case 'top': xPos = 0; yPos = animLen; break;
				case 'right': xPos = -animLen; yPos = 0; break;
				case 'bottom': xPos = 0; yPos = -animLen; break;
				case 'left': xPos = animLen; yPos = 0; break;
			}
			if (!animItem.hasAttribute('data-anim-complete')) {
				animItem.style.opacity = 0;
				animItem.style.transform = `translate(${xPos}px,${yPos}px)`;
				// Запуск стилей с учетом задержки
				setTimeout(() => {
					if ((scrollY > animOffset - animPoint) && scrollY < (animOffset + animHeight)) {
						animItem.style.opacity = 1;
						animItem.style.transform = `translate(0)`;
						animItem.style.transitionDuration = `${animDur / 1000}s`;
						animItem.setAttribute('data-anim-complete', true);
						// Удаление атрибута style по истечению анимации
						setTimeout(() => {
							animItem.removeAttribute('style');
						}, animDur);
					}
				}, animDel);
			}
		});
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollTop = window.scrollY || document.documentElement.scrollTop;
		return rect.top + scrollTop;
	}
	anim();
}
//================================================================================