import noop from 'frampton-utils/noop';
import { Transition } from 'frampton-motion/transition';

/**
 * when :: [Transition] -> Transition
 *
 * Takes one or more Transitions and returns a new Transition that represents
 * all of the given Transitions running in parallel. The new Transition completes
 * once all of its child Transitions have completed.
 *
 * @name when
 * @memberOf Frampton.Motion
 * @static
 * @param {Transition} transitions One or more transitions to run
 * @returns {Transition} A new Transition that runs the given tranisitions
 in parallel
 */
export default function when(...transitions) {

  var transition = new Transition();
  transition.name = Transition.WHEN;
  transition.list = transitions;

  transition.reverse = function when_reverse() {
    return when.apply(null, transitions.map((trans) => {
      return trans.reverse();
    }));
  };

  transition.run = function when_run(resolve, child) {

    var len = transitions.length;

    for (let i=0;i<len;i++) {
      transitions[i].run(() => {
        if (i === (len - 1)) {
          (resolve || noop)();
        }
      }, child);
    }
  };

  return transition;
}