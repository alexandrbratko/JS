const masc = (selector) => {

let setCursorPosition = (pos, elem) => {
	elem.focus();

	if(elem.setSelectionRange) {
		elem.setSelectionRange(pos, pos);
	} else if (elem.createTextRange) {
		let range = elem.createTextRange();

		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
};

//создаем создания маски для номера телефона
function createMask (event) {

	//создаем матрицу
	let matrix = '+7 (___) ___ __ __',
	i = 0,
	def = matrix.replace(/\D/g, ''),//статическое
	val = this.value.replace(/\D/g, '') // динамическое

//не разрешаем удалять первые два символа
	if(def.length >= val.length) {
		val = def;
	}


	this.value = matrix.replace(/\./g, function(a) {
		//формируем строку
		return /[_\d]/.test(a) && i < val.length ?  val.charAt(i++) : i >= val.length ? '' : a;

	})

	if(event.type === 'blur') {
		if(this.value.length == 2) {
			this.value = '';
		} else {
			setCursorPosition(this.value.length, this);
		}
	}
}

let inputs = document.querySelector(selector);

inputs.forEach(input => {
	input.addEventListener('input', createMask);
	input.addEventListener('focus', createMask);
	input.addEventListener('blur', createMask);
});
};

export default masc;