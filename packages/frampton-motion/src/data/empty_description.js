import emptyTransition from 'frampton-motion/data/empty_transition';

export default function empty_description() {
  return {
    from : emptyTransition(),
    to : emptyTransition()
  };
}
