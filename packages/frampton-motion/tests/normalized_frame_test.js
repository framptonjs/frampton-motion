import normalizedFrame from 'frampton-motion/normalized_frame';

QUnit.module('Frampton.Motion.normalizedFrame');

QUnit.test('should return object with props correctly formatted', function() {
  var frame = {
    'height'                     : 0,
    'transition-duration'        : 300,
    'delay'                      : '200ms',
    'transition-timing-function' : 'ease-out-sine'
  };
  deepEqual(
    normalizedFrame(frame),
    {
      'height'                     : '0px',
      'transition-duration'        : '300ms',
      'transition-delay'           : '200ms',
      'transition-timing-function' : 'cubic-bezier(0.390, 0.575, 0.565, 1.000)'
    }
  );
});