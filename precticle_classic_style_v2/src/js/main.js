import modals from './modules/modals';
import sliders from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import checkTextInput from './modules/checkTextInput';
import showMoreStyle from './modules/showMoreStyle';
import calc from './modules/calc';
import filter from './modules/filter';

window.document.addEventListener('DOMContentLoaded', function () {
	'use strict';

	modals();

	sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
	sliders('.main-slider-item', 'vertical');

	forms();

	mask('[name="phone"]');

	checkTextInput('[name="name"]');
	checkTextInput('[name="message"]');

	showMoreStyle('.button-styles', '#styles .row');

	calc('#size', '#material', '#options', '.promocode', '.calc-price');

	filter();
});