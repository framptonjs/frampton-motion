import transitionProps from 'frampton-motion/transition_props';

QUnit.module('Frampton.Motion.transitionProps');

QUnit.test('should generate transition-property from hash', function() {
  var frame = {
    'height'  : 0,
    'width'   : 0,
    'opacity' : 0
  };
  deepEqual(
    transitionProps(frame),
    {
      'transition-property' : 'height, width, opacity'
    }
  );
});