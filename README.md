# fython - feathers-python

Node.js module for creating Feathers.js Backend Services based on Python Scripts

![Build Status](https://github.com/pinussilvestrus/feathers-python/workflows/ci/badge.svg) [![Downloads](https://img.shields.io/npm/dt/feathers-python.svg)](https://www.npmjs.com/package/feathers-python)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python?ref=badge_shield)

# Requirements

* [node.js](https://nodejs.org/en/)
* [Python](https://www.python.org/downloads/)

## Setup
```sh
$ npm install --save feathers-python
```

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
const options = {
  scriptPath: 'test/helloWorld.py', // python script to be executed
  pythonVersion: 'v2' // python version 'v2' || 'v3'
};

app.use('/pythonScript', new FythonService(options));

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

// PATCH /pythonScript
service.patch(null, { content: 'content'}).then((result) => {
  console.log(result); // logs "content", updates python script content on disk
});
```

## Testing

### Run tests

1. Go into project folder
2. run `npm test`

## Updating Changelog

We use [`github-changelog-generator`](https://github.com/github-changelog-generator/github-changelog-generator) for updating the Changelog automatically.

```sh
$ gem install github_changelog_generator
$ github_changelog_generator -u pinussilvestrus -p feathers-python --no-http-cache
```

## Releasing

We use [`np`](https://github.com/sindresorhus/np) for releasing new versions

```sh
$ npm i -g np
$ np
```

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpinussilvestrus%2Ffeathers-python?ref=badge_large)
