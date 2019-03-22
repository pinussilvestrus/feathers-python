# fython - feathers-python

Node.js module for creating Feathers.js Backend Services based on Python Scripts

![Travis Status](https://travis-ci.org/pinussilvestrus/feathers-python.svg?branch=master) [![Downloads](https://img.shields.io/npm/dt/feathers-python.svg)](https://www.npmjs.com/package/feathers-python) [![Greenkeeper badge](https://badges.greenkeeper.io/pinussilvestrus/feathers-python.svg)](https://greenkeeper.io/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python?ref=badge_shield)

# Requirements

* [node.js](https://nodejs.org/en/)
* [Python2](https://www.python.org/downloads/)

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

// use the python service
service = app.service('pythonScript');

// POST /pythonScript
service.create({
  param1: 'Test'
}).then((result) => {
  console.log(result); // logs "Hello Test!"
});

// GET /pythonScript
service.find({}).then((result) => {
  console.log(result); // logs full content of the python script
});
```

## Testing

### Run tests

1. Go into project folder
2. run `npm test`

## Updating Changelog

We use [`github-changelog-generator`](https://github.com/github-changelog-generator/github-changelog-generator) for updating the Changelog automatically.

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python?ref=badge_large)
