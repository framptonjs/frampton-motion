/**
 * sequence :: [Transition] -> Transition
 *
 * @name sequence
 * @method
 * @memberof Frampton.Motion
 * @param {...Frampton.Motion.Transition} transitions One or more transitions to run
 * @returns {Frampton.Motion.Transition} A new Transition that runs the given tranisitions
 in sequence
 */
export default function sequence_transitions(...transitions) {
  return transitions.reduce((acc, next) => {
    return acc.chain(next);
  });
}