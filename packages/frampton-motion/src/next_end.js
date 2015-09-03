import noop from 'frampton-utils/noop';
import once from 'frampton-events/once';
import transitionend from 'frampton-motion/transition_end';

/**
 * Call the given function the next time the element recieves a transitionend
 *
 * @name nextEnd
 * @method
 * @private
 * @memberof Frampton.Motion
 * @param {Object} element
 * @param {Function} fn
 */
export default function next_end(element, fn) {
  once(transitionend, element).next((evt) => {
    (fn || noop)(evt);
  });
}