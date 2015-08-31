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
import copyObj from 'frampton-object/copy';
import merge from 'frampton-object/merge';
import applyStyles from 'frampton-style/apply_styles';
import removeStyles from 'frampton-style/remove_styles';
import addClass from 'frampton-style/add_class';
import removeClass from 'frampton-style/remove_class';
import { addListener } from 'frampton-events/event_dispatcher';
import transitionend from 'frampton-motion/transition_end';
import reflow from 'frampton-motion/reflow';
import setState from 'frampton-motion/set_state';
import parsedTransitions from 'frampton-motion/parsed_transitions';
import parsedProps from 'frampton-motion/parsed_props';
import parsedTiming from 'frampton-motion/parsed_timing';
import updateTransform from 'frampton-motion/update_transform';

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

function defaultRun(resolve) {

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
      removeStyles(this.element, this.supported);
    }
  }

  setState(this, Transition.RUNNING);
}

function withDefaultRun(element, list, frame, dir) {
  var trans = new Transition(element, list, frame, dir);
  trans.run = defaultRun;
  return trans;
}

function withFrame(transition, props) {

  var frame = (isSomething(transition.frame) ? copyObj(transition.frame) : {});

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

function Transition(element, list, frame, dir) {

  assert('Browser does not support CSS transitions', isSomething(transitionend));

  this.id        = guid();
  this.element   = (isSomething(element) ? element : null);
  this.direction = (isSomething(dir) ? dir : Transition.DIR_IN);
  this.frame     = (isSomething(frame) ? frame : null);
  this.config    = null;
  this.supported = null;
  this.classList = (isSomething(list) ? list : []).filter(not(isEmpty));
  this.state     = Transition.WAITING;
  this.list      = [this];

  if (isObject(frame)) {
    this.frame = frame;
    this.supported = parsedProps(frame);
    this.config = merge(
      parsedTiming(frame),
      parsedTransitions(this.supported)
    );
  }

  setState(this, this.state);
}

/**
 * Start the transition. Optionally provide a callback for when transition is complete.
 *
 * @name run
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Function} resolve Function to call when transition is complete.
 */
Transition.prototype.run = notImplemented;

/**
 * @name delay
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} time Miliseconds to delay transition
 * @returns {Transition}
 */
Transition.prototype.delay = function Transition_delay(time) {
  return withFrame(this, {
    'transition-delay' : (isString(time) ? time : (time + 'ms'))
  });
};

/**
 * @name duration
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} time Miliseconds for transition to run
 * @returns {Transition}
 */
Transition.prototype.duration = function Transition_duration(time) {
  return withFrame(this, {
    'transition-duration' : (isString(time) ? time : (time + 'ms'))
  });
};

/**
 * @name width
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} width
 * @returns {Transition}
 */
Transition.prototype.width = function Transition_width(width) {
  return withFrame(this, {
    width : (isString(width) ? width : (width + 'px'))
  });
};

/**
 * @name height
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} height
 * @returns {Transition}
 */
Transition.prototype.height = function Transition_width(height) {
  return withFrame(this, {
    height : (isString(height) ? height : (height + 'px'))
  });
};

/**
 * @name dimensions
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} width
 * @param {Number} height
 * @returns {Transition}
 */
Transition.prototype.dimensions = function Transition_width(width, height) {
  return withFrame(this, {
    width : (isString(width) ? width : (width + 'px')),
    height : (isString(height) ? height : (height + 'px'))
  });
};

/**
 * @name top
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} position
 * @returns {Transition}
 */
Transition.prototype.top = function Transition_top(position) {
  return withFrame(this, {
    top : (isString(position) ? position : (position + 'px'))
  });
};

/**
 * @name left
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} position
 * @returns {Transition}
 */
Transition.prototype.left = function Transition_left(position) {
  return withFrame(this, {
    left : (isString(position) ? position : (position + 'px'))
  });
};

/**
 * @name position
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} left
 * @param {Number} top
 * @returns {Transition}
 */
Transition.prototype.position = function Transition_position(left, top) {
  return withFrame(this, {
    top : (isString(left) ? left : (left + 'px')),
    left : (isString(top) ? top : (top + 'px'))
  });
};

/**
 * @name opacity
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} opacity
 * @returns {Transition}
 */
Transition.prototype.opacity = function Transition_opacity(opacity) {
  return withFrame(this, {
    opacity : opacity
  });
};

/**
 * @name translateX
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} distance
 * @returns {Transition}
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
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} distance
 * @returns {Transition}
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
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} distance
 * @returns {Transition}
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
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} degrees
 * @returns {Transition}
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
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Number} scale
 * @returns {Transition}
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
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {String} name Name of class to add
 * @returns {Transition}
 */
Transition.prototype.addClass = function Transition_addClass(name) {
  return withDefaultRun(
    this.element,
    add(this.classList, name),
    (isSomething(this.frame) ? copyObj(this.frame) : null),
    this.direction
  );
};

/**
 * @name removeClass
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {String} name Name of class to remove
 * @returns {Transition}
 */
Transition.prototype.removeClass = function Transition_removeClass(name) {
  return withDefaultRun(
    this.element,
    remove(this.classList, name),
    (isSomething(this.frame) ? copyObj(this.frame) : null),
    this.direction
  );
};

/**
 * @name reverse
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @returns {Transition}
 */
Transition.prototype.reverse = function Transition_reverse() {
  return withDefaultRun(
    this.element,
    copyList(this.classList),
    (isSomething(this.frame) ? copyObj(this.frame) : null),
    inverseDirection(this.direction)
  );
};

/**
 * @name reverse
 * @memberOf Frampton.Motion.Transition
 * @instance
 * @param {Transition} transition Transition to run after this transition.
 * @returns {Transition}
 */
Transition.prototype.chain = function Transition_chain(transition) {

  var trans = new Transition();
  var saved = this.run.bind(this);

  trans.list = add(this.list, transition);

  trans.run = function chain_run(resolve) {
    saved(() => {
      transition.run(resolve);
    });
  };

  trans.reverse = function chain_reverse() {
    var list = reverse(trans.list);
    var len  = list.length;
    var i    = 1;
    var temp = list[0].reverse();
    for (;i<len;i++) {
      temp = temp.chain(list[i].reverse());
    }
    return temp;
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
    (isString(dir) ? dir : Transition.DIR_IN)
  );
}

export {
  Transition,
  describe as describe
};