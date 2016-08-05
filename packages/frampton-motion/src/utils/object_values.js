const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name objectValues
 * @method
 * @memberof Frampton.Motion.Utils
 * @param {Object} obj Object whose values to get
 * @returns {String[]}
 */
export default function object_values(obj) {
  const result = [];
  for (let key in obj) {
    if (hasOwnProp.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
}
