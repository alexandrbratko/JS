const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
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
				// скрываем предыдущие окна по дата-атрибуту
				window.forEach(item => {
					item.style.display = 'none';
				});
				// показываем модальное окно и скрываем скролл
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
				document.body.style.style.marginRight = `${scroll}px`;

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
			document.body.style.style.marginRight = `0px`;

		});

		//закрываем при клике на подложку
		modal.addEventListener('click', (e) => {
			// проверка на таргет и что-бы нужные нам окна не закрывались при клике на подложку(флаг по умолчанию true)
			if (e.target === modal && closeClickOverlay) {

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
	// открыть модальное окно через определенное время
	function showModalByTime(selector, time) {
		setTimeout(function () {
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = "hidden";
		}, time);
	}
	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');
	bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
	bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
	bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
	// showModalByTime('.popup', 3000);
};


export default modals;