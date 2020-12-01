window.addEventListener('DOMContentLoaded', () => {

	const form = document.querySelector('form');

	function req(e) {
		e.preventDefault();

		let formData = new FormData(form);
		formData.append('id', Math.random());

		let obj = {};
		formData.forEach((value, key) => {
			obj[key] = value;
		});

		// POST server.php
		// let formData = new FormData(form);
		// getResource('./server.php', formData)
		// .then(data => console.log(data))
		// .catch(err => console.error(err));
		//AXIOS .php 
		// axios({
		// 	method: 'post',
		// 	url: './server.php',
		// 	data: formData
		// })
		// .then( data = console.log(data));

		// AXIOS
		// axios.post('http://localhost:3000/people', obj);

		getResource('http://localhost:3000/people', obj)
			.then(data => console(data))
			.catch(err => console.error(err));

		this.remove();
	}


	form.querySelector('button').addEventListener('submit', (e) => req(e), {
		once: true
	});

	// AXIOS
	// async function getResource(url) {
	// 	const res = await axios(`${url}`);
	// 	if (res.status !== 200) {
	// 		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	// 	}
	// 	return res;
	// }

	async function getResource(url, data) {
		const res = await fetch(`${url}`, {
			method: 'POST',
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		});
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status ${res.status}`);
		}
		return await res.json();
	}
	// POST .php
	// async function getResource(url, data) {
	// 	const res = await fetch(`${url}`, {
	// 		method: 'POST',
	// 		body: JSON.stringify(data)
	// 	});
	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch ${url}, status ${res.status}`);
	// 	}
	// 	return await res.text();
	// }



	// createCards
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