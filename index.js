module.exports = function(directory, recursive, regExp) {
  var dir = require('node-dir')
  var path = require('path')

  // Assume absolute path by default
  var basepath = directory

  if (directory[0] === '.') {
    // Relative path
    basepath = path.join(__dirname, directory)
  } else if (!path.isAbsolute(directory)) {
    // Module path
    basepath = require.resolve(directory)
  }

  var keys = dir
    .files(basepath, {
      sync: true,
      recursive: recursive || false
    })
    .filter(function(file) {
      return file.match(regExp || /\.(json|js)$/)
    })
    .map(function(file) {
      return path.join('.', file.slice(basepath.length + 1))
    })

  var context = function(key) {
    return require(context.resolve(key))
  }

  context.resolve = function(key) {
    return path.join(directory, key)
  }

  context.keys = function() {
    return keys
  }

  return context
}
