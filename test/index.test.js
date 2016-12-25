const expect = require('chai').expect;
const feathers = require('feathers');

const FythonService  = require('../lib');

describe('fython service', () => {
  let app, service;

  beforeEach(done => {
    app = feathers();

    app.use('/pythonScript', new FythonService({scriptPath: './helloWorld.py'}));

    service = app.service('pythonScript');
    done();
  });

  it('should execute the python script properly', () => {
    expect(service).to.not.be.nil;
  });

});
