import isNothing from 'frampton-utils/is_nothing';
import isString from 'frampton-utils/is_string';
import normalizedFrame from 'frampton-motion/utils/normalized_frame';
import validatedClass from 'frampton-motion/utils/validated_class';
import emptyDescription from 'frampton-motion/data/empty_description';

/**
 * @name validatedTransition
 * @memberof Frampton.Motion.Utils
 * @private
 * @param {String|Object} desc A description of the transition
 * @returns {Object} An object representing a transition.
 */
export default function validated_transition(desc) {

  const newTransition = emptyDescription();

  if (isNothing(desc)) {

    return newTransition;

  } else if (isString(desc)) {

    newTransition.to.class = validatedClass(desc);
    return newTransition;

  } else {

    if (desc.from || desc.to || desc.style || desc.class) {
      if (desc.from && (desc.from.style || desc.from.class)) {
        newTransition.from.class = validatedClass(desc.from.class);
        newTransition.from.style = normalizedFrame(desc.from.style);
      } else {
        newTransition.from.style = normalizedFrame(desc.from);
      }

      if (desc.to && (desc.to.style || desc.to.class)) {
        newTransition.to.class = validatedClass(desc.to.class);
        newTransition.to.style = normalizedFrame(desc.to.style);
      } else {
        newTransition.to.style = normalizedFrame(desc.to);
      }

      if (desc.class) {
        newTransition.to.class = validatedClass((desc.class));
      }

      if (desc.style) {
        newTransition.to.style = normalizedFrame(desc.style);
      }
    } else {
      newTransition.to.style = normalizedFrame(desc);
    }

    return newTransition;
  }
}
