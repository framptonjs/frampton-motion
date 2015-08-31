(function() {
/*globals Frampton:true */
var define, require;
var global = this;

(function() {

  if (typeof Frampton === 'undefined') {
    throw new Error('Frampton is undefined');
  };

  define = Frampton.__loader.define;
  require = Frampton.__loader.require;

}());
define('frampton-motion', ['exports', 'frampton/namespace', 'frampton-motion/transition', 'frampton-motion/sequence', 'frampton-motion/when'], function (exports, _framptonNamespace, _framptonMotionTransition, _framptonMotionSequence, _framptonMotionWhen) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Frampton = _interopRequireDefault(_framptonNamespace);

  var _sequence = _interopRequireDefault(_framptonMotionSequence);

  var _when = _interopRequireDefault(_framptonMotionWhen);

  _Frampton['default'].Motion = {};
  _Frampton['default'].Motion.transition = _framptonMotionTransition.transition;
  _Frampton['default'].Motion.sequence = _sequence['default'];
  _Frampton['default'].Motion.when = _when['default'];
});
define('frampton-motion/animation_end', ['exports', 'module', 'frampton-style/supported'], function (exports, module, _framptonStyleSupported) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  var eventMap = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'animationend',
    'animation': 'animationend'
  };

  function animationEnd() {
    return eventMap[_supported['default']('animation')] || null;
  }

  module.exports = animationEnd();
});
define('frampton-motion/easing', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = {
    'in': 'ease-in',
    'out': 'ease-out',
    'in-out': 'ease-in-out',
    'snap': 'cubic-bezier(0,1,.5,1)',
    'linear': 'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
    'ease-in-quad': 'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
    'ease-in-cubic': 'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
    'ease-in-quart': 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
    'ease-in-quint': 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
    'ease-in-sine': 'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
    'ease-in-expo': 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
    'ease-in-circ': 'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
    'ease-in-back': 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    'ease-out-quad': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    'ease-out-cubic': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    'ease-out-quart': 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
    'ease-out-quint': 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
    'ease-out-sine': 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
    'ease-out-expo': 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'ease-out-circ': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
    'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
    'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
    'ease-in-out-sine': 'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
    'ease-in-out-expo': 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
    'ease-in-out-circ': 'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
    'ease-in-out-back': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
  };
});
define('frampton-motion/next_end', ['exports', 'module', 'frampton-utils/noop', 'frampton-events/once', 'frampton-motion/transition_end'], function (exports, module, _framptonUtilsNoop, _framptonEventsOnce, _framptonMotionTransition_end) {
  'use strict';

  module.exports = next_end;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _noop = _interopRequireDefault(_framptonUtilsNoop);

  var _once = _interopRequireDefault(_framptonEventsOnce);

  var _transitionend = _interopRequireDefault(_framptonMotionTransition_end);

  function next_end(element, fn) {
    _once['default'](_transitionend['default'], element).next(function (evt) {
      (fn || _noop['default'])(evt);
    });
  }
});
define('frampton-motion/parsed_props', ['exports', 'module', 'frampton-object/reduce', 'frampton-list/contains', 'frampton-style/supported', 'frampton-motion/transition_props'], function (exports, module, _framptonObjectReduce, _framptonListContains, _framptonStyleSupported, _framptonMotionTransition_props) {
  'use strict';

  module.exports = parsed_props;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _reduceObj = _interopRequireDefault(_framptonObjectReduce);

  var _contains = _interopRequireDefault(_framptonListContains);

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  var _transitionProps = _interopRequireDefault(_framptonMotionTransition_props);

  function parsed_props(props) {
    return _reduceObj['default'](function (acc, value, key) {
      if (!_contains['default'](_transitionProps['default'], key)) {
        acc[_supported['default'](key)] = value;
      }
      return acc;
    }, {}, props);
  }
});
define('frampton-motion/parsed_timing', ['exports', 'module', 'frampton-style/supported'], function (exports, module, _framptonStyleSupported) {
  'use strict';

  module.exports = parsed_timing;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  function parsed_timing(props) {

    var timing = {};

    if (props['transition-delay'] || props['delay']) {
      timing[_supported['default']('transition-delay')] = props['transition-delay'] || props['delay'];
    }

    if (props['transition-duration'] || props['duration']) {
      timing[_supported['default']('transition-duration')] = props['transition-duration'] || props['duration'];
    }

    return timing;
  }
});
define('frampton-motion/parsed_transitions', ['exports', 'module', 'frampton-style/supported'], function (exports, module, _framptonStyleSupported) {
  'use strict';

  module.exports = parsed_transitions;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  function parsed_transitions(props) {
    var trans = {};
    trans[_supported['default']('transition-property')] = Object.keys(props).join(', ');
    return trans;
  }
});
define("frampton-motion/reflow", ["exports", "module"], function (exports, module) {
  // Reading the offsetWidth of an element will force the browser to do a reflow
  "use strict";

  module.exports = reflow;

  function reflow(element) {
    return element.offsetWidth;
  }
});
define("frampton-motion/sequence", ["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = sequence_transitions;

  function sequence_transitions() {
    for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
      transitions[_key] = arguments[_key];
    }

    return transitions.reduce(function (acc, next) {
      return acc.chain(next);
    });
  }
});
define('frampton-motion/set_state', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = set_state;

  function set_state(transition, state) {
    if (transition.element) {
      transition.element.classList.remove('transition-' + transition.state);
      transition.element.classList.add('transition-' + state);
      transition.element.setAttribute('data-transition-state', state);
    }
    transition.state = state;
  }
});
define('frampton-motion/transition', ['exports', 'frampton-utils/assert', 'frampton-utils/immediate', 'frampton-utils/is_something', 'frampton-utils/is_string', 'frampton-utils/is_object', 'frampton-utils/guid', 'frampton-utils/noop', 'frampton-utils/not_implemented', 'frampton-list/add', 'frampton-list/remove', 'frampton-list/reverse', 'frampton-object/copy', 'frampton-object/merge', 'frampton-style/apply_styles', 'frampton-style/remove_styles', 'frampton-style/add_class', 'frampton-style/remove_class', 'frampton-events/event_dispatcher', 'frampton-motion/transition_end', 'frampton-motion/reflow', 'frampton-motion/set_state', 'frampton-motion/parsed_transitions', 'frampton-motion/parsed_props', 'frampton-motion/parsed_timing', 'frampton-motion/update_transform'], function (exports, _framptonUtilsAssert, _framptonUtilsImmediate, _framptonUtilsIs_something, _framptonUtilsIs_string, _framptonUtilsIs_object, _framptonUtilsGuid, _framptonUtilsNoop, _framptonUtilsNot_implemented, _framptonListAdd, _framptonListRemove, _framptonListReverse, _framptonObjectCopy, _framptonObjectMerge, _framptonStyleApply_styles, _framptonStyleRemove_styles, _framptonStyleAdd_class, _framptonStyleRemove_class, _framptonEventsEvent_dispatcher, _framptonMotionTransition_end, _framptonMotionReflow, _framptonMotionSet_state, _framptonMotionParsed_transitions, _framptonMotionParsed_props, _framptonMotionParsed_timing, _framptonMotionUpdate_transform) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _assert = _interopRequireDefault(_framptonUtilsAssert);

  var _immediate = _interopRequireDefault(_framptonUtilsImmediate);

  var _isSomething = _interopRequireDefault(_framptonUtilsIs_something);

  var _isString = _interopRequireDefault(_framptonUtilsIs_string);

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  var _guid = _interopRequireDefault(_framptonUtilsGuid);

  var _noop = _interopRequireDefault(_framptonUtilsNoop);

  var _notImplemented = _interopRequireDefault(_framptonUtilsNot_implemented);

  var _add = _interopRequireDefault(_framptonListAdd);

  var _remove = _interopRequireDefault(_framptonListRemove);

  var _reverse = _interopRequireDefault(_framptonListReverse);

  var _copy = _interopRequireDefault(_framptonObjectCopy);

  var _merge = _interopRequireDefault(_framptonObjectMerge);

  var _applyStyles = _interopRequireDefault(_framptonStyleApply_styles);

  var _removeStyles = _interopRequireDefault(_framptonStyleRemove_styles);

  var _addClass = _interopRequireDefault(_framptonStyleAdd_class);

  var _removeClass = _interopRequireDefault(_framptonStyleRemove_class);

  var _transitionend = _interopRequireDefault(_framptonMotionTransition_end);

  var _reflow = _interopRequireDefault(_framptonMotionReflow);

  var _setState = _interopRequireDefault(_framptonMotionSet_state);

  var _parsedTransitions = _interopRequireDefault(_framptonMotionParsed_transitions);

  var _parsedProps = _interopRequireDefault(_framptonMotionParsed_props);

  var _parsedTiming = _interopRequireDefault(_framptonMotionParsed_timing);

  var _updateTransform = _interopRequireDefault(_framptonMotionUpdate_transform);

  function inverseDirection(dir) {
    return dir === Transition.DIR_IN ? Transition.DIR_OUT : Transition.DIR_IN;
  }

  function setDirection(transition, dir) {
    if (transition.element) {
      transition.element.classList.remove(inverseDirection(dir));
      transition.element.classList.add(dir);
    }
    transition.direction = dir;
  }

  function defaultRun(resolve) {
    var _this = this;

    this.element.setAttribute('data-transition-id', this.id);

    var unsub = _framptonEventsEvent_dispatcher.addListener(_transitionend['default'], function (evt) {
      if (parseInt(evt.target.getAttribute('data-transition-id')) === _this.id) {
        unsub();
        _setState['default'](_this, Transition.CLEANUP);
        _reflow['default'](_this.element);
        _setState['default'](_this, Transition.DONE);
        _immediate['default'](function () {
          (resolve || _noop['default'])(_this.element);
        });
      }
    }, this.element);

    setDirection(this, this.direction);

    if (_isSomething['default'](this.frame)) {
      _applyStyles['default'](this.element, this.config);
      _reflow['default'](this.element);
      if (this.direction === Transition.DIR_IN) {
        _applyStyles['default'](this.element, this.supported);
      } else {
        _removeStyles['default'](this.element, this.supported);
      }
    } else {
      _reflow['default'](this.element);
      if (this.direction === Transition.DIR_IN) {
        this.classList.forEach(_addClass['default'](this.element));
      } else {
        this.classList.forEach(_removeClass['default'](this.element));
      }
    }

    _setState['default'](this, Transition.RUNNING);
  }

  function withDefaultRun(element, frame, dir) {
    var trans = new Transition(element, frame, dir);
    trans.run = defaultRun;
    return trans;
  }

  function withFrame(transition, props) {

    var frame = _isSomething['default'](transition.frame) ? _copy['default'](transition.frame) : {};

    for (var key in props) {
      frame[key] = props[key];
    }

    return withDefaultRun(transition.element, frame, transition.direction);
  }

  function Transition(element, frame, dir) {

    _assert['default']('Browser does not support CSS transitions', _isSomething['default'](_transitionend['default']));

    this.id = _guid['default']();
    this.element = element || null;
    this.direction = dir || Transition.DIR_IN;
    this.frame = null;
    this.config = null;
    this.supported = null;
    this.outFrame = null;
    this.classList = [];
    this.state = Transition.WAITING;
    this.list = [this];

    if (_isObject['default'](frame)) {
      this.frame = frame;
      this.supported = _parsedProps['default'](frame);
      this.config = _merge['default'](_parsedTiming['default'](frame), _parsedTransitions['default'](this.supported));
    } else {
      this.classList = _isString['default'](frame) ? frame.trim().split(' ') : [];
    }

    _setState['default'](this, this.state);
  }

  /**
   * Start the transition. Optionally provide a callback for when transition is complete.
   *
   * @name run
   * @memberOf Frampton.Motion.Transition
   * @instance
   * @param {Function} resolve Function to call when transition is complete.
   */
  Transition.prototype.run = _notImplemented['default'];

  /**
   * @name delay
   * @memberOf Frampton.Motion.Transition
   * @instance
   * @param {Number} time Miliseconds to delay transition
   * @returns {Transition}
   */
  Transition.prototype.delay = function Transition_delay(time) {
    return withFrame(this, {
      'transition-delay': _isString['default'](time) ? time : time + 'ms'
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
      'transition-duration': _isString['default'](time) ? time : time + 'ms'
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
      width: _isString['default'](width) ? width : width + 'px'
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
      height: _isString['default'](height) ? height : height + 'px'
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
      width: _isString['default'](width) ? width : width + 'px',
      height: _isString['default'](height) ? height : height + 'px'
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
      top: _isString['default'](position) ? position : position + 'px'
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
      left: _isString['default'](position) ? position : position + 'px'
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
      top: _isString['default'](left) ? left : left + 'px',
      left: _isString['default'](top) ? top : top + 'px'
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
      opacity: opacity
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateX', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateY', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateZ', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'rotate', _isString['default'](degrees) ? degrees : degrees + 'deg')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'scale', scale)
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
    return withDefaultRun(this.element, _add['default'](this.classList, name), this.direction);
  };

  /**
   * @name removeClass
   * @memberOf Frampton.Motion.Transition
   * @instance
   * @param {String} name Name of class to remove
   * @returns {Transition}
   */
  Transition.prototype.removeClass = function Transition_removeClass(name) {
    return withDefaultRun(this.element, _remove['default'](this.classList, name), this.direction);
  };

  /**
   * @name reverse
   * @memberOf Frampton.Motion.Transition
   * @instance
   * @returns {Transition}
   */
  Transition.prototype.reverse = function Transition_reverse() {
    return withDefaultRun(this.element, _isSomething['default'](this.frame) ? _copy['default'](this.frame) : this.classList.join(' '), inverseDirection(this.direction));
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

    trans.list = _add['default'](this.list, transition);

    trans.run = function chain_run(resolve) {
      saved(function () {
        transition.run(resolve);
      });
    };

    trans.reverse = function chain_reverse() {
      var list = _reverse['default'](trans.list);
      var len = list.length;
      var i = 1;
      var temp = list[0].reverse();
      for (; i < len; i++) {
        temp = temp.chain(list[i].reverse());
      }
      return temp;
    };

    return trans;
  };

  Transition.WAITING = 'waiting';
  Transition.STARTED = 'started';
  Transition.RUNNING = 'running';
  Transition.DONE = 'done';
  Transition.CLEANUP = 'cleanup';
  Transition.DIR_IN = 'transition-in';
  Transition.DIR_OUT = 'transition-out';

  function transitionCreate(element, frame) {
    return withDefaultRun(element, frame);
  }

  exports.Transition = Transition;
  exports.transition = transitionCreate;
});
define('frampton-motion/transition_end', ['exports', 'module', 'frampton-style/supported'], function (exports, module, _framptonStyleSupported) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  var eventMap = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
  };

  function transitionEnd() {
    return eventMap[_supported['default']('transition')] || null;
  }

  module.exports = transitionEnd();
});
define('frampton-motion/transition_props', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];
});
define('frampton-motion/update_transform', ['exports', 'module', 'frampton-utils/is_string', 'frampton-string/contains'], function (exports, module, _framptonUtilsIs_string, _framptonStringContains) {
  'use strict';

  module.exports = updateTransform;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isString = _interopRequireDefault(_framptonUtilsIs_string);

  var _contains = _interopRequireDefault(_framptonStringContains);

  function propValue(prop, value) {
    return prop + '(' + value + ')';
  }

  function updateTransform(transform, prop, value) {
    var reg;
    transform = _isString['default'](transform) ? transform : '';
    if (_contains['default'](prop, transform)) {
      reg = new RegExp(prop + "\\([^)]*\\)");
      transform = transform.replace(reg, propValue(prop, value));
    } else {
      if (transform.length > 0) {
        transform = transform + ' ';
      }
      transform = transform + propValue(prop, value);
    }
    return transform;
  }
});
define('frampton-motion/when', ['exports', 'module', 'frampton-utils/noop', 'frampton-motion/transition'], function (exports, module, _framptonUtilsNoop, _framptonMotionTransition) {
  'use strict';

  module.exports = when;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _noop = _interopRequireDefault(_framptonUtilsNoop);

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

  function when() {
    for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
      transitions[_key] = arguments[_key];
    }

    var transition = new _framptonMotionTransition.Transition();

    transition.reverse = function when_reverse() {
      return when.apply(null, transitions.map(function (trans) {
        return trans.reverse();
      }));
    };

    transition.run = function when_run(resolve) {

      var len = transitions.length;
      var count = 0;

      transitions.forEach(function (trans) {
        trans.run(function () {
          count = count + 1;
          if (count === len) {
            (resolve || _noop['default'])();
          }
        });
      });
    };

    return transition;
  }
});
require("frampton-motion");

})();