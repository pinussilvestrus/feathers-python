const expect = require('chai').expect;
const feathers = require('@feathersjs/feathers');
const logger = require('winston');

const FythonService  = require('../lib');

describe('fython service', () => {
  let app, service;

  beforeEach(() => {
    //  given
    app = feathers();
    app.use('/pythonScript', new FythonService({scriptPath: 'test/helloWorld.py'}));
    service = app.service('pythonScript');

    // assure
    expect(service).to.not.be.undefined;
  });

  describe('POST', function() {

    it('should execute the python script properly', () => {
      return service.create({}).then((result) => {
        // then
        expect(result).to.contain('Hello World!');
      });
    });

  
    it('should execute the python script with correct first param', () => {
      return service.create({
        param1: 'Test'
      }).then((result) => {
        // then
        expect(result).to.contain('Hello Test!');
      });
    });

  });


  describe('GET', function() {
    it('return script content', () => {
      return service.find({}).then((result) => {
        // then
        expect(result).to.contains('import sys as sys');
      });
    });
  });

});
