import transforms from 'frampton-motion/data/transforms';

/**
 * Give a string representing a CSS transform it returns an object representation
 * of the transform.
 *
 * EXAMPLE:
 *
 * transformObject('rotate(80deg) translate(100px, 50px) scale(0.5)');
 *
 * returns:
 * {
 *   rotate : '80deg',
 *   translate : '100px, 50px',
 *   scale : '0.5'
 * }
 *
 * @name transformObject
 * @method
 * @private
 * @memberof Frampton.Motion.Utils
 * @param {String} transform
 * @returns {Object}
 */
export default function transform_object(transform) {
  const obj = {};
  const len = transforms.length;
  for (let i=0; i<len; i++) {
    const prop = transforms[i];
    const cap = new RegExp(prop + "\\(([^)]+)\\)");
    const matches = cap.exec(transform);
    if (matches && matches.length) {
      obj[prop] = matches[0].replace(prop + '(', '').replace(')', '');
    }
  }
  return obj;
}
