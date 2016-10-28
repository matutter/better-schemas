
Schema = global.Schema

describe(`initialization(name, structure)`, () => {

  it(`should only allow unique names`, () => {
    var schema0 = new Schema('schema0', { name: String })
    assert.throws(() => {
      var schema0 = new Schema('schema0', { name: String })
    })
  })

  it(`shouldn't allow empty structures`, () => {
    assert.throws(() => {
      new Schema('schema0', {  })
    })
  })

})

describe('type resolution for built-in types and existing schemas', () => {
  
  it(`should recognize types in structure; Schema struct:{ name: String }`, () => {
    var schema1 = new Schema('schema1', { name: String, num: Number, check:Boolean })
    assert(schema1.validate({name:'name', num: 123, check: false}))
    assert.throws(()=> schema1.validate({name:123, num: 123, check: 'asd'}))
  })

  it('should recognize arrays as a series of types', () => {
    var schema1B = new Schema('schema1B', { name: String, friends: [String] })
    assert(schema1B.validate({name: 'abc', friends: ['string', 'str']}))
  })

  it('should recognize arrays which are empty and required are an error', () => {
    var schema1C = new Schema('schema1C', { name: String, friends: { type: [String], required:true } })

    assert(schema1C.validate({name: 'abc', friends: ['string', 'str']}))
    assert.throws(() => schema1C.validate({name: 'abc', friends: []}))
  })
})


describe('default values | new Schema(..., { name: { type:String, default:"..." } })', () => {

  it('should assign default values', () => {
    var schema2 = new Schema('schema2', { name: { type:String, default:'fox' } })
    var obj = schema2.validate({})
    assert(obj.name, 'fox', 'default value not set')
  })

})

describe('required values | new Schema(..., { name: { type:String, required:true } })', () => {
  var schema3 = new Schema('schema3', { name: { type:String, required:true } })

  it('should throw an error when missing', () => {
    assert(schema3.validate({name: 'abc'}), 'value is present')
    assert.throws(() => schema3.validate({}), 'required')
  })
})

describe('Schema.get(schema-name)', () => {
  it('should return an already instantiated schema by name', () => {
    assert( Schema.get('schema3') )
  })
  it('should throw when no schema exists', () => {
    assert.throws( () => Schema.get('schema333') )
  })
})

describe('Nested schemas', () => {
  it('should allow Schemas as valid types for new Schema structures', () => {
    var schema3 = Schema.get('schema3')
    var schema4 = new Schema('schema4', { title: String, author: schema3 })
  })
  it('should validate accordingly', () => {
    var schema4 = Schema.get('schema4')
    assert(schema4.validate({title:'harry potty', author: {name: 'jk'}}))
    assert.throws(() => schema4.validate({title:'harry potty', author: {name: null}}))
  })
})

