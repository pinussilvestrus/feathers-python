'use strict';
/**
 * Node.js module for creating Feathers.js Backend Services based on Python Scripts
 * @author pinussilvestrus (Niklas Kiefer)
 */

const exec = require('child-process-promise').exec;

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

    let script = `python ${this._pythonOptions.scriptPath}`;
    args.forEach((a) => {
      script += ` ${a}`
    });

    return Promise.resolve(exec(script).then((result) => {
      var stdout = result.stdout;
      return Promise.resolve(stdout);
    }).catch((err) => {
      return Promise.reject(err)
    }));
  }
}

module.exports = Fython;
