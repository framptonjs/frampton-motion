import { TYPE } from 'frampton-motion/data/constants';

/**
 *
 */
export default function find_child(child, element) {
  if (child && child.element) {
    return child;
  } else if (child) {
    if (child.name === TYPE.WHEN) {
      const len = child.list.length;
      for (let i = 0; i < len; i++) {
        if (child.list[i].element === element) {
          return child.list[i];
        }
      }
    } else if (child.name === TYPE.CHAINED) {
      if (child.list[0].element === element) {
        return child.list[0];
      }
    }
  }
  return null;
}
