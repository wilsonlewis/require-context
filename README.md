# require-context v1.1.0

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i --save require-context
```

In Node.js:
```js
// Load globally into all modules.
require('require-context/register')

// Load locally as a function.
var requireContext = require('require-context');
```

## Usage

It allows you to pass in a directory to search, a flag indicating whether
subdirectories should be searched too, and a regular expression to match files against.

The syntax is as follows:
```js
require.context(directory, useSubdirectories = false, regExp = /^\.\//)
```

Examples
```js
require.context("./test", false, /\.test\.js$/);
// a context with files from the test directory that can be required with a request endings with `.test.js`.
```
```js
require.context("../", true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

## Context API

A context module exports a (require) function that takes one argument: the request.

The exported function has 3 properties: resolve, keys, id.

 * `resolve` is a function and returns the module id of the parsed request.
 * `keys` is a function that returns an array of all possible requests that the context module can handle.
 
This can be useful if you want to require all files in a directory or matching a pattern, Example:

```js
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));
```

## Why require-context?

 * Take the hassle out of requiring groups of modules
 * Write cross-platform code between [webpack](https://webpack.js.org) and [node](https://nodejs.org)
