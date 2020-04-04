const modals = () => {

	let btnPressed = false;

	function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
		let trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector),
			window = document.querySelectorAll('[data-modal]'),
			scroll = calcScroll();

		//триггер для клика
		trigger.forEach((item) => {
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();
				}

				btnPressed = true;

				if (destroy) {
					item.remove();
				}
				// скрываем предыдущие окна по дата-атрибуту
				window.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animate', 'fadeIn');
				});
				// показываем модальное окно и скрываем скролл
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.marginRight = `${scroll}px`;

			});
		});

		// закрываем при клике на крестик
		close.addEventListener('click', () => {
			// также все предыдущие окна
			window.forEach(item => {
				item.style.display = 'none';
			});
			modal.style.display = 'none';
			document.body.style.overflow = '';
			document.body.style.marginRight = `0px`;

		});

		//закрываем при клике на подложку
		modal.addEventListener('click', (e) => {
			// проверка на таргет и что-бы нужные нам окна не закрывались при клике на подложку(флаг по умолчанию true)
			if (e.target === modal) {

				window.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'none';
				document.body.style.overflow = '';
				document.body.style.style.marginRight = `0px`;

			}
		});
	}

	// убираем баг при выводе модального окна
	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflowY = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);

		let scrollWidth = div.offsetWidth - div.clientWidth;

		div.remove();
		return scrollWidth;
	}
	//функция запуска модального окна когда мы пролистали до конца страницы
	let openByScroll = (selector) => {

		let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

		window.addEventListener('scroll', () => {
			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
				document.querySelector(selector).click();
			}

		});
	};


	// открыть модальное окно через определенное время
	function showModalByTime(selector, time) {
		setTimeout(function () {
			let display;

			document.querySelectorAll('[data-modal]').forEach(item => {
				// если модальное окно которое мы перебираем будет показано пользователю то выполняется условие
				if (getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
				//если не одно модальное окно не показано то мы показуем модальное окно
				if (!display) {
					document.querySelector(selector).style.display = 'block';
					document.body.style.overflow = "hidden";
				}
			});
		}, time);
	}
	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
	openByScroll('.fixed-gift');

	// showModalByTime('.popup-consultation', 5000);
};


export default modals;