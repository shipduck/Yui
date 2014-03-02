if(typeof window === 'undefined') {
  assert = require('assert');
  person_gen = process.env.EXPRESS_COV ? require('../lib-cov/person_gen.js') : require('../lib/person_gen.js');
}

describe('BirthdayGenerator', function() {
  describe('#call', function() {
    it('define year', function() {
      var year = 1990;
      var gen = new person_gen.BirthdayGenerator({'year': year});
      var actual = gen();
      assert.equal(year, actual.year);
    })

    it('define month', function() {
      var month = 5;
      var gen = new person_gen.BirthdayGenerator({'month': month});
      var actual = gen();
      assert.equal(month, actual.month);
    })

    if('not valid month', function() {
      var gen = new person_gen.BirthdayGenerator({'month': -1});
      var actual = gen();
      assert.equal(1, actual.month);

      var gen = new person_gen.BirthdayGenerator({'month': 13});
      var actual = gen();
      assert.equal(12, actual.month);
    });

    it('define month/day', function() {
      var month = 3;
      var day = 1;
      var gen = new person_gen.BirthdayGenerator({'month': month,
                                                  'day': day});
      var actual = gen();
      assert.equal(month, actual.month);
      assert.equal(day, actual.day);
    });

    it('not valid day', function() {
      var gen = new person_gen.BirthdayGenerator({'month': 2, 'day': -1});
      var actual = gen();
      assert.equal(1, actual.day);

      var gen = new person_gen.BirthdayGenerator({'month': 2, 'day': 30});
      var actual = gen();
      assert.equal(28, actual.day);
    });

    it('random', function() {
      var gen = new person_gen.BirthdayGenerator();
      var data = gen();
      //console.log(data);
    })
  })
})

describe('GenderGenerator', function() {
  describe('#call', function() {
    it('defined', function() {
      var gender = 'm';
      for(var i = 0 ; i < 10 ; i++) {
        var gen = new person_gen.GenderGenerator({'gender': gender});
        var actual = gen();
        assert.equal(gender, actual);
      }
    })
    it('random', function() {
      var gen = new person_gen.GenderGenerator();
      var actual = gen();
      //console.log(actual);
    })
  })
})

describe('NameGenerator', function() {
  describe('#call', function() {
    it('define last', function() {
      var last = '테';
      var gen = new person_gen.NameGenerator({'last': last});
      var actual = gen();
      assert.equal(last, actual.last);
    })

    it('define first', function() {
      var first = '철수';
      var gen = new person_gen.NameGenerator({'first': first});
      var actual = gen();
      assert.equal(first, actual.first);
    })

    it('define gender', function() {
      var gender = 'm';
      var gen = new person_gen.NameGenerator({'gender': gender});
      var actual = gen();

      var gender = 'f';
      var gen = new person_gen.NameGenerator({'gender': gender});
      var actual = gen();
    })

    it('random', function() {
      var gen = new person_gen.NameGenerator();
      var actual = gen();
      //console.log(actual);
    })
  })
})
