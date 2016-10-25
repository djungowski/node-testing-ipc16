var Basic = require('../lib/basic');

describe('Basic specs', function() {

	beforeEach(function() {
		this.basic = new Basic();
	});

	afterEach(function() {
	});

	describe('returnsNumber() tests', function() {
		it('makes sure that 4 is returned', function() {
			expect(this.basic.returnsNumber()).toEqual(4);
		});
	});

	describe('returnsFunction() tests', function() {
		beforeEach(function() {
		});

		afterEach(function() {
		});

		it('makes sure that a function is returned', function() {
			expect(this.basic.returnsFunction()).toEqual(jasmine.any(Function));
		});
	});

	describe('callsAnotherCallback() test', function() {
	    it('calls the callback using spies', function() {
	        var callback = jasmine.createSpy('callback');
			this.basic.callsAnotherFunction(callback);
			expect(callback).toHaveBeenCalled();
	    });

		it('calls the callback using done', function(done) {
		    function callback() {
				done();
			}
			this.basic.callsAnotherFunction(callback);
		});
	});
	
	describe('usesTimeout() tests', function() {
		beforeEach(function() {
			jasmine.clock().install();

		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});

	    it('makes sure that the callback is called after 100s', function() {
	        var callback = jasmine.createSpy('timeout callback');
			this.basic.usesTimeout(callback);
			jasmine.clock().tick(5000);
			expect(callback).toHaveBeenCalled();
	    });
	});

	describe('throwsSomething() tests', function() {
	    it('throws', function() {
	        expect(this.basic.throwsSomething).toThrowError('o noes!');
	    });

		it('does not throw', function() {
			var me = this;
			function throwWrapper() {
				me.basic.throwsSomething(false)
			}

			expect(throwWrapper).not.toThrowError();
		});
	});


});