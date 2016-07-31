import reduceObj from 'frampton-record/reduce';
import listContains from 'frampton-list/contains';
import supported from 'frampton-style/supported';
import transitions from 'frampton-motion/data/transitions';

export default function parsed_props(props) {
  return reduceObj((acc, value, key) => {
    if (!listContains(transitions, key)) {
      acc[supported(key)] = value;
    }
    return acc;
  }, {}, props);
}
