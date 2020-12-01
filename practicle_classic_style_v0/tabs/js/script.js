window.addEventListener("DOMContentLoaded", function () {
	"use strick";

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	// Запускаем функцию что-бы скрыть все элементы, но при этом в аргумент функции передаем значения что-бы потом оставить 1 там видимым
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].removeClass('show');
			tabContent[i].addClass('hide');
		}
	}
	hideTabContent(1);

	// функция что-бы показать скрытые элементы
	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');

		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;
		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target === tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});
});