import onEvent from 'frampton-events/on_event';
import transitionend from 'frampton-motion/utils/transition_end';

export default function end_once(transition, fn) {
  onEvent(transitionend, transition.element).filter((evt) => {
    const dataId = evt.target.getAttribute('data-transition-id');
    const testId = (dataId || '').trim();
    return (testId === transition.id);
  }).take(1).next(fn);
}
