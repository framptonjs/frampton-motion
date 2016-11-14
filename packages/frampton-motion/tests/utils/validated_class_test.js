import validatedClass from 'frampton-motion/utils/validated_class';

QUnit.module('Frampton.Motion.Utils.validatedClass');

QUnit.test('correctly converts string into object', function(assert) {
  const className = 'test class here';
  const actual = validatedClass(className);
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('correctly handles extra spaces', function(assert) {
  const className = ' test     class  here  ';
  const actual = validatedClass(className);
  const expected = {
    add : ['test', 'class', 'here'],
    remove : []
  };

  assert.deepEqual(actual, expected);
});

QUnit.test('correctly handles empty strings', function(assert) {
  const className = '';
  const actual = validatedClass(className);
  const expected = {
    add : [],
    remove : []
  };

  assert.deepEqual(actual, expected);
});
