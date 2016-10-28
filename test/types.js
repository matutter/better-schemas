Types = global.Schema.types

var checks = [{
    type: Types.int,
    valid: [1, 2, -2, -8, 0],
    invalid: ['1', 1.23, true]
  }, {
    type: Types.bool,
    valid: [0, 1, '1', '0', true, false, 'TRUE', 'FALSE'],
    invalid: ['a string', {}, " true", 'false ', 2, 3, -1]
  }, {
    type: Types.str,
    valid: ['asdasd', ''],
    invalid: [0, [], {}, /[asd]/]
  }, {
    type: Types.num,
    valid: [0, 0.123, -1, 0x1123, -3.1E+12],
    invalid: ['13321', {}, []]
  }, {
    type: Types.any,
    valid: [0, '1', 'asd', {}, [], '!null'],
    invalid: [null, undefined]
  }]


describe('Types', () => {
  checks.forEach(check => {
    const type = check.type

    describe(`type ${type.name}`, () => {
      it(`should validate ${check.valid}`, () => {
        check.valid.forEach(val => {
          assert(type.validate(val), `Type ${type.name} failed to validate value [${val}]`)
        })
      })

      it(`should invalidate ${check.invalid}`, () => {
        check.invalid.forEach(val => {
          assert(!type.validate(val), `Type ${type.name} failed to validate value [${val}]`)
        })
      })
    })
  })
})