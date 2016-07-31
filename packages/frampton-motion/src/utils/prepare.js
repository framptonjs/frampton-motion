import applyStyles from 'frampton-style/apply_styles';
import reflow from 'frampton-motion/utils/reflow';
import applyClasses from 'frampton-motion/utils/apply_classes';

/**
 * {
 *   from : {
 *     class : {
 *       add : [],
 *       remove : []
 *     },
 *     style : {}
 *   },
 *   to : {
 *     class : {
 *       add : [],
 *       remove : []
 *     },
 *     style : {}
 *   }
 * }
 *
 * @name prepare
 * @param {Element} element
 * @param {Object} frame
 */
export default function prepare(element, frame) {
  applyClasses(element, frame.class);
  applyStyles(element, frame.style);
  return (reflow(element), true);
}
