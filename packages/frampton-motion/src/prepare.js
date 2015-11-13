import isObject from 'frampton-utils/is_object';
import addClass from 'frampton-style/add_class';
import applyStyles from 'frampton-style/apply_styles';
import normalizedFrame from 'frampton-motion/normalized_frame';
import reflow from 'frampton-motion/reflow';

export default function prepare(element, classes, props) {
  if (isObject(classes)) {
    applyStyles(element, normalizedFrame(classes));
  } else {
    classes.split(' ').forEach(addClass(element));
    applyStyles(element, normalizedFrame(props));
  }
  return (reflow(element), true);
}