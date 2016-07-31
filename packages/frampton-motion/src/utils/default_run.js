import immediate from 'frampton-utils/immediate';
import noop from 'frampton-utils/noop';
import applyStyles from 'frampton-style/apply_styles';
import setDirection from 'frampton-motion/utils/set_direction';
import reflow from 'frampton-motion/utils/reflow';
import once from 'frampton-motion/utils/once';
import findChild from 'frampton-motion/utils/find_child';
import resolveStyles from 'frampton-motion/utils/resolve_styles';
import setState from 'frampton-motion/utils/set_state';
import endOnce from 'frampton-motion/utils/end_once';
import prepare from 'frampton-motion/utils/prepare';
import applyClasses from 'frampton-motion/utils/apply_classes';

import {
  DIRECTION,
  STATE
} from 'frampton-motion/data/constants';

/**
 * @name defaultRun
 * @private
 * @method
 * @memberof Frampton.Motion.Transition
 * @param {Function} resolve
 * @param {Frampton.Motion.Transition#}
 */
export default function default_run(resolve, child) {

  const complete = once(() => {
    setState(this, STATE.CLEANUP);
    reflow(this.element);
    setState(this, STATE.DONE);
    immediate(() => {
      (resolve || noop)(this.element);
    });
  });

  /**
   * Force a reflow of our element to make sure everything is prestine for us
   * to start fuckin' things up. Without doing this, some browsers will not have
   * the correct current state of our element in which to start the transition
   * from.
   */
  prepare(this.element, this.frame.from);

  this.element.setAttribute('data-transition-id', this.id);

  endOnce(this, complete);

  setDirection(this, this.direction);

  immediate(() => {
    applyClasses(this.element, this.frame.to.class, this.direction);
    if (this.direction === DIRECTION.DIR_IN) {
      applyStyles(this.element, this.config);
      reflow(this.element);
      applyStyles(this.element, this.supported);
    } else {
      applyStyles(this.element, this.config);
      reflow(this.element);
      resolveStyles(
        this.element,
        this.supported,
        findChild(child, this.element)
      );
    }
  });

  setState(this, STATE.RUNNING);
}
