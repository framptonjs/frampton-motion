import setStyle from 'frampton-style/set_style';
import removeStyle from 'frampton-style/remove_style';
import removeStyles from 'frampton-style/remove_styles';
import { DIRECTION } from 'frampton-motion/data/constants';

/**
 * If a child of this transition manipulates the same element we need to prepare
 * for that. Usually we would just remove styles here, however, it the child
 * transition is moving in the out direction it needs the styles as a starting
 * point. That is the reverse of a transition has the end point of a forward
 * transition be the start point of reversed transition.
 *
 * @name resolveStyles
 * @function
 * @param {Element} element
 * @param {Object} frame
 * @param {Frampton.Motion.Transition}
 */
export default function resolve_styles(element, frame, child) {
  if (child && child.direction === DIRECTION.DIR_OUT && child.element === element) {
    for (let key in frame) {
      // The child is modifying this style
      if (child.frame.to.style[key]) {
        setStyle(element, key, child.frame.to.style[key]);

      // The child is not modifying this style... remove
      } else {
        removeStyle(element, key);
      }
    }

  // No matching child we are safe to remove styles
  } else {
    removeStyles(element, frame);
  }
}
