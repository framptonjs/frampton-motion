import isString from 'frampton-utils/is_string';
import contains from 'frampton-string/contains';

function propValue(prop, value) {
  return (prop + '(' + value + ')');
}

/**
 * Updates the value of a transform in a CSS string.
 *
 * updateTransform('rotate(90deg) scale(0.5)', 'scale', '0.8');
 * // -> 'rotate(90deg) scale(0.8)'
 *
 * // Delete a prop from the transform
 * updateTransform('rotate(90deg) scale(0.5)', 'scale', null);
 * // -> 'rotate(90deg)'
 *
 * @name updateTransform
 * @method
 * @private
 * @memberof Frampton.Motion
 * @param {String} transform
 * @param {String} prop
 * @param {String|Number} value
 * @returns {String}
 */
export default function updateTransform(transform, prop, value) {

  transform =
    (isString(transform) ? transform : '').trim();

  // Updating an existing prop
  if (contains(prop, transform)) {
    const reg = new RegExp(prop + "\\([^)]*\\)");
    if (isString(value) && value.trim() !== '') {
      transform = transform.replace(reg, propValue(prop, value));
    } else {
      transform = transform.replace(reg, '').replace('  ', ' ');
    }

  // Adding a new prop
  } else {
    if (transform.length > 0) {
      transform = transform + ' ';
    }
    transform = transform + propValue(prop, value);
  }

  return transform.trim();
}
