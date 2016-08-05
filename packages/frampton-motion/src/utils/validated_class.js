import isArray from 'frampton-utils/is_array';
import isString from 'frampton-utils/is_string';
import isObject from 'frampton-utils/is_object';
import notEmpty from 'frampton-motion/utils/not_empty';
import emptyClass from 'frampton-motion/data/empty_class';

/**
 * @name validatedClass
 * @memberof Frampton.Motion.Utils
 * @private
 * @param {String|Object} toValidate
 * @returns {Object}
 */
export default function validated_class(toValidate) {

  if (isString(toValidate)) {

    return {
      add : toValidate.split(' ').filter(notEmpty),
      remove : []
    };

  } else if (isObject(toValidate)) {

    let newClass = emptyClass();

    if (isArray(toValidate.add)) {
      for (let i = 0; i < toValidate.add.length; i++) {
        newClass.add.push(toValidate.add[i]);
      }
    }

    if (isArray(toValidate.remove)) {
      for (let i = 0; i < toValidate.remove.length; i++) {
        newClass.remove.push(toValidate.remove[i]);
      }
    }

    return newClass;

  } else {
    return emptyClass();
  }
}
