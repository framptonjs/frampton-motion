import parsedProps from 'frampton-motion/utils/parsed_props';

QUnit.module('Frampton.Motion.Utils.parsedProps');

QUnit.test('correctly filters transition properties', function(assert) {
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
