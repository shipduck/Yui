if(typeof window === 'undefined') {
  assert = require('assert');
  person_gen = process.env.LIB_COV ? require('../lib-cov/person_gen.js') : require('../lib/person_gen.js');
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
    })
  })
})
