const checkTextInput = (selector) => {

const txtInput = document.querySelector(selector);

txtInput.forEach( input => {
	input.addEventListener('keypress', function(e){
if(e.key.match(/[^а-яё 0-9]/ig)) {
	e.preventDefault();
}
	});
});
};

export default checkTextInput;