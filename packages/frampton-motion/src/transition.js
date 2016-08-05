import isSomething from 'frampton-utils/is_something';
import isString from 'frampton-utils/is_string';
import guid from 'frampton-utils/guid';
import notImplemented from 'frampton-utils/not_implemented';
import addToList from 'frampton-list/add';
import removeFromList from 'frampton-list/remove';
import reverse from 'frampton-list/reverse';
import merge from 'frampton-record/merge';
import sequence from 'frampton-motion/sequence';
import setState from 'frampton-motion/utils/set_state';
import inverseDirection from 'frampton-motion/utils/inverse_direction';
import defaultRun from 'frampton-motion/utils/default_run';
import transitionProps from 'frampton-motion/utils/transition_props';
import parsedProps from 'frampton-motion/utils/parsed_props';
import parsedTiming from 'frampton-motion/utils/parsed_timing';
import updateTransform from 'frampton-motion/utils/update_transform';
import validatedTransition from 'frampton-motion/utils/validated_transition';

import {
  DIRECTION,
  STATE,
  TYPE
} from 'frampton-motion/data/constants';

function withDefaultRun(element, frame, dir) {
  const trans = new Transition(element, frame, dir);
  trans.run = defaultRun;
  return trans;
}

function withFrame(transition, props) {

  // Makes a copy of the frame
  const frame = validatedTransition(transition.frame);

  // Add new props to the copy
  for (let key in props) {
    frame.to.style[key] = props[key];
  }

  return withDefaultRun(
    transition.element,
    frame,
    transition.direction
  );
}

/**
 * @name Transition
 * @class
 * @private
 * @memberof Frampton.Motion
 * @param {Object} [element=null]        DomNode to transition
 * @param {Object} [frame={}]            Hash of props to add to element
 * @param {String} [dir='transition-in'] Direction to run transition
 */
function Transition(element, frame, dir) {

  this.id = guid();
  this.list = [this];
  this.name = TYPE.NORMAL;
  this.element = (isSomething(element) ? element : null);
  this.direction = (isSomething(dir) ? dir : DIRECTION.DIR_IN);
  this.frame = validatedTransition(frame);
  this.state = STATE.WAITING;
  this.supported = parsedProps(this.frame.to.style);
  this.config = merge(
    parsedTiming(this.frame.to.style),
    transitionProps(this.supported)
  );

  setState(this, this.state);
}

/**
 * Start the transition. Optionally provide a callback for when transition is complete.
 *
 * @name run
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Function} resolve Function to call when transition is complete.
 */
Transition.prototype.run = notImplemented;

/**
 * @name delay
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} time Miliseconds to delay transition
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.delay = function Transition_delay(time) {
  return withFrame(this, {
    'transition-delay' : (isString(time) ? time : (time + 'ms'))
  });
};

/**
 * @name duration
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} time Miliseconds for transition to run
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.duration = function Transition_duration(time) {
  return withFrame(this, {
    'transition-duration' : (isString(time) ? time : (time + 'ms'))
  });
};

/**
 * @name width
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} width
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.width = function Transition_width(width) {
  return withFrame(this, {
    width : (isString(width) ? width : (width + 'px'))
  });
};

/**
 * @name height
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} height
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.height = function Transition_width(height) {
  return withFrame(this, {
    height : (isString(height) ? height : (height + 'px'))
  });
};

/**
 * @name dimensions
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} width
 * @param {Number} height
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.dimensions = function Transition_width(width, height) {
  return withFrame(this, {
    width : (isString(width) ? width : (width + 'px')),
    height : (isString(height) ? height : (height + 'px'))
  });
};

/**
 * @name top
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} position
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.top = function Transition_top(position) {
  return withFrame(this, {
    top : (isString(position) ? position : (position + 'px'))
  });
};

/**
 * @name left
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} position
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.left = function Transition_left(position) {
  return withFrame(this, {
    left : (isString(position) ? position : (position + 'px'))
  });
};

/**
 * @name position
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} left
 * @param {Number} top
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.position = function Transition_position(left, top) {
  return withFrame(this, {
    top : (isString(left) ? left : (left + 'px')),
    left : (isString(top) ? top : (top + 'px'))
  });
};

/**
 * @name opacity
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} opacity
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.opacity = function Transition_opacity(opacity) {
  return withFrame(this, {
    opacity : opacity
  });
};

/**
 * @name translateX
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} distance
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.translateX = function Transition_translateX(distance) {
  return withFrame(this, {
    transform : updateTransform(
      (isSomething(this.frame) ? this.frame['transform'] : null),
      'translateX',
      (isString(distance) ? distance : (distance + 'px'))
    )
  });
};

/**
 * @name translateY
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} distance
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.translateY = function Transition_translateY(distance) {
  return withFrame(this, {
    transform : updateTransform(
      (isSomething(this.frame) ? this.frame['transform'] : null),
      'translateY',
      (isString(distance) ? distance : (distance + 'px'))
    )
  });
};

/**
 * @name translateZ
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} distance
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.translateZ = function Transition_translateZ(distance) {
  return withFrame(this, {
    transform : updateTransform(
      (isSomething(this.frame) ? this.frame['transform'] : null),
      'translateZ',
      (isString(distance) ? distance : (distance + 'px'))
    )
  });
};

/**
 * @name rotate
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} degrees
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.rotate = function Transition_translateZ(degrees) {
  return withFrame(this, {
    transform : updateTransform(
      (isSomething(this.frame) ? this.frame['transform'] : null),
      'rotate',
      (isString(degrees) ? degrees : (degrees + 'deg'))
    )
  });
};

/**
 * @name scale
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Number} scale
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.scale = function Transition_scale(scale) {
  return withFrame(this, {
    transform : updateTransform(
      (isSomething(this.frame) ? this.frame['transform'] : null),
      'scale',
      scale
    )
  });
};

/**
 * @name addClass
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {String} name Name of class to add
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.addClass = function Transition_addClass(name) {

  const newFrame = validatedTransition(this.frame);
  newFrame.to.class.add = addToList(newFrame.to.class.add, name);

  return withDefaultRun(
    this.element,
    newFrame,
    this.direction
  );
};

/**
 * @name removeClass
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {String} name Name of class to remove
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.removeClass = function Transition_removeClass(name) {

  const newFrame = validatedTransition(this.frame);
  newFrame.to.class.add = removeFromList(newFrame.to.class.add, name);

  return withDefaultRun(
    this.element,
    newFrame,
    this.direction
  );
};

/**
 * @name reverse
 * @method
 * @memberof Frampton.Motion.Transition#
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.reverse = function Transition_reverse() {
  return withDefaultRun(
    this.element,
    this.frame,
    inverseDirection(this.direction)
  );
};

/**
 * @name chain
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Frampton.Motion.Transition} child Transition to run after this transition.
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.chain = function Transition_chain(child) {

  const trans = new Transition();
  const saved = this.run.bind(this);

  trans.name = Transition.CHAINED;
  trans.list = addToList(this.list, child);

  trans.run = function chain_run(resolve, next) {
    saved(() => {
      child.run(resolve, next);
    }, child);
  };

  trans.reverse = function chain_reverse() {
    return sequence.apply(
      null,
      reverse(trans.list).map((next) => {
        return next.reverse();
      })
    );
  };

  return trans;
};

/**
 *
 * {
 *   from : {
 *     class : {
 *       add : [],
 *       remove : []
 *     },
 *     style : {}
 *   },
 *   to : {
 *     class : {
 *       add : [],
 *       remove : []
 *     },
 *     style : {}
 *   }
 * }
 *
 * @name describe
 * @method
 * @memberof Frampton.Motion
 * @param {Object}  element DomNode to transition
 * @param {Object}  frame   Hash of CSS properties to add to element
 * @param {Boolean} dir     Director to perform true is transition-in (add classes/props) false is transition-out (remove classes/props)
 * @returns {Frampton.Motion.Transition}
 */
function describe(element, transition, dir) {
  const direction = ((dir === false) ? DIRECTION.DIR_OUT : DIRECTION.DIR_IN);
  return withDefaultRun( element, transition, direction );
}

export {
  Transition,
  describe as describe
};
