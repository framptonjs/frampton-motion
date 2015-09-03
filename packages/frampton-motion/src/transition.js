import assert from 'frampton-utils/assert';
import immediate from 'frampton-utils/immediate';
import not from 'frampton-utils/not';
import isEmpty from 'frampton-utils/is_empty';
import isSomething from 'frampton-utils/is_something';
import isString from 'frampton-utils/is_string';
import isObject from 'frampton-utils/is_object';
import guid from 'frampton-utils/guid';
import noop from 'frampton-utils/noop';
import notImplemented from 'frampton-utils/not_implemented';
import add from 'frampton-list/add';
import copyList from 'frampton-list/copy';
import remove from 'frampton-list/remove';
import reverse from 'frampton-list/reverse';
import merge from 'frampton-object/merge';
import setStyle from 'frampton-style/set_style';
import applyStyles from 'frampton-style/apply_styles';
import removeStyle from 'frampton-style/remove_style';
import removeStyles from 'frampton-style/remove_styles';
import addClass from 'frampton-style/add_class';
import removeClass from 'frampton-style/remove_class';
import { addListener } from 'frampton-events/event_dispatcher';
import sequence from 'frampton-motion/sequence';
import transitionend from 'frampton-motion/transition_end';
import reflow from 'frampton-motion/reflow';
import setState from 'frampton-motion/set_state';
import parsedTransitions from 'frampton-motion/parsed_transitions';
import parsedProps from 'frampton-motion/parsed_props';
import parsedTiming from 'frampton-motion/parsed_timing';
import updateTransform from 'frampton-motion/update_transform';
import normalizedFrame from 'frampton-motion/normalized_frame';

function inverseDirection(dir) {
  return ((dir === Transition.DIR_IN) ? Transition.DIR_OUT : Transition.DIR_IN);
}

function setDirection(transition, dir) {
  if (transition.element) {
    transition.element.classList.remove(inverseDirection(dir));
    transition.element.classList.add(dir);
  }
  transition.direction = dir;
}

function defaultRun(resolve, child) {

  /**
   * Force a reflow of our element to make sure everything is prestine for us
   * to start fuckin' things up. Without doing this, some browsers will not have
   * the correct current state of our element in which to start the transition
   * from.
   */
  reflow(this.element);

  this.element.setAttribute('data-transition-id', this.id);

  var unsub = addListener(transitionend, (evt) => {
    if (parseInt(evt.target.getAttribute('data-transition-id')) === this.id) {
      unsub();
      setState(this, Transition.CLEANUP);
      reflow(this.element);
      setState(this, Transition.DONE);
      immediate(() => {
        (resolve || noop)(this.element);
      });
    }
  }, this.element);

  setDirection(this, this.direction);

  if (this.direction === Transition.DIR_IN) {
    this.classList.forEach(addClass(this.element));
    if (isSomething(this.frame)) {
      applyStyles(this.element, this.config);
      reflow(this.element);
      applyStyles(this.element, this.supported);
    }
  } else {
    this.classList.forEach(removeClass(this.element));
    if (isSomething(this.frame)) {
      applyStyles(this.element, this.config);
      reflow(this.element);
      resolveStyles(
        this.element,
        this.supported,
        (isSomething(child) ? child : null)
      );
    }
  }

  setState(this, Transition.RUNNING);
}

function findChild(child, element) {
  if (child && child.element) {
    return child;
  } else if (child) {
    if (child.name === Transition.WHEN) {
      for (let i=0;i<child.list.length;i++) {
        if (child.list[i].element === element) {
          return child.list[i];
        }
      }
    } else if (child.name === Transition.CHAINED) {
      if (child.list[0].element === element) {
        return child.list[0];
      }
    }
  }
  return null;
}

function resolveStyles(element, frame, child) {
  child = findChild(child, element);
  if (child && child.direction === Transition.DIR_OUT && child.element === element) {
    for (let key in frame) {
      if (child.frame && child.frame[key]) {
        setStyle(element, key, child.frame[key]);
      } else {
        removeStyle(element, key);
      }
    }
  } else {
    removeStyles(element, frame);
  }
}

function withDefaultRun(element, list, frame, dir) {
  var trans = new Transition(element, list, frame, dir);
  trans.run = defaultRun;
  return trans;
}

function withFrame(transition, props) {

  var frame = (isSomething(transition.frame) ? transition.frame : {});

  for (let key in props) {
    frame[key] = props[key];
  }

  return withDefaultRun(
    transition.element,
    copyList(transition.classList),
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
 * @param {String} [list='']             Space-separated list of classes to add
 * @param {Object} [frame={}]            Hash of props to add to element
 * @param {String} [dir='transition-in'] Direction to run transition
 */
function Transition(element, list, frame, dir) {

  assert('Browser does not support CSS transitions', isSomething(transitionend));

  this.id        = guid();
  this.name      = Transition.NORMAL;
  this.element   = (isSomething(element) ? element : null);
  this.direction = (isSomething(dir) ? dir : Transition.DIR_IN);
  this.frame     = (isSomething(frame) ? normalizedFrame(frame) : null);
  this.config    = null;
  this.supported = null;
  this.classList = (isSomething(list) ? list : []).filter(not(isEmpty));
  this.state     = Transition.WAITING;
  this.list      = [this];
  this.timeout   = Transition.TIMEOUT;

  if (isObject(this.frame)) {
    this.supported = parsedProps(this.frame);
    this.config = merge(
      parsedTiming(this.frame),
      parsedTransitions(this.supported)
    );
  }

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
  return withDefaultRun(
    this.element,
    add(this.classList, name),
    (isSomething(this.frame) ? this.frame : null),
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
  return withDefaultRun(
    this.element,
    remove(this.classList, name),
    (isSomething(this.frame) ? this.frame : null),
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
    copyList(this.classList),
    (isSomething(this.frame) ? this.frame : null),
    inverseDirection(this.direction)
  );
};

/**
 * @name reverse
 * @method
 * @memberof Frampton.Motion.Transition#
 * @param {Frampton.Motion.Transition} child Transition to run after this transition.
 * @returns {Frampton.Motion.Transition}
 */
Transition.prototype.chain = function Transition_chain(child) {

  var trans = new Transition();
  var saved = this.run.bind(this);

  trans.name = Transition.CHAINED;
  trans.list = add(this.list, child);

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

Transition.WAITING = 'waiting';
Transition.STARTED = 'started';
Transition.RUNNING = 'running';
Transition.DONE    = 'done';
Transition.CLEANUP = 'cleanup';
Transition.DIR_IN  = 'transition-in';
Transition.DIR_OUT = 'transition-out';
Transition.NORMAL  = 'normal';
Transition.CHAINED = 'chained';
Transition.WHEN    = 'when';
Transition.TIMEOUT = 3000;

/**
 * @name describe
 * @method
 * @memberof Frampton.Motion
 * @param {Object}  element DomNode to transition
 * @param {String}  name    Class name to add for transition, separate multiple classes with spaces ('class1 class2')
 * @param {Object}  frame   Hash of CSS properties to add to element
 * @param {Boolean} dir     Director to perform true is transition-in (add classes/props) false is transition-out (remove classes/props)
 * @returns {Frampton.Motion.Transition}
 */
function describe(element, name, frame, dir) {

  if (isObject(name)) {
    dir = frame;
    frame = name;
    name = null;
  }

  return withDefaultRun(
    element,
    (isString(name) ? name.split(' ') : null),
    (isObject(frame) ? frame : null),
    ((dir === false) ? Transition.DIR_OUT : Transition.DIR_IN)
  );
}

export {
  Transition,
  describe as describe
};