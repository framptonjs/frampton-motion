import transforms from 'frampton-motion/transforms';

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
 * @memberof Frampton.Motion
 * @param {String} transform
 * @returns {Object}
 */
export default function transform_object(transform) {
  var obj = {};
  for (let i=0;i<transforms.length;i++) {
    let prop = transforms[i];
    let cap = new RegExp(prop + "\\(([^)]+)\\)");
    let matches = cap.exec(transform);
    if (matches && matches.length) {
      obj[prop] = matches[0].replace(prop + '(', '').replace(')', '');
    }
  }
  return obj;
}