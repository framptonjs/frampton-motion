import isString from 'frampton-utils/is_string';
import contains from 'frampton-string/contains';

function propValue(prop, value) {
  return (prop + '(' + value + ')');
}

/**
 *
 *
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

  if (contains(prop, transform)) {
    const reg = new RegExp(prop + "\\([^)]*\\)");
    if (isString(value) && value.trim() !== '') {
      transform = transform.replace(reg, propValue(prop, value));
    } else {
      transform = transform.replace(reg, '').replace('  ', ' ');
    }
  } else {
    if (transform.length > 0) {
      transform = transform + ' ';
    }
    transform = transform + propValue(prop, value);
  }

  return transform.trim();
}
