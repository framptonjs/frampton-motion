import { DIRECTION } from 'frampton-motion/data/constants';
import inverseDirection from 'frampton-motion/utils/inverse_direction';

QUnit.module('Frampton.Motion.Utils.inverseDirection');

QUnit.test('correctly reverses direction', function(assert) {
  const dir = DIRECTION.DIR_IN;
  const actual = inverseDirection(dir);
  const expected = DIRECTION.DIR_OUT;
  assert.equal(actual, expected);
});
