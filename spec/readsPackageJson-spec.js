var mockery = require('mockery');

describe('readsPackageJson()', function() {
	beforeEach(function() {
	    mockery.enable();
	});

	afterEach(function() {
		mockery.deregisterAll();
	    mockery.disable();
	});

    it('mocks the fs layer', function() {
		mockery.registerAllowable('../lib/readsPackageJson');


		var fsMock = {
			readFileSync: function () {
				return 'lalala bla'
			}
		};

		mockery.registerMock('fs', fsMock)

		var read = require('../lib/readsPackageJson');
		
		expect(read()).toEqual('lalala bla');
    });
});