import supported from 'frampton-style/supported';

const eventMap = {
  'WebkitTransition' : 'webkitTransitionEnd',
  'MozTransition' : 'transitionend',
  'transition' : 'transitionend'
};

function transitionEnd() {
  return (eventMap[supported('transition')] || null);
}

export default transitionEnd();
