var supertest = require('supertest');
var finishTestcase = require('jasmine-supertest');
var JsonSchemaValidator = require('jsonschema').Validator;
var app = require('../lib/app');

describe('App tests', function() {
	beforeEach(function() {
	    this.server = supertest(app);
	});

    it('returns 404 by default', function(done) {
		this.server.get('/something-random').expect(404).end(finishTestcase(done))

		// done('error message'); // mocha
		// done.fail('error message') // jasmine
    });

	it('returns 200 for /echo', function(done) {
		this.server.get('/echo').expect(200, finishTestcase(done));
	});

	describe('/package tests', function() {
		it('returns a json', function(done) {
			this.server.get('/package')
				.expect('Content-Type', 'application/json')
				.end(finishTestcase(done));
		});

		it('returns the correct json', function(done) {
		    this.server.get('/package')
				.expect(200)
				.expect(function(response) {
					var validator = new JsonSchemaValidator();

					var keywordsSchema = {
						id: '/keyword-schema',
						type: 'array',
						required: true,
						minItems: 6,
						items: {
							type: 'string'
						}
					};
					validator.addSchema(keywordsSchema);

					var schema = {
						type: 'object',
						properties: {
							keywords: '/keyword-schema'
						}
					};
					var validationResult = validator.validate(response.body, schema);
					if(validationResult.errors.length > 0) {
						done.fail(validationResult.errors);
					}
				})
				.end(finishTestcase(done));
		});
	});
});