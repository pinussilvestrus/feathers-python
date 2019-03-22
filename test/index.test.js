const expect = require('chai').expect;
const feathers = require('@feathersjs/feathers');
const fs = require('fs');
const logger = require('winston');

const FythonService  = require('../lib');

const testScript = `
import sys as sys
if len(sys.argv) > 1:
  print("Hello " + sys.argv[1] + "!")
else:
  print("Hello World!")
  `;

const testScriptPath = 'test/helloWorld.py';

describe('fython service', (done) => {
  let app, service;

  beforeEach((done) => {
    //  given
    app = feathers();

    fs.writeFile(testScriptPath, testScript, (err) => {

      if(err) {
        expect.fail("error appeared in setup: " + err);
      }

      app.use('/pythonScript', new FythonService({scriptPath: testScriptPath}));
      service = app.service('pythonScript');
  
      // assure
      expect(service).to.not.be.undefined;

      done();
    });
  });

  afterEach((done) => {
    // cleanup
    fs.unlink(testScriptPath, (err) => {
      if (err) {
        expect.fail("error appeared in teardown: " + err);
      }

      done();
    });
  });

  describe('POST', function() {

    it('should execute the python script properly', () => {
      // when
      return service.create({}).then((result) => {
        // then
        expect(result).to.contain('Hello World!');
      });
    });

  
    it('should execute the python script with correct first param', () => {
      // when
      return service.create({
        param1: 'Test'
      }).then((result) => {
        // then
        expect(result).to.contain('Hello Test!');
      });
    });

  });


  describe('GET', function() {
    // when
    it('return script content', () => {
      return service.find({}).then((result) => {
        // then
        expect(result).to.contains('import sys as sys');
      });
    });
  });
  

  describe('PATCH', function() {
    // given
    const content = '<foo>';

    // when
    it('update script content', () => {
      return service.patch(null, {
        content
      }).then((result) => {
        // then
        expect(result).to.eql(content);

        return service.find({}).then((result) => {
          // then
          expect(result).to.eql(content);
        });
      });
    });
  });

});
