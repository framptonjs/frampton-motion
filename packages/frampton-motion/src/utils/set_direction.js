import inverseDirection from 'frampton-motion/utils/inverse_direction';
import isValidDirection from 'frampton-motion/utils/is_valid_direction';

/**
 * @name setDirection
 * @memberof Frampton.Motion.Utils
 * @param {Frampton.Motion.Transition#} transition
 * @param {String} dir
 */
export default function set_direction(transition, dir) {
  if (isValidDirection(dir)) {
    if (transition.element) {
      transition.element.classList.remove(inverseDirection(dir));
      transition.element.classList.add(dir);
    }
    transition.direction = dir;
  } else {
    throw new Error('Transition received an invalid directino: ' + dir);
  }
}
