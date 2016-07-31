import { STATE } from 'frampton-motion/data/constants';

export default function reset_state(transition) {
  transition.element.classList.remove('transition-' + STATE.WAITING);
  transition.element.classList.remove('transition-' + STATE.STARTED);
  transition.element.classList.remove('transition-' + STATE.RUNNING);
  transition.element.classList.remove('transition-' + STATE.CLEANUP);
  transition.element.classList.remove('transition-' + STATE.DONE);
}
