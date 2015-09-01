import supported from 'frampton-style/supported';

export default function parsed_timing(props) {

  var timing = {};

  if (props['transition-delay']) {
    timing[supported('transition-delay')] = props['transition-delay'];
  }

  if (props['transition-duration']) {
    timing[supported('transition-duration')] = props['transition-duration'];
  }

  return timing;
}