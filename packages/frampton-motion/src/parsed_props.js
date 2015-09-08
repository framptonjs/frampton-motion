import reduceObj from 'frampton-object/reduce';
import contains from 'frampton-list/contains';
import supported from 'frampton-style/supported';
import transitions from 'frampton-motion/transitions';

export default function parsed_props(props) {
  return reduceObj((acc, value, key) => {
    if (!contains(transitions, key)) {
      acc[supported(key)] = value;
    }
    return acc;
  }, {}, props);
}