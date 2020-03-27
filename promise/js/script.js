window.addEventListener("DOMContentLoaded", function () {
	"use strick";

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	// Запускаем функцию что-бы скрыть все элементы, но при этом в аргумент функции передаем значения что-бы потом оставить 1 там видимым
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
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

	// Timer 

	let deadline = '2020-03-24';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function addZero(num) {
				if (num <= 9) {
					return '0' + num;
				} else return num;
			};

			hours.textContent = addZero(t.hours);
			minutes.textContent = addZero(t.minutes);
			seconds.textContent = addZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}

	}

	setClock('timer', deadline);

	//modal
	let more = document.querySelector(".more"),
		overlay = document.querySelector(".overlay"),
		close = document.querySelector(".popup-close"),
		descrBtn = document.querySelectorAll(".description-btn");

	more.addEventListener("click", () => {
		overlay.style.display = "block";
		document.body.style.overflow = "hidden";
		// this.classList.add("more-splash");
	});
	close.addEventListener("click", () => {
		overlay.style.display = "none";
		more.classList.remove("more-splash");
		document.body.style.overflow = "";
	});

	descrBtn.forEach(tab => {
		tab.addEventListener('click', function () {
			overlay.style.display = 'block';
			// this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	//AJAX and promise
	let form = document.querySelector('.main-form'),
		formBottom = document.getElementById('form'),
		statusMessage = document.createElement('div'),
		input = document.getElementsByTagName('input');

	statusMessage.classList.add('status');

	let message = {
		loading: "Загрузка...",
		success: "Спасибо. Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так"
	};


	function sendForm(elem) {
		elem.addEventListener('submit', function (event) {
			event.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);

			function postData(data) {

				return new Promise(function (resolves, reject) {
					let request = new XMLHttpRequest();

					request.open('POST', "server.php");

					request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

					request.readystatechange = function () {
						if (request.readyState < 4) {
							resolves()
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 3) {
								resolves()
							} else {
								reject()
							}
						}
					}
					console.log(data);
					request.send(data);
				})
			}
			// End postData


			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			};

			let closeModal = function () {
				if (overlay.style.display == 'block') {
					overlay.style.display = "none";
					document.body.style.overflow = "";
				}
			};

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => {
					statusMessage.innerHTML = message.success;
					closeModal
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput)

		})

	}

	sendForm(form);
	sendForm(formBottom);



});