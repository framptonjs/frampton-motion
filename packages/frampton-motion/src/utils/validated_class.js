import isArray from 'frampton-utils/is_array';
import isString from 'frampton-utils/is_string';
import isObject from 'frampton-utils/is_object';
import notEmpty from 'frampton-motion/utils/not_empty';
import emptyClass from 'frampton-motion/utils/empty_class';

export default function validated_class(str) {

  if (isString(str)) {

    return {
      add : str.split(' ').filter(notEmpty),
      remove : []
    };

  } else if (isObject(str)) {

    let newClass = emptyClass();

    if (isArray(str.add)) {
      for (let i = 0; i < str.add.length; i++) {
        newClass.add.push(str.add[i]);
      }
    }

    if (isArray(str.remove)) {
      for (let i = 0; i < str.remove.length; i++) {
        newClass.remove.push(str.remove[i]);
      }
    }

    return newClass;

  } else {
    return emptyClass();
  }
}
