const BaseType = require('./Type.js')

/**
* A Boolean type, values may be 0, 1, True, true, False, false
*/
function BoolType() {
  BoolType.super_.call(this, 'boolean')
}
BaseType.inherits(BoolType)
const $BoolType = new BoolType()
module.exports.BoolType = $BoolType 
module.exports.Boolean = $BoolType 
module.exports.Bool = $BoolType 
module.exports.bool = $BoolType 

BoolType.prototype.validate = function(val) {
  return /^([01]|true|false)$/ig.test(String(val))
};

/**
* Any number, validated by !isNaN(...)
*/
function NumberType() {
  NumberType.super_.call(this, 'number')
}
BaseType.inherits(NumberType)
const $NumberType = new NumberType()
module.exports.NumberType = $NumberType
module.exports.Number = $NumberType
module.exports.Num = $NumberType
module.exports.num = $NumberType

NumberType.prototype.validate = function(val) {
  return typeof val === 'number'
};

/**
* Any String, validates with a typeof val === 'string' check
*/
function StringType() {
  StringType.super_.call(this, 'string')
}
BaseType.inherits(StringType)
const $StringType = new StringType()
module.exports.StringType = $StringType
module.exports.String = $StringType
module.exports.Str = $StringType
module.exports.str = $StringType

StringType.prototype.validate = function(val) {
  return typeof val === 'string'
};

/**
* An integer, like 1, 2, 3, but not 1.2
*/
function IntegerType() {
  IntegerType.super_.call(this, 'integer')
}
BaseType.inherits(IntegerType)
const $IntegerType = new IntegerType()
module.exports.IntegerType = $IntegerType
module.exports.Integer = $IntegerType
module.exports.Int = $IntegerType
module.exports.int = $IntegerType

IntegerType.prototype.validate = function(val) {
  return val === Math.floor(val)
};

/**
* Is any type, but not undefined or null
*/
function AnyType() {
  IntegerType.super_.call(this, 'any')
}

AnyType.prototype.validate = function(val) {
  return val !== null && val !== undefined
};
const $AnyType = new AnyType()
module.exports.AnyType = $AnyType
module.exports.Any = $AnyType
module.exports.any = $AnyType