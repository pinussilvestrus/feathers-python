# fython - feathers-python
Node_module for creating Feathers.js Backend Services based on Python Scripts

![Travis Status](https://travis-ci.org/pinussilvestrus/feathers-python.svg?branch=master) [![Downloads](https://img.shields.io/npm/dt/feathers-python.svg)](https://www.npmjs.com/package/feathers-python)


# Requirements

* node.js
* Python2

## Setup

1. Go into your project folder and enter `npm install feathers-python`

## Usage

Given this python-script in 'test/helloWorld.py':

```python
import sys as sys
print("Hello " + sys.argv[1] + "!")
```

Use this in your Feathers.js App:

```js
const FythonService = require('feathers-python')

// given a feathers-app
app = feathers();

// register a python service to your app
app.use('/pythonScript', new FythonService({scriptPath: 'test/helloWorld.py'}));

// use it the python service
service = app.service('pythonScript');
// POST /pythonScript
service.create({
  param1: 'Test'
}).then((result) => {
  console.log(result); // logs "Hello Test!"
});
```

## Testing

### Run tests

1. Go into project folder
2. run `npm test`


