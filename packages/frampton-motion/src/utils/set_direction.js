import inverseDirection from 'frampton-motion/utils/inverse_direction';

/**
 * @name setDirection
 * @memberof Frampton.Motion.Utils
 * @param {Frampton.Motion.Transition#} transition
 * @param {String} dir
 */
export default function set_direction(transition, dir) {
  if (transition.element) {
    transition.element.classList.remove(inverseDirection(dir));
    transition.element.classList.add(dir);
  }
  transition.direction = dir;
}
