class Basic {
	returnsNumber() {
		return 4;
	}
	
	returnsFunction() {
		return function () {

		};
	}

	callsAnotherFunction(callback) {
		callback();
	}

	usesTimeout(callback) {
		setTimeout(callback, 5000);
	}

	throwsSomething(someParam=true) {
		if (someParam) {
			throw(new Error('o noes!'));
		}
	}
}

module.exports = Basic;