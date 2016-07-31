import onEvent from 'frampton-events/on_event';
import transitionend from 'frampton-motion/utils/transition_end';

export default function end_once(transition, fn) {
  onEvent(transitionend, transition.element).filter((evt) => {
    const testId = evt.target.getAttribute('data-transition-id').trim();
    return (testId === transition.id);
  }).take(1).next(fn);
}
