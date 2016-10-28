const BaseType = require('./Type.js')
const Types = require('./types.js')

const SCHEMA_TOKEN = '_$schema'

module.exports = Schema
module.exports.get = getSchemaByName

/**
* Expands a Schema structure into an array of objects
* with a type object implementing the BaseType class os that  each element has a 
* obj.name {string} and a obj.validate {function({object})}
*/ 
function expandStructure(structure) {
  return Object.keys(structure).map(key => {
    var val = structure[key]
    const obj = {
      required: false,
      series: false,
      type: undefined,
      default: undefined,
      key: key
    }

    if(val.type && Array.isArray(val.type)) {
      obj.series = true
      val.type = val.type[0]
      if(!val.type) {
        throw new TypeError('Empty array does not resolve in BaseType.')
      }
    }

    if(Array.isArray(val)) {
      obj.series = true
      val = val[0]
      if(!val) {
        throw new TypeError('Empty array does not resolve in BaseType.')
      }
    }

    if(val.required) obj.required = true
    if(val.default) obj.default = val.default

    if(typeof (val.type || val) === 'function') {
      obj.type = BaseType.lookup(val.type || val)
    } else if(val instanceof BaseType.BaseType) {
      obj.type = val
    } else if(val.type instanceof BaseType.BaseType) {
      obj.type = val.type
    } else {
      throw new Error(`Cannot determine type from "${val}"`)
    }

    return obj
  })
}

/**
* Name, the fqn of this schema for the local Schema & Type cache
* 
*/
function Schema(name, structure) {
  Schema.super_.call(this, name+SCHEMA_TOKEN)
  structure = expandStructure(structure)
  this.getStructure = () => structure
}
BaseType.inherits(Schema)

Schema.prototype.validate = function(obj) {
  const structure = this.getStructure()
  
  structure.forEach(struct => {
    const key = struct.key
    const val = obj[struct.key]

    if(!val) {
      if(struct.default) {
        obj[key] = struct.default
      } else if(struct.required) {
        throw new TypeError(`${this.name} missing required key ${key}`)
      }
    } else {
      var valid = false

      if(struct.series) {
        if(val.length === 0 && struct.required) {
          throw new TypeError(`${this.name} missing required key ${key}`)
        }
        valid = val.every(o => struct.type.validate(o))
      } else {
        valid = struct.type.validate(val)
      }

      if(!valid) {
        throw new TypeError(`${this.name}.${key} expects ${struct.type.name}, found ${val}`)
      }
    }

  })

  return obj
};

function getSchemaByName(name) {
  return BaseType.lookup(name+SCHEMA_TOKEN)
}