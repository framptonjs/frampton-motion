import isNumber from 'frampton-utils/is_number';
import contains from 'frampton-list/contains';
import easing from 'frampton-motion/data/easing';

const alias_mapping = {
  'duration' : 'transition-duration',
  'delay' : 'transition-delay'
};

//+ durations :: String -> Boolean
const durations = contains(
  ['transition-duration', 'transition-delay']
);

//+ pixels :: String -> Boolean
const pixels = contains(
  ['height', 'width', 'left', 'top', 'right', 'bottom']
);

export default function normalized_frame(frame) {
  const obj = {};
  for (let key in (frame || {})) {

    // Handle aliased props
    if (alias_mapping[key]) {
      if (isNumber(frame[key])) {
        obj[alias_mapping[key]] = frame[key] + 'ms';
      } else {
        obj[alias_mapping[key]] = frame[key];
      }

    // Handle props that default to pixels
    } else if (pixels(key) && isNumber(frame[key])) {
      obj[key] = frame[key] + 'px';

    // Handle durations default to miliseconds
    } else if (durations(key) && isNumber(frame[key])) {
      obj[key] = frame[key] + 'ms';

    // Handle aliased timing functions
    } else if (key === 'transition-timing-function') {
      obj[key] = (easing[frame[key]] ? easing[frame[key]] : frame[key]);

    // Otherwise do a direct copy
    } else {
      obj[key] = frame[key];
    }
  }
  return obj;
}
