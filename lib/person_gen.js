/*global assert: false, module: false */
(function(global, module) {
  var exports = module.exports;

  function RandomGenerator() {
    var self = this;

    function randint(min, max) {
      var minval = min || 0;
      var maxval = max || 100;
      var val = parseInt((Math.random() * (maxval - minval)) + minval, 10);
      if(val > maxval) {
        val = minval;
      }
      return val;
    }
    self.randint = randint;
  }

  function BirthdayGenerator(opts) {
    /*
      윤년 고려는 귀찮은 관계로 생략한다
      그딴거 없어도 별 문제 없을거다
    */

    var self = this;

    var DAY_TABLE = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    assert.equal(12 + 1, DAY_TABLE.length);

    function toValidMonth(month) {
      var val = parseInt(month, 10);
      if(val < 1) {
        val = 1;
      } else if(val > 12) {
        val = 12;
      }
      return val;
    }

    function toValidDay(year, month, day) {
      /*
        year는 사용하지 않지만 나중에 혹시라도 윤년을 만들 경우
        인터페이스를 깨지 않기 위해서 미리 넣는다
      */
      if('undefined' === typeof month) {
        return undefined;
      }
      var monthRange = DAY_TABLE[month];
      var val = parseInt(day, 10);
      if(val < 1) {
        val = 1;
      }
      if(val > monthRange) {
        val = monthRange;
      }
      return val;
    }

    function generateYear(min, max) {
      var randomGen = new RandomGenerator();
      var year = randomGen.randint(min, max);
      return year;
    }

    function generateMonth(year) {
      var randomGen = new RandomGenerator();
      return randomGen.randint(1, 12);
    }

    function generateDay(year, month) {
      var randomGen = new RandomGenerator();
      var dayRange = DAY_TABLE[month];
      return randomGen.randint(1, dayRange);
    }

    var definedYear = opts && opts['year'];
    var definedMonth = opts && toValidMonth(opts['month']);
    var definedDay = opts && toValidDay(definedYear, definedMonth, opts['day']);

    function generate() {
      var year = definedYear || generateYear(1960, 1999);
      var month = definedMonth || generateMonth(year);
      var day = definedDay || generateDay(year, month);

      return {'year': year,
              'month': month,
              'day': day};
    }

    return generate;
  }

  function GenderGenerator(opts) {
    var self = this;
    var definedGender = opts && opts['gender'];
    if(definedGender) {
      assert.equal(true, definedGender === 'm' || definedGender == 'f');
    }

    function generate() {
      var gender = definedGender;
      if(!gender) {
        var randval = Math.random();
        if(randval >= 0.5) {
          gender = 'm';
        } else {
          gender = 'f';
        }
      }
      return gender;
    }
    return generate;
  }

  function NameGenerator(opts) {
    /*
      성씨 : http://ask.nate.com/qna/view.html?n=6347343
      이름 : http://ko.wikipedia.org/wiki/%ED%95%9C%EA%B5%AD%EC%9D%98_%EC%84%B1%EC%94%A8%EC%99%80_%EC%9D%B4%EB%A6%84
      나중에 테이블을 교체할지 모르지만, 많은 데이터는 나중에 DB로 옮기는거로 생각하고 코드에는 간단하게만 남긴다
      이름의 경우는 75년 이후의 자료만을 이용한다.
    */

    var self = this;
    var definedLast = opts && opts['last'];
    var definedFirst = opts && opts['first'];
    var definedGender = opts && opts['gender'];
    if(definedGender) {
      assert.equal(true, definedGender === 'm' || definedGender == 'f');
    }
    if(definedLast == '') {
      definedLast = undefined;
    }
    if(definedFirst == '') {
      definedFirst = undefined;
    }


    var LAST_NAME_TABLE = [['김', 9925949],
                            ['이', 6794637],
                            ['박', 3895121],
                            ['최', 2169704],
                            ['정', 2010117],
                            ['강', 1044386],
                            ['조', 984913],
                            ['윤', 948600],
                            ['장', 919339],
                            ['임', 762767]];
    var MALE_NAME_TABLE = ['준호', '도현', '동현', '성호', '영진',
                           '정호', '예준', '승민', '진우', '승현',
                           '성민', '준영', '현준', '민수', '준혁',
                           '현우', '상현', '지훈', '지후', '성진',
                           '민석', '정훈', '우진', '민준', '성훈',
                           '상훈', '민재', '준서', '건우'];


    var FEMALE_NAME_TABLE = ['지연', '은지', '수민', '서연', '지현',
                             '수진', '지영', '유진', '지혜', '보람',
                             '아름', '지민', '지우', '현정', '윤서',
                             '은주', '현주', '혜진', '은경', '은정',
                             '민지', '하은', '지원', '지은', '예원',
                             '민서', '서영', '예은', '서현', '수빈',
                             '미영', '미경', '예지', '예진', '현지',
                             '선영', '미정', '은영', '서윤'];

    function generateLast() {
      //TODO: ratio를 이용하도록 고치기
      var gen = new RandomGenerator();
      var idx = gen.randint(0, LAST_NAME_TABLE.length - 1);
      return LAST_NAME_TABLE[idx][0];
    }

    function generateFirst(gender) {
      var nameList = null;
      if(gender === 'm') {
        nameList = MALE_NAME_TABLE;
      } else if(gender === 'f') {
        nameList = FEMALE_NAME_TABLE;
      }

      var gen = new RandomGenerator();
      var idx = gen.randint(0, nameList.length - 1);
      return nameList[idx];
    }

    function generate() {
      var gender = definedGender;
      if(!gender) {
        var gen = new GenderGenerator();
        gender = gen();
      }

      var last = definedLast || generateLast();
      var first = definedFirst || generateFirst(gender);
      return {'last': last,
              'first': first,
              'full': last + first,
              'gender': gender};
    }
    return generate;
  }

  exports.BirthdayGenerator = BirthdayGenerator;
  exports.GenderGenerator = GenderGenerator;
  exports.NameGenerator = NameGenerator;

  if('undefined' !== typeof window) {
    window.person_gen = module.exports;
  }
})(this, 'undefined' !== typeof module ? module : {exports: {}});
