import isNumber from 'frampton-utils/is_number';
import contains from 'frampton-list/contains';

var alias_mapping = {
  'duration' : 'transition-duration',
  'delay' : 'transition-delay'
};

var pixels = contains(
  ['height', 'width', 'left', 'top', 'right', 'bottom']
);

export default function normalized_frame(frame) {
  var obj = {};
  for (let key in frame) {
    if (alias_mapping[key]) {
      obj[alias_mapping[key]] = frame[key];
    } else if (pixels(key) && !isNumber(frame[key])) {
      obj[key] = frame[key] + 'px';
    } else {
      obj[key] = frame[key];
    }
  }
  return obj;
}