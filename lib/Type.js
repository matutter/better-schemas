const util = require('util')

module.exports.BaseType = BaseType
module.exports.inherits = inheritsBaseType
module.exports.lookup = lookupType

$BASETYPE_CACHE = global.$BASETYPE_CACHE = {}

/**
* BaseType's are unique by a FQN, if a Basetype is instantiated twice
* with the same name an error will be thrown.
*/
function BaseType(name) { 
  if($BASETYPE_CACHE[name]) {
    throw new TypeError(`Type name "${this.name}" is reserved.`)
  }
  $BASETYPE_CACHE[name] = this
  this.name = name
}

/**
* Must be overridden
*/
BaseType.prototype.validate = function(val) {
  throw new TypeError(`BaseType "${this.name}" cannot validate.`)
};

/**
* inheritance utility
*/
function inheritsBaseType(clazz) {
  return util.inherits(clazz, BaseType)
}

/**
* Looks up a type based on the name, or built-in-type constructor (function)
* @param {string | function} nameOrBase may be a string name or a built-in type constructor.
* @return {BaseType} A BaseType will be returned matching the constructor or type-name
* @thrown {Error} When the type cannot be found
*/
function lookupType(nameOrBase) {
  var type = null;
  
  switch(nameOrBase) {
    case String: type = $BASETYPE_CACHE['string']; break;
    case Boolean: type = $BASETYPE_CACHE['boolean']; break;
    case Number: type = $BASETYPE_CACHE['number']; break;
    default:
      if(typeof nameOrBase === 'string') {
        type = $BASETYPE_CACHE[nameOrBase]
        if(!type)
          type = $BASETYPE_CACHE[nameOrBase+'_$schema']
      }
  }

  if(!type)
    throw new Error(`Unknown type "${func}"`)

  return type;
}