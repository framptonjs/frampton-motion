import resetState from 'frampton-motion/utils/reset_state';

export default function set_state(transition, state) {
  if (transition.element) {
    resetState(transition);
    transition.element.classList.add('transition-' + state);
    transition.element.setAttribute('data-transition-state', state);
  }
  transition.state = state;
}
