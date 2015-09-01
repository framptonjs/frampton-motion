import parsedProps from 'frampton-motion/parsed_props';

QUnit.module('Frampton.Motion.parsedProps');

QUnit.test('should correctly filter transition properties', function() {
  var frame = {
    'height'              : 0,
    'opacity'             : 0,
    'transition-duration' : 0,
    'transition-delay'    : 0
  };
  deepEqual(
    parsedProps(frame),
    {
      'height'  : 0,
      'opacity' : 0
    }
  );
});