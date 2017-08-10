import mitt from 'mitt';

function focusRing(target = document.body) {
	const emitter = mitt();

	let value = false;

	let clicked = false;
	target.addEventListener('mousedown', () => {
		clicked = true;
		setTimeout(() => clicked = false, 1);
	});

	target.addEventListener('focusin', focusEvent => {
		const lastValue = value;
		value = !clicked;
		if (value !== lastValue) emitter.emit({
			value,
			focusEvent
		});
	});

	return emitter;
}

function addClass(className = 'focus-ring', target = document.body) {
	return focusRing(target).on('*', e => target.classList[e.value ? 'add' : 'remove'](className));
}

focusRing.addClass = addClass;

export default focusRing;
