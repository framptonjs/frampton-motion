import isNothing from 'frampton-utils/is_nothing';
import normalizedFrame from 'frampton-motion/utils/normalized_frame';
import validatedClass from 'frampton-motion/utils/validated_class';
import emptyTransition from 'frampton-motion/utils/empty_transition';

export default function validated_transition(desc) {

  if (isNothing(desc)) {
    return emptyTransition();
  } else {

    const newTransition = emptyTransition();

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
