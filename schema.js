const type = require('./lib/Type.js')

module.exports = require('./lib/Schema.js')
module.exports.Type = type.Type
module.exports.BaseType = type.BaseType
module.exports.inherits = type.inherits
module.exports.types = require('./lib/types.js')
