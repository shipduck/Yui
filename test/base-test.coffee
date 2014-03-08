if typeof window is 'undefined'
  assert = require 'assert'
  base = if process.env.EXPRESS_COV then require '../lib-cov/base' else require '../lib/base'

# sample unit test
describe 'Array', ->
  describe '#indexOf()', ->
    it 'should return -1 when not present', ->
      assert.equal [1, 2, 3].indexOf(4), -1

describe 'base', ->
  describe '#int2krw', ->
    it 'run', ->
      assert.equal base.int2krw(1), "1"
      assert.equal base.int2krw(12), "12"
      assert.equal base.int2krw(123), "123"
      assert.equal base.int2krw(1234), "1,234"
      assert.equal base.int2krw(12345), "12,345"
      assert.equal base.int2krw(123456), "123,456"
      assert.equal base.int2krw(1234567), "1,234,567"

  describe '#zeroFill', ->
    it 'run', ->
      assert.equal base.zeroFill(1, 1), '1'
      assert.equal base.zeroFill(1, 2), '01'
      assert.equal base.zeroFill(1, 3), '001'

      assert.equal base.zeroFill(123, 1), '123'
      assert.equal base.zeroFill(123, 5), '00123'
