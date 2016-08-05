import supported from 'frampton-style/supported';

/**
 * Returns an object of properties to animate in this transition
 *
 * {
 *    height : 0px,
 *    opacity : 0
 * }
 *
 * {
 *    transition-property : 'height, opacity'
 * }
 *
 * @name transitionProps
 * @method
 * @private
 * @memberof Frampton.Motion.Utils
 * @param {Object} props
 * @returns {Object}
 */
export default function transition_props(props) {
  const trans = {};
  trans[supported('transition-property')] = Object.keys(props).join(', ');
  return trans;
}
