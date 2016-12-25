'use strict';
/**
 * Node_module for creating Feathers.js Backend Services based on Python Scripts
 * @author pinussilvestrus (Niklas Kiefer)
 */

const PythonShell = require('python-shell');

class Fython {

  /**
   *
   * @param pythonOptions stores the information about the python-script
   *
   * pythonOptions: {
   *  scriptPath: String,
   *  arguments: [Object]
   * }
     */
  constructor (pythonOptions) {
    this._pythonOptions = pythonOptions;
  }

  create(data, params, [callback]) {

  }

}

module.exports = Fython;
