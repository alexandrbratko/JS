import './slider';
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/channgeModalState';
import timer from './modules/timer';
import image from './modules/image';

window.addEventListener('DOMContentLoaded', () => {

	let modalState = {};
	let deadline = '2020-04-20';

	changeModalState(modalState);
	modals();
	tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
	tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');
	tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');
	forms(modalState);
	timer('.container1', deadline);
	image();

});