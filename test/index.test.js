const { expect } = require('chai');
const feathers = require('@feathersjs/feathers');
const fs = require('fs');

const FythonService = require('../lib');

const testScript = `
import sys as sys
if len(sys.argv) > 1:
  print("Hello " + sys.argv[1] + "!")
else:
  print("Hello World!")
  `;

const testScriptPath = 'test/helloWorld.py';

describe('fython service', () => {
  let app; let
    service;

  beforeEach((done) => {
    //  given
    app = feathers();

    fs.writeFile(testScriptPath, testScript, (err) => {
      if (err) {
        expect.fail(`error appeared in setup: ${err}`);
      }

      const options = {
        scriptPath: testScriptPath,
        pythonVersion: 'v2',
      };

      app.use('/pythonScript', new FythonService(options));
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
        expect.fail(`error appeared in teardown: ${err}`);
      }

      done();
    });
  });

  describe('POST', () => {
    it('should execute the python script properly', () =>
      // when
      service.create({}).then((result) => {
        // then
        expect(result).to.contain('Hello World!');
      }));

    it('should execute the python script with correct first param', () =>
      // when
      service.create({
        param1: 'Test',
      }).then((result) => {
        // then
        expect(result).to.contain('Hello Test!');
      }));
  });

  describe('GET', () => {
    // when
    it('return script content', () => service.find({}).then((result) => {
      // then
      expect(result).to.contains('import sys as sys');
    }));
  });

  describe('PATCH', () => {
    // given
    const content = '<foo>';

    // when
    it('update script content', () => service.patch(null, {
      content,
    }).then((result) => {
      // then
      expect(result).to.eql(content);

      return service.find({}).then((data) => {
        // then
        expect(data).to.eql(content);
      });
    }));
  });
});
