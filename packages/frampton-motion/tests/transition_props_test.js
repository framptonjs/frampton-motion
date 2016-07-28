import transitionProps from 'frampton-motion/transition_props';

QUnit.module('Frampton.Motion.transitionProps');

QUnit.test('should generate transition-property from hash', function(assert) {
  const frame = {
    'height'  : 0,
    'width'   : 0,
    'opacity' : 0
  };

  const actual = transitionProps(frame);
  const expected = {
    'transition-property' : 'height, width, opacity'
  };

  assert.deepEqual(actual, expected);
});
