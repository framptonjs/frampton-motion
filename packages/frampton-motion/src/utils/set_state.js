import resetState from 'frampton-motion/utils/reset_state';
import isValidState from 'frampton-motion/utils/is_valid_state';

/**
 * @name setState
 * @memberof Frampton.Motion.Utils
 * @private
 * @param {Frampton.Motion.Transition} transition
 * @param {String} state
 */
export default function set_state(transition, state) {
  if (isValidState(state)) {
    if (transition.element) {
      resetState(transition);
      transition.element.classList.add('transition-' + state);
      transition.element.setAttribute('data-transition-state', state);
    }
    transition.state = state;
  } else {
    throw new Error('Transition received an invalid state: ' + state);
  }
}
