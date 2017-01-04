[![NPM](https://nodei.co/npm/better-schemas.png)](https://nodei.co/npm/better-schemas/)   
[![Build Status](https://travis-ci.org/matutter/better-schemas.svg?branch=master)](https://travis-ci.org/matutter/better-schemas)
[![Coverage Status](https://coveralls.io/repos/github/matutter/better-schemas/badge.svg?branch=master)](https://coveralls.io/github/matutter/better-schemas?branch=master)

# better-schemas
A simple schema validation implementation for NodeJs. 

## Usage
```javascript
const Schema = require('schema-js')
```

## Create a schema for well-defined structures
```javascript
const postSchema = new Schema('user.post', {
  name : { type: String, required: true }, // throws when not set
  description: String // optional
})

function handlePOST(req, res, next) {
  var data = req.body
  try {
    postSchema.validate(data)
    res.send('looks good!')
  } catch(e) {
    next(e)
  }
}
```

## Define your own base-types
```javascript
const MyType = new Schema.Type('my type', n => n == 1)
if(MyType.validate(1)) console.log('success!')
```

## Define your own Schemas
```javascript
const MySchema = new Schema('my-schema', {
  key : { type:Schema.Types.Any, default: 'value' }, // sets default when undefined
  arrays: [{type: String}],
  simple_types: Number,
  helper_types: Schema.Types.Integer,
  name : { type:String, required: true } 
})

var data = MySchema.validate({ key: undefined, arrays: ['are', 'great'] }) // undefined & null are replaced by defaults
```

## Retrieve schemas by name
```javascript
const MySchema = Schema.get('my-schema')
```

## Create a nested Schema
```javascript
const MySchema = Schema.get('my-schema')
const MyOtherSchema = new Schema('complex-schema', {
  name: { type: String, required: true },
  data: MySchema
})
```
