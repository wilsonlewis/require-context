module.exports = function(directory, recursive, regExp) {
  var dir = require('node-dir')
  var path = require('path')

  function getCallerFile() {
    var originalFunc = Error.prepareStackTrace

    var callerFile, currentFile
    try {
      var err = new Error()

      Error.prepareStackTrace = function prepareStackTrace(e, stack) {
        return stack
      }

      currentFile = err.stack.shift().getFileName()

      while (err.stack.length) {
        callerFile = err.stack.shift().getFileName()

        if (currentFile !== callerFile) break
      }
    } catch (e) { }

    Error.prepareStackTrace = originalFunc

    return path.dirname(callerFile)
  }
  
  // Assume absolute path by default
  var basepath = directory

  if (directory[0] === '.') {
    // Relative path
    basepath = path.join(getCallerFile(), directory)
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
