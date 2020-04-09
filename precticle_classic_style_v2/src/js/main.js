import modals from './modules/modals';
import sliders from './modules/sliders';


window.document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	modals();

	sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	sliders('.main-slider-item', 'vertical');
});