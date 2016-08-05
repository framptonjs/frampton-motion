import emptyClass from 'frampton-motion/data/empty_class';
import validatedTransition from 'frampton-motion/utils/validated_transition';

QUnit.module('Frampton.Motion.Utils.validatedTransition');

QUnit.test('Should return an empty tranition for null', function(assert) {
  const actual = validatedTransition(null);
  const expected = {
    from : {
      class : emptyClass(),
      style : {}
    },
    to : {
      class : emptyClass(),
      style : {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('Should return transition for string', function(assert) {
  const actual = validatedTransition('test class');
  const expected = {
    from : {
      class : emptyClass(),
      style : {}
    },
    to : {
      class : {
        add : ['test', 'class'],
        remove : []
      },
      style : {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('Should return proper formatting for missing from/to blocks', function(assert) {
  const tansition = {
    class : 'test',
    style : {}
  };
  const actual = validatedTransition(tansition);
  const expected = {
    from : {
      class : emptyClass(),
      style : {}
    },
    to : {
      class : {
        add : ['test'],
        remove : []
      },
      style : {}
    }
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('Should correctly format class strings', function(assert) {
  const tansition = {
    from : {
      class : 'test',
      style : {}
    },
    to : {
      class : 'boo goo',
      style : {}
    }

  };
  const actual = validatedTransition(tansition);
  const expected = {
    from : {
      class : {
        add : ['test'],
        remove : []
      },
      style : {}
    },
    to : {
      class : {
        add : ['boo', 'goo'],
        remove : []
      },
      style : {}
    }
  };

  assert.deepEqual(actual, expected);
});
