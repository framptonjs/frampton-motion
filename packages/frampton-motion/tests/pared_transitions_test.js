import parsedTransitions from 'frampton-motion/parsed_transitions';

QUnit.module('Frampton.Motion.parsedTransitions');

QUnit.test('should generate transition-property from hash', function() {
  var frame = {
    'height'  : 0,
    'width'   : 0,
    'opacity' : 0
  };
  deepEqual(
    parsedTransitions(frame),
    {
      'transition-property' : 'height, width, opacity'
    }
  );
});