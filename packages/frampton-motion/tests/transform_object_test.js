import transformObject from 'frampton-motion/transform_object';

QUnit.module('Frampton.Motion.transformObject');

QUnit.test('should return an object representing values in string', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  deepEqual(
    transformObject(transform),
    {
      translateX : '100px',
      rotate     : '180deg',
      scale      : '1.5'
    }
  );
});