import {
	postData
} from '../sevices/request';

const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		window = document.querySelectorAll('[data-modal]'),
		upload = document.querySelectorAll('[name="upload"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png'
	};

	// очищаем инпуты
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = "Файл не выбран";
		});
	};

	//
	upload.forEach(item => {
		item.addEventListener('input', () => {
			console.log(item.files[0]);
			let dots;
			const arr = item.files[0].name.split('.');
			arr[0].length > 6 ? dots = "..." : dots = '.';
			const name = arr[0].substring(0, 6) + dots + arr[1];
			item.previousElementSibling.textContent = name;
		});
	});

	// закрываем модальное окно после отправки формы
	const closeModal = (time) => {
		window.forEach(item => {
			setTimeout(() => {
				item.style.display = 'none';
			}, time);
		});
	};

	//очищаем state
	// const clearState = () => {
	// 	for (const key of Object.keys(state)) {
	// 		delete state[key];
	// 		console.log('delete');
	// 	}
	// };

	// навешиваем обработчик на формы
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.parentNode.appendChild(statusMessage);

			item.classList.add('animate', 'fadeOutUp');
			setTimeout(() => {
				item.style.display = 'none';
			});

			let statusImg = document.createElement('img');
			statusImg.setAttribute('src', message.spinner);
			statusImg.classList.add('animate', 'fadeInOut');
			statusMessage.appendChild(statusImg);

			let textMessage = document.createElement('div');
			textMessage.textContent = message.loading;
			statusMessage.appendChild(textMessage);

			let path = {
				designer: 'assets/server.php',
				question: 'assets/question.php'
			};

			const formData = new FormData(item);
			let api;
			item.closest('.popup-designer') || item.classList.contains('form_calc') ? api = path.designer : api = path.question;

			postData(api, formData)
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure
				})
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
						item.style.display = 'block';
						item.classList.add('.fadeInDown');
					}, 5000);
					closeModal(5000);
					// clearState();
				});
		});
	});
};

export default forms;