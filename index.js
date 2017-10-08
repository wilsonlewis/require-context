module.exports = function(directory, recursive, regExp) {
  const dir = require('node-dir')
  const path = require('path')

  const basepath =
    directory[0] === '.'
      ? path.resolve(__dirname + path.sep + directory)
      : directory

  const keys = dir
    .files(basepath, {
      sync: true,
      recursive: recursive || false
    })
    .filter(function(file) {
      return file.match(regExp || /\.js$/)
    })
    .map(function(file) {
      return file.slice(basepath.length + 1)
    })

  const context = function(key) {
    return require(context.resolve(key))
  }

  context.resolve = function(key) {
    return directory + path.sep + key
  }

  context.keys = function() {
    return keys
  }

  return context
}

module.exports.register = function() {
  const wrap = module.constructor.wrap
  module.constructor.wrap = function(script) {
    return wrap(
      'require.context = ' + module.exports.toString() + '\n' + script
    )
  }
}
