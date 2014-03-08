if typeof assert is 'undefined'
  assert = require 'assert'
if typeof base is 'undefined'
  base = require './base'


class RandomGenerator
  construct: ->

  randint: (min=0, max=100) ->
    val = parseInt((Math.random() * (max - min)) + min, 10);
    if val > max
      val = min
    return val

class BirthdayGenerator
  # 윤년 고려는 귀찮은 관계로 생략한다
  # 그딴거 없어도 별 문제 없을거다
  constructor: (options) ->
    @year = options && options.year
    @month = options && options.month
    @day = options && options.day
    @month = this.toValidMonth @month
    @day = this.toValidDay @year, @month, @day

  DAY_TABLE = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  assert.equal 12 + 1, DAY_TABLE.length

  toValidMonth: (month) ->
    val = parseInt month, 10
    if val < 1
      val = 1
    else if val > 12
      val = 12
    return val

  toValidDay: (year, month, day) ->
    # year는 사용하지 않지만 나중에 혹시라도 윤년을 만들 경우
    # 인터페이스를 깨지 않기 위해서 미리 넣는다
    if 'undefined' is typeof month
      return undefined

    monthRange = DAY_TABLE[month]
    val = parseInt(day, 10)
    if val < 1
      val = 1
    if val > monthRange
      val = monthRange
    return val

  generateYear: (min, max) ->
    randomGen = new RandomGenerator
    year = randomGen.randint min, max

  generateMonth: (year) ->
    randomGen = new RandomGenerator
    return randomGen.randint 1, 12

  generateDay: (year, month) ->
    randomGen = new RandomGenerator
    dayRange = DAY_TABLE[month]
    return randomGen.randint 1, dayRange

  generate: ->
    year = @year || this.generateYear 1960, 1999
    month = @month || this.generateMonth year
    day = @day || this.generateDay year, month
    return {
      'year': year,
      'month': month,
      'day': day
    }


class GenderGenerator
  constructor: (opts) ->
    @gender = opts && opts.gender
    if @gender
      assert.equal true, @gender is 'm' || @gender is 'f'

  generate: ->
    if @gender
      return @gender
    else
      randval = Math.random()
      if randval >= 0.5
        return 'm'
      else
        return 'f'

class NameGenerator
  ###
  성씨 : http://ask.nate.com/qna/view.html?n=6347343
  이름 : http://ko.wikipedia.org/wiki/%ED%95%9C%EA%B5%AD%EC%9D%98_%EC%84%B1%EC%94%A8%EC%99%80_%EC%9D%B4%EB%A6%84
  나중에 테이블을 교체할지 모르지만, 많은 데이터는 나중에 DB로 옮기는거로 생각하고 코드에는 간단하게만 남긴다
  이름의 경우는 75년 이후의 자료만을 이용한다.
  ###
  constructor: (opts) ->
    @last = opts && opts.last
    @first = opts && opts.first
    @gender = opts && opts.gender
    if @gender
      assert.equal true, @gender is 'm' || @gender is 'f'
    if @last == ''
      last = undefined
    if @first == ''
      @first = undefined

  LAST_NAME_TABLE = [
    ['김', 9925949],
    ['이', 6794637],
    ['박', 3895121],
    ['최', 2169704],
    ['정', 2010117],
    ['강', 1044386],
    ['조', 984913],
    ['윤', 948600],
    ['장', 919339],
    ['임', 762767]
  ]

  MALE_NAME_TABLE = [
    '준호', '도현', '동현', '성호', '영진',
    '정호', '예준', '승민', '진우', '승현',
    '성민', '준영', '현준', '민수', '준혁',
    '현우', '상현', '지훈', '지후', '성진',
    '민석', '정훈', '우진', '민준', '성훈',
    '상훈', '민재', '준서', '건우'
  ]

  FEMALE_NAME_TABLE = [
    '지연', '은지', '수민', '서연', '지현',
    '수진', '지영', '유진', '지혜', '보람',
    '아름', '지민', '지우', '현정', '윤서',
    '은주', '현주', '혜진', '은경', '은정',
    '민지', '하은', '지원', '지은', '예원',
    '민서', '서영', '예은', '서현', '수빈',
    '미영', '미경', '예지', '예진', '현지',
    '선영', '미정', '은영', '서윤'
  ]

  generateLast: ->
    # TODO: ratio를 이용하도록 고치기
    gen = new RandomGenerator()
    idx = gen.randint 0, LAST_NAME_TABLE.length - 1
    return LAST_NAME_TABLE[idx][0]

  generateFirst: (gender) ->
    if gender == 'm'
      nameList = MALE_NAME_TABLE
    else if gender == 'f'
      nameList = FEMALE_NAME_TABLE

    gen = new RandomGenerator()
    idx = gen.randint 0, nameList.length - 1
    return nameList[idx]

  generate: ->
    gender = @gender
    if !gender
      gen = new GenderGenerator()
      gender = gen.generate()

    last = @last || this.generateLast()
    first = @first || this.generateFirst(gender)
    return {
      'last': last,
      'first': first,
      'full': last + first,
      'gender': gender
    }

str2numList = (val) ->
  numList = []
  for i in [0..val.length - 1]
    elem = parseInt val[i], 10
    if isNaN elem
      continue
    numList.push parseInt(val[i], 10)
  return numList

class SSNFilter
  # 생성한 주민등록번호의 뒤를 숨기기

  apply: (val, count=1) ->
    tokenList = [val.substr(0, val.length-count)]

    for x in [1..count]
      tokenList.push '*'

    expected = tokenList.join ""
    return expected.substr 0, val.length

class ParityGenerator
  generate: (numList) ->
    multiplierList = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
    assert.equal multiplierList.length, numList.length

    for i in [0..multiplierList.length - 1]
      multiplier = multiplierList[i]
      numList[i] *= multiplier

    baseSum = 0
    for j in [0..numList.length - 1]
      baseSum += numList[j]

    lastNum = 11 - (baseSum % 11)
    if lastNum >= 10
      lastNum -= 10

    assert.equal true, 0 <= lastNum <= 9
    return lastNum


class BirthOrderGenerator
  # 태어난 순서 표시용
  generate: ->
    randomGen = new RandomGenerator()
    return randomGen.randint 1, 3

class AreaGenerator
  generate: ->
    ###
    서울 00~08
    부산 09~12
    인천 13~15
    경기 주요 도시  16~18
    주요 도시외 경기 19~25
    강원도 26~34
    충청북도  35~39
    충청남도  40~47
    전라북도  48~54
    전라남도  55~68
    경상도 67~90
    ###
    minVal = 0
    maxVal = 90

    randomGen = new RandomGenerator()
    first = randomGen.randint minVal, maxVal
    second = randomGen.randint 1, 99

    first = base.zeroFill first, 2
    second = base.zeroFill second, 2
    return first + second

class SSNValidator
  validateFormat: (val) ->
    patt = new RegExp('[0-9]{6}-[0-9]{7}')
    return patt.test val

  validateNumber: (val) ->
    numList = str2numList val, 10
    lastNum = numList.pop()

    parityGen = new ParityGenerator()
    expectedLastNum = parityGen.generate(numList)
    return expectedLastNum is lastNum

  validate: (val) ->
    if !this.validateFormat val
      return false
    if !this.validateNumber val
      return false
    return true


class SSNGenerator
  # http://www.ilovepc.co.kr/bbs/board.php?bo_table=software&wr_id=331

  constructor: (options) ->
    {@year, @month, @day, @gender} = options
    @areaGen = new AreaGenerator()
    @birthOrderGen = new BirthOrderGenerator()

  generate: ->
    yearStr = base.zeroFill @year % 100, 2
    monthStr = base.zeroFill @month, 2
    dayStr = base.zeroFill @day, 2

    genderStr = ''
    if @year < 2000
      if @gender == 'm'
        genderStr = '1'
      else
        genderStr = '2'
    else
      if gender == 'm'
        genderStr = '3'
      else
        genderStr = '4'

    areaStr = @areaGen.generate()
    assert.equal typeof areaStr, 'string'
    assert.equal areaStr.length, 4

    order = @birthOrderGen.generate()
    orderStr = order.toString()
    assert.equal orderStr.length, 1

    num = "#{yearStr}#{monthStr}#{dayStr}-#{genderStr}#{areaStr}#{orderStr}"

    validator = new SSNValidator()
    numList = str2numList(num)
    parityGen = new ParityGenerator()
    lastNum = parityGen.generate(numList)
    return num + lastNum

module.exports = {
  BirthdayGenerator: BirthdayGenerator,
  GenderGenerator: GenderGenerator,
  NameGenerator: NameGenerator,
  SSNFilter: SSNFilter,
  str2numList: str2numList,
  ParityGenerator: ParityGenerator
  SSNValidator: SSNValidator,
  SSNGenerator: SSNGenerator,
  AreaGenerator: AreaGenerator
  }
