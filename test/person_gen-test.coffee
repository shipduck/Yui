if typeof window is 'undefined'
  assert = require 'assert'
  base = if process.env.EXPRESS_COV then require '../lib-cov/base' else require '../lib/base'
  person_gen = if process.env.EXPRESS_COV then require '../lib-cov/person_gen.js' else require '../lib/person_gen'

describe 'BirthdayGenerator', ->
  describe '#call', ->
    it 'define year', ->
      year = 1990
      gen = new person_gen.BirthdayGenerator year: year
      actual = gen.generate()
      assert.equal year, actual.year

    it 'define month', ->
      month = 5
      gen = new person_gen.BirthdayGenerator month: month
      actual = gen.generate()
      assert.equal month, actual.month

    it 'not valid month', ->
      gen = new person_gen.BirthdayGenerator month: -1
      actual = gen.generate()
      assert.equal 1, actual.month

      gen = new person_gen.BirthdayGenerator month: 13
      actual = gen.generate()
      assert.equal 12, actual.month

    it 'define month/day', ->
      month = 3
      day = 1
      gen = new person_gen.BirthdayGenerator month: month, day: day
      actual = gen.generate()
      assert.equal month, actual.month
      assert.equal day, actual.day

    it 'not valid day', ->
      gen = new person_gen.BirthdayGenerator month: 2, day: -1
      actual = gen.generate()
      assert.equal 1, actual.day

      gen = new person_gen.BirthdayGenerator month: 2, day: 30
      actual = gen.generate()
      assert.equal 28, actual.day

    it 'random', ->
      gen = new person_gen.BirthdayGenerator()
      data = gen.generate()
      # console.log data

describe 'GenderGenerator', ->
  describe '#call', ->
    it 'defined', ->
      gender = 'm'
      gen = new person_gen.GenderGenerator gender: gender
      actual = gen.generate()
      assert.equal gender, actual

    it 'random', ->
      gen = new person_gen.GenderGenerator()
      actual = gen.generate()
      #console.log actual

describe 'NameGenerator', ->
  describe '#call', ->
    it 'define last', ->
      last = '테'
      gen = new person_gen.NameGenerator last: last
      actual = gen.generate()
      assert.equal last, actual.last

    it 'define first', ->
      first = '철수'
      gen = new person_gen.NameGenerator first: first
      actual = gen.generate()
      assert.equal first, actual.first

    it 'define gender', ->
      gender = 'm'
      gen = new person_gen.NameGenerator gender: gender
      actual = gen.generate()

      gender = 'f'
      gen = new person_gen.NameGenerator gender: gender
      actual = gen.generate()

    it 'random', ->
      gen = new person_gen.NameGenerator()
      actual = gen.generate()
      # console.log actual

describe 'ssn', ->
  describe '#str2numList', ->
    it 'run', ->
      input = '12-a93s'
      output = [1, 2, 9, 3]
      assert.deepEqual output, person_gen.str2numList(input)


describe 'SSNFilter', ->
  describe '#apply', ->
    it 'run', ->
      filter = new person_gen.SSNFilter()
      assert.equal '123*', filter.apply '1234'
      assert.equal '12**', filter.apply '1234', 2
      assert.equal '****', filter.apply '1234', 4
      assert.equal '****', filter.apply '1234', 10
      assert.equal '1234', filter.apply '1234', -1

describe 'SSNValidator', ->
  describe '#validate', ->
    it 'success', ->
      # 수동으로 생성한 샘플
      dataList = ['901212-1023457']
      validator = new person_gen.SSNValidator()
      for i in [0..dataList.length-1]
        assert.equal true, validator.validate(dataList[i])

    it 'fail', ->
      dataList = [
        '111111-111111',  # 6-6 형태로 입력되서 맞지 않는 경우
        '1111111111111',  # - 없이 입력한 경우
        '901212-1023456',
      ]
      validator = new person_gen.SSNValidator()
      for i in [0..dataList.length-1]
        assert.equal false, validator.validate(dataList[i])

describe 'SSNGenerator', ->
  describe '#generate', ->
    it 'run', ->
      birthGen = new person_gen.BirthdayGenerator()
      data = birthGen.generate()
      genderGen = new person_gen.GenderGenerator()
      data.gender = genderGen.generate()

      generator = new person_gen.SSNGenerator data
      validator = new person_gen.SSNValidator()

      for x in [0..9]
        val = generator.generate()
        # console.log val
        assert.equal true, validator.validate(val)
