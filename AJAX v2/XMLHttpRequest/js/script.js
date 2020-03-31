window.addEventListener('DOMContentLoaded', () => {
	function req() {

		const request = new XMLHttpRequest();

		request.open('GET', 'http://localhost:3000/people');
		request.setRequestHeader('Content-type', 'aplication/json; charset=utf-8');
		request.send();

		request.addEventListener('readystatechange', function () {
			if (request.readyState === 4 && request.status == 200) {
				let data = JSON.parse(request.response);
				console.log(data);
			} else {
				console.error('Что пошло не так...');
			}
			createCards();
		});
		this.remove();
	}
	req();

	document.querySelector('button').addEventListener('click', req, {
		once: true
	});

	function createCards(data) {
		data.forEach(item => {
			let card = document.createElement('div');

			card.classList.add('card');

			let icon;
			if (item.sex === 'male') {
				icon = "icons/mars.png";
			} else {
				icon = "icon/female.png";
			}

			card.innerHTML = `
				<img src="${item.photo}" alt="">
				<div class="name">${item.name} ${item.surname}</div>
				<div class="sex">
					<img src="${icon}" alt="male">
				</div>
				<div class="age">${item.age}</div>
				`;
			document.querySelector('.app').appendChild(card);
		});

	}

});