import updateTransform from 'frampton-motion/utils/update_transform';

QUnit.module('Frampton.Motion.Utils.updateTransform');

QUnit.test('should correctly change first value', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = updateTransform(transform, 'translateX', '50px');
  const expected = 'translateX(50px) rotate(180deg) scale(1.5)';
  assert.equal(actual, expected);
});

QUnit.test('should correctly change middle value', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = updateTransform(transform, 'rotate', '90deg');
  const expected = 'translateX(100px) rotate(90deg) scale(1.5)';
  assert.equal(actual, expected);
});

QUnit.test('should correctly change last value', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = updateTransform(transform, 'scale', '0.4');
  const expected = 'translateX(100px) rotate(180deg) scale(0.4)';
  assert.equal(actual, expected);
});

QUnit.test('should correctly delete property', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = updateTransform(transform, 'rotate', '');
  const expected = 'translateX(100px) scale(1.5)';
  assert.equal(actual, expected);
});

QUnit.test('should delete property if passing null', function(assert) {
  const transform = 'translateX(100px) rotate(180deg) scale(1.5)';
  const actual = updateTransform(transform, 'rotate', null);
  const expected = 'translateX(100px) scale(1.5)';
  assert.equal(actual, expected);
});
