/**
 * Node.js module for creating Feathers.js Backend Services based on Python Scripts
 * @author pinussilvestrus (Niklas Kiefer)
 */

const { exec } = require('child-process-promise');
const fs = require('fs');

class Fython {
  /**
   *
   * @param pythonOptions stores the information about the python-script
   *
   * pythonOptions: {
   *  scriptPath: String,
   *  pythonVersion: 'v2' || 'v3'
   * }
   */
  constructor(pythonOptions) {
    this.pythonOptions = pythonOptions;
  }

  create(params) {
    const args = []; // TODO: Store this as array of object like '-c param1'

    Object.keys(params).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        args.push(params[key]);
      }
    });

    const script = getScriptString(args, this.pythonOptions);

    return new Promise((resolve, reject) => {
      exec(script).then((result) => {
        const { stdout } = result;

        return resolve(stdout);
      }).catch((err) => reject(err));
    });
  }

  find(params) {
    return new Promise((resolve, reject) => {
      fs.readFile(this.pythonOptions.scriptPath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        resolve(data);
      });
    });
  }

  patch(id, data, params) {
    const {
      content,
    } = data;

    if (!content) {
      throw new Error('content must be provided!');
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(this.pythonOptions.scriptPath, content, (err) => {
        if (err) {
          reject(err);
        }

        resolve(content);
      });
    });
  }
}

module.exports = Fython;

// helper ////////////////

function getScriptString(args, options) {
  const pythonCmd = options.version === 'v2' ? 'python' : 'python3';

  let script = `${pythonCmd} ${options.scriptPath}`;

  args.forEach((a) => {
    script += ` ${a}`;
  });

  return script;
}
