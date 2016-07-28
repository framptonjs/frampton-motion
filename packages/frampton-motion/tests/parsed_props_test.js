import parsedProps from 'frampton-motion/parsed_props';

QUnit.module('Frampton.Motion.parsedProps');

QUnit.test('should correctly filter transition properties', function(assert) {
  const frame = {
    'height' : 0,
    'opacity' : 0,
    'transition-duration' : 0,
    'transition-delay' : 0
  };

  const actual = parsedProps(frame);
  const expected = {
    'height' : 0,
    'opacity' : 0
  };

  assert.deepEqual(actual, expected);
});
