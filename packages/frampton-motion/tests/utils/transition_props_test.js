import transitionProps from 'frampton-motion/utils/transition_props';

QUnit.module('Frampton.Motion.Utils.transitionProps');

QUnit.test('generates transition-property from hash', function(assert) {
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
