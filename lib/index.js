'use strict';
/**
 * Node_module for creating Feathers.js Backend Services based on Python Scripts
 * @author pinussilvestrus (Niklas Kiefer)
 */

const exec = require('child-process-promise').exec;
const logger = require('winston');

class Fython {

  /**
   *
   * @param pythonOptions stores the information about the python-script
   *
   * pythonOptions: {
   *  scriptPath: String
   * }
     */
  constructor (pythonOptions) {
    this._pythonOptions = pythonOptions;
  }

  create(params) {
    var args = []; // TODO: Store this as array of object like '-c param1'
    for (var k in params){
      if (params.hasOwnProperty(k)) {
        args.push(params[k]);
      }
    }

    // TODO: add params to python execution
    let options = {
      args: args
    };

    return Promise.resolve(exec(`python ${this._pythonOptions.scriptPath}`).then((result) => {
      var stdout = result.stdout;
      return Promise.resolve(stdout);
    }).catch((err) => {
      return Promise.reject(err)
    }));
  }
}

module.exports = Fython;
