import objectValues from 'frampton-motion/utils/object_values';

/**
 * @name isValueOf
 * @memberof Frampton.Motion.Utils
 * @private
 * @param {Object} obj Object to test value against
 * @returns {Function} Function that tests values
 */
export default function is_value_of(obj) {

  const values = objectValues(obj);

  return function(val) {
    return (values.indexOf(val) !== -1);
  };
}
