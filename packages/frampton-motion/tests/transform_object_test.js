import transformObject from 'frampton-motion/transform_object';

QUnit.module('Frampton.Motion.transformObject');

QUnit.test('should return an object representing values in string', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = transformObject(transform);
  const expected = {
    translateX : '100px',
    rotate : '180deg',
    scale : '1.5'
  };

  assert.deepEqual(actual, expected);
});
