(function(global, module) {
  var exports = module.exports;

  function RandomGenerator() {
    var self = this;

    function randint(min, max) {
      var min = min || 0;
      var max = max || 100;
      var val = parseInt((Math.random() * (max - min)) + min, 10);
      if(val > max) {
        val = min;
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


    var definedYear = opts && opts['year'];
    var definedMonth = opts && toValidMonth(opts['month']);
    var definedDay = opts && toValidDay(definedYear, definedMonth, opts['day']);

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

  exports.BirthdayGenerator = BirthdayGenerator;

  if('undefined' !== typeof window) {
    window.person_gen = module.exports;
  }
})(this, 'undefined' !== typeof module ? module : {exports: {}});
