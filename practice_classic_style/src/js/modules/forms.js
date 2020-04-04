import checkNumInputs from './checkNumInputs';
const forms = (state) => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		window = document.querySelectorAll('[data-modal]');

	checkNumInputs('input[name="user_phone"]');

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...'
	};

	const postData = async (url, data) => {
		document.querySelector('.status').textContent = message.loading;
		let res = await fetch(url, {
			method: "POST",
			body: data
		});

		return await res.text();
	};
	// очищаем инпуты
	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
	};
	// закрываем модальное окно после отправки формы
	const closeModal = (time) => {
		window.forEach(item => {
			setTimeout(() => {
				item.style.display = 'none';
			}, time);
		});
	};

	//очищаем state
	const clearState = () => {
		for (const key of Object.keys(state)) {
			delete state[key];
			console.log('delete');
		}
	};

	// навешиваем обработчик на формы
	form.forEach(item => {
		item.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			item.appendChild(statusMessage);

			const formData = new FormData(item);
			if (item.getAttribute('data-calc') === 'end') {
				for (let key in state) {
					formData.append(key, state[key]);
				}
			}

			postData('assets/server.php', formData)
				.then(res => {
					console.log(res);
					statusMessage.textContent = message.success;
				})
				.catch(() => statusMessage.textContent = message.failure)
				.finally(() => {
					clearInputs();
					setTimeout(() => {
						statusMessage.remove();
					}, 5000);
					closeModal(5000);
					clearState();
				});
		});
	});
};

export default forms;