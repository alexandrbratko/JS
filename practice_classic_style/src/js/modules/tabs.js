const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'block') => {
	const header = document.querySelector(headerSelector),
		tab = document.querySelectorAll(tabSelector),
		content = document.querySelectorAll(contentSelector);

	// скрываем контент
	function hideTabContent() {
		content.forEach(item => {
			item.style.display = 'none';
		});

		tab.forEach(item => {
			item.classList.remove(activeClass);
		});
	}
	//показываем контент
	function showTabContent(i = 0) {
		content[i].style.display = display;
		tab[i].classList.add(activeClass);
	}
	//вызываем
	hideTabContent();
	showTabContent();
	// навешиваем обработчик событий и при делегировании перебираем табы
	header.addEventListener('click', (e) => {
		const target = e.target;
		if (target &&
			(target.classList.contains(tabSelector.replace(/\./, "")) ||
				target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
			tab.forEach((item, i) => {
				if (target == item || target.parentNode == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});
};

export default tabs;