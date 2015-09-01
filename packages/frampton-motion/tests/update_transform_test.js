import updateTransform from 'frampton-motion/update_transform';

QUnit.module('Frampton.Motion.updateTransform');

QUnit.test('should correctly change first value', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  equal(
    updateTransform(transform, 'translateX', '50px'),
    'translateX(50px) rotate(180deg) scale(1.5)'
  );
});

QUnit.test('should correctly change middle value', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  equal(
    updateTransform(transform, 'rotate', '90deg'),
    'translateX(100px) rotate(90deg) scale(1.5)'
  );
});

QUnit.test('should correctly change last value', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  equal(
    updateTransform(transform, 'scale', '0.4'),
    'translateX(100px) rotate(180deg) scale(0.4)'
  );
});

QUnit.test('should correctly delete property', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  equal(
    updateTransform(transform, 'rotate', ''),
    'translateX(100px) scale(1.5)'
  );
});

QUnit.test('should delete property if passing null', function() {
  var transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  equal(
    updateTransform(transform, 'rotate', null),
    'translateX(100px) scale(1.5)'
  );
});