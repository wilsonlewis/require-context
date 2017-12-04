const wrap = module.constructor.wrap
const requireContext = require('.')

module.constructor.wrap = function(script) {
  return wrap('require.context = ' + requireContext.toString() + '\n' + script)
}
