if (!require.context) {
  const dir = require('node-dir')

  require.context = function(directory, recursive, regExp) {
    const keys = dir
      .files(directory, {
        sync: true,
        recursive: recursive || false
      })
      .filter(file => {
        return file.match(regExp || /\.js$/)
      })

    const context = function(key) {
      return require(key)
    }

    context.resolve = function(key) {
      return key
    }

    context.keys = function() {
      return keys
    }

    return context
  }
}
