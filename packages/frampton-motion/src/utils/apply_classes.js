import addClasses from 'frampton-motion/utils/add_classes';
import removeClasses from 'frampton-motion/utils/remove_classes';
import { DIRECTION } from 'frampton-motion/data/constants';


export default function apply_classes(element, classes, dir) {
  // When transitioning out, do the reverse
  if (dir === DIRECTION.DIR_OUT) {
    removeClasses(element, classes.add);
    addClasses(element, classes.remove);
  } else {
    removeClasses(element, classes.remove);
    addClasses(element, classes.add);
  }
}
