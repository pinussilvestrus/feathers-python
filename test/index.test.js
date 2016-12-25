const expect = require('chai').expect;
const feathers = require('feathers');
const logger = require('winston');

const FythonService  = require('../lib');

describe('fython service', () => {
  let app, service;

  beforeEach(() => {
    app = feathers();
    app.use('/pythonScript', new FythonService({scriptPath: 'test/helloWorld.py'}));
    service = app.service('pythonScript');
  });

  it('should execute the python script properly', () => {
    expect(service).to.not.be.nil;
    return service.create({
      param1: 'Test'
    }).then((result) => {
      expect(result).to.contains('Hello World!');
    });
  });

});
