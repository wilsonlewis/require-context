const wrap = module.constructor.wrap

module.constructor.wrap = function(script) {
  return wrap('require.context = ' + require('.').toString() + '\n' + script)
}
