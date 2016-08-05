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
define('frampton-motion', ['frampton/namespace', 'frampton-motion/transition', 'frampton-motion/sequence', 'frampton-motion/when'], function (_namespace, _transition, _sequence, _when) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _sequence2 = _interopRequireDefault(_sequence);

  var _when2 = _interopRequireDefault(_when);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name Motion
   * @namespace
   * @memberof Frampton
   */
  _namespace2.default.Motion = {};
  _namespace2.default.Motion.VERSION = '0.1.0';
  _namespace2.default.Motion.describe = _transition.describe;
  _namespace2.default.Motion.sequence = _sequence2.default;
  _namespace2.default.Motion.when = _when2.default;
});
define('frampton-motion/data/constants', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var DIRECTION = exports.DIRECTION = { DIR_IN: 'transition-in',
    DIR_OUT: 'transition-out'
  };

  var STATE = exports.STATE = { WAITING: 'waiting',
    STARTED: 'started',
    RUNNING: 'running',
    DONE: 'done',
    CLEANUP: 'cleanup'
  };

  var TYPE = exports.TYPE = { NORMAL: 'normal',
    CHAINED: 'chained',
    WHEN: 'when'
  };
});
define('frampton-motion/data/easing', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
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
define("frampton-motion/data/empty_class", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = empty_class;
  function empty_class() {
    return {
      add: [],
      remove: []
    };
  }
});
define('frampton-motion/data/empty_description', ['exports', 'frampton-motion/data/empty_transition'], function (exports, _empty_transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = empty_description;

  var _empty_transition2 = _interopRequireDefault(_empty_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function empty_description() {
    return {
      from: (0, _empty_transition2.default)(),
      to: (0, _empty_transition2.default)()
    };
  }
});
define('frampton-motion/data/empty_transition', ['exports', 'frampton-motion/data/empty_class'], function (exports, _empty_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = empty_transition;

  var _empty_class2 = _interopRequireDefault(_empty_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function empty_transition() {
    return {
      style: {},
      class: (0, _empty_class2.default)()
    };
  }
});
define('frampton-motion/data/end_events', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
  };
});
define('frampton-motion/data/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['matrix', 'matrix3d', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'skew', 'skewX', 'skewY', 'perspective'];
});
define('frampton-motion/data/transitions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];
});
define("frampton-motion/sequence", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = sequence_transitions;
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
  function sequence_transitions() {
    for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
      transitions[_key] = arguments[_key];
    }

    return transitions.reduce(function (acc, next) {
      return acc.chain(next);
    });
  }
});
define('frampton-motion/transition', ['exports', 'frampton-utils/is_something', 'frampton-utils/is_string', 'frampton-utils/guid', 'frampton-utils/not_implemented', 'frampton-list/add', 'frampton-list/remove', 'frampton-list/reverse', 'frampton-record/merge', 'frampton-motion/sequence', 'frampton-motion/utils/set_state', 'frampton-motion/utils/inverse_direction', 'frampton-motion/utils/default_run', 'frampton-motion/utils/transition_props', 'frampton-motion/utils/parsed_props', 'frampton-motion/utils/parsed_timing', 'frampton-motion/utils/update_transform', 'frampton-motion/utils/validated_transition', 'frampton-motion/data/constants'], function (exports, _is_something, _is_string, _guid, _not_implemented, _add, _remove, _reverse, _merge, _sequence, _set_state, _inverse_direction, _default_run, _transition_props, _parsed_props, _parsed_timing, _update_transform, _validated_transition, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.describe = exports.Transition = undefined;

  var _is_something2 = _interopRequireDefault(_is_something);

  var _is_string2 = _interopRequireDefault(_is_string);

  var _guid2 = _interopRequireDefault(_guid);

  var _not_implemented2 = _interopRequireDefault(_not_implemented);

  var _add2 = _interopRequireDefault(_add);

  var _remove2 = _interopRequireDefault(_remove);

  var _reverse2 = _interopRequireDefault(_reverse);

  var _merge2 = _interopRequireDefault(_merge);

  var _sequence2 = _interopRequireDefault(_sequence);

  var _set_state2 = _interopRequireDefault(_set_state);

  var _inverse_direction2 = _interopRequireDefault(_inverse_direction);

  var _default_run2 = _interopRequireDefault(_default_run);

  var _transition_props2 = _interopRequireDefault(_transition_props);

  var _parsed_props2 = _interopRequireDefault(_parsed_props);

  var _parsed_timing2 = _interopRequireDefault(_parsed_timing);

  var _update_transform2 = _interopRequireDefault(_update_transform);

  var _validated_transition2 = _interopRequireDefault(_validated_transition);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function withDefaultRun(element, frame, dir) {
    var trans = new Transition(element, frame, dir);
    trans.run = _default_run2.default;
    return trans;
  }

  function withFrame(transition, props) {

    // Makes a copy of the frame
    var frame = (0, _validated_transition2.default)(transition.frame);

    // Add new props to the copy
    for (var key in props) {
      frame.to.style[key] = props[key];
    }

    return withDefaultRun(transition.element, frame, transition.direction);
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

    this.id = (0, _guid2.default)();
    this.list = [this];
    this.name = _constants.TYPE.NORMAL;
    this.element = (0, _is_something2.default)(element) ? element : null;
    this.direction = (0, _is_something2.default)(dir) ? dir : _constants.DIRECTION.DIR_IN;
    this.frame = (0, _validated_transition2.default)(frame);
    this.state = _constants.STATE.WAITING;
    this.supported = (0, _parsed_props2.default)(this.frame.to.style);
    this.config = (0, _merge2.default)((0, _parsed_timing2.default)(this.frame.to.style), (0, _transition_props2.default)(this.supported));

    (0, _set_state2.default)(this, this.state);
  }

  /**
   * Start the transition. Optionally provide a callback for when transition is complete.
   *
   * @name run
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {Function} resolve Function to call when transition is complete.
   */
  Transition.prototype.run = _not_implemented2.default;

  /**
   * @name delay
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {Number} time Miliseconds to delay transition
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.delay = function Transition_delay(time) {
    return withFrame(this, {
      'transition-delay': (0, _is_string2.default)(time) ? time : time + 'ms'
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
      'transition-duration': (0, _is_string2.default)(time) ? time : time + 'ms'
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
      width: (0, _is_string2.default)(width) ? width : width + 'px'
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
      height: (0, _is_string2.default)(height) ? height : height + 'px'
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
      width: (0, _is_string2.default)(width) ? width : width + 'px',
      height: (0, _is_string2.default)(height) ? height : height + 'px'
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
      top: (0, _is_string2.default)(position) ? position : position + 'px'
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
      left: (0, _is_string2.default)(position) ? position : position + 'px'
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
      top: (0, _is_string2.default)(left) ? left : left + 'px',
      left: (0, _is_string2.default)(top) ? top : top + 'px'
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
      opacity: opacity
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
      transform: (0, _update_transform2.default)((0, _is_something2.default)(this.frame) ? this.frame['transform'] : null, 'translateX', (0, _is_string2.default)(distance) ? distance : distance + 'px')
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
      transform: (0, _update_transform2.default)((0, _is_something2.default)(this.frame) ? this.frame['transform'] : null, 'translateY', (0, _is_string2.default)(distance) ? distance : distance + 'px')
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
      transform: (0, _update_transform2.default)((0, _is_something2.default)(this.frame) ? this.frame['transform'] : null, 'translateZ', (0, _is_string2.default)(distance) ? distance : distance + 'px')
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
      transform: (0, _update_transform2.default)((0, _is_something2.default)(this.frame) ? this.frame['transform'] : null, 'rotate', (0, _is_string2.default)(degrees) ? degrees : degrees + 'deg')
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
      transform: (0, _update_transform2.default)((0, _is_something2.default)(this.frame) ? this.frame['transform'] : null, 'scale', scale)
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

    var newFrame = (0, _validated_transition2.default)(this.frame);
    newFrame.to.class.add = (0, _add2.default)(newFrame.to.class.add, name);

    return withDefaultRun(this.element, newFrame, this.direction);
  };

  /**
   * @name removeClass
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {String} name Name of class to remove
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.removeClass = function Transition_removeClass(name) {

    var newFrame = (0, _validated_transition2.default)(this.frame);
    newFrame.to.class.add = (0, _remove2.default)(newFrame.to.class.add, name);

    return withDefaultRun(this.element, newFrame, this.direction);
  };

  /**
   * @name reverse
   * @method
   * @memberof Frampton.Motion.Transition#
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.reverse = function Transition_reverse() {
    return withDefaultRun(this.element, this.frame, (0, _inverse_direction2.default)(this.direction));
  };

  /**
   * @name chain
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {Frampton.Motion.Transition} child Transition to run after this transition.
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.chain = function Transition_chain(child) {

    var trans = new Transition();
    var saved = this.run.bind(this);

    trans.name = Transition.CHAINED;
    trans.list = (0, _add2.default)(this.list, child);

    trans.run = function chain_run(resolve, next) {
      saved(function () {
        child.run(resolve, next);
      }, child);
    };

    trans.reverse = function chain_reverse() {
      return _sequence2.default.apply(null, (0, _reverse2.default)(trans.list).map(function (next) {
        return next.reverse();
      }));
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
    var direction = dir === false ? _constants.DIRECTION.DIR_OUT : _constants.DIRECTION.DIR_IN;
    return withDefaultRun(element, transition, direction);
  }

  exports.Transition = Transition;
  exports.describe = describe;
});
define('frampton-motion/utils/add_classes', ['exports', 'frampton-utils/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _curry2 = _interopRequireDefault(_curry);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _curry2.default)(function add_classes(element, classes) {
    var len = classes.length;
    for (var i = 0; i < len; i++) {
      element.classList.add(classes[i]);
    }
  });
});
define('frampton-motion/utils/animation_end', ['exports', 'frampton-style/supported', 'frampton-motion/data/end_events'], function (exports, _supported, _end_events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _supported2 = _interopRequireDefault(_supported);

  var _end_events2 = _interopRequireDefault(_end_events);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _end_events2.default[(0, _supported2.default)('animation')] || null;
});
define('frampton-motion/utils/apply_classes', ['exports', 'frampton-motion/utils/add_classes', 'frampton-motion/utils/remove_classes', 'frampton-motion/data/constants'], function (exports, _add_classes, _remove_classes, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = apply_classes;

  var _add_classes2 = _interopRequireDefault(_add_classes);

  var _remove_classes2 = _interopRequireDefault(_remove_classes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function apply_classes(element, classes, dir) {
    // When transitioning out, do the reverse
    if (dir === _constants.DIRECTION.DIR_OUT) {
      (0, _remove_classes2.default)(element, classes.add);
      (0, _add_classes2.default)(element, classes.remove);
    } else {
      (0, _remove_classes2.default)(element, classes.remove);
      (0, _add_classes2.default)(element, classes.add);
    }
  }
});
define('frampton-motion/utils/default_run', ['exports', 'frampton-utils/immediate', 'frampton-utils/noop', 'frampton-style/apply_styles', 'frampton-motion/utils/set_direction', 'frampton-motion/utils/reflow', 'frampton-motion/utils/once', 'frampton-motion/utils/find_child', 'frampton-motion/utils/resolve_styles', 'frampton-motion/utils/set_state', 'frampton-motion/utils/end_once', 'frampton-motion/utils/prepare', 'frampton-motion/utils/apply_classes', 'frampton-motion/data/constants'], function (exports, _immediate, _noop, _apply_styles, _set_direction, _reflow, _once, _find_child, _resolve_styles, _set_state, _end_once, _prepare, _apply_classes, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = default_run;

  var _immediate2 = _interopRequireDefault(_immediate);

  var _noop2 = _interopRequireDefault(_noop);

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _set_direction2 = _interopRequireDefault(_set_direction);

  var _reflow2 = _interopRequireDefault(_reflow);

  var _once2 = _interopRequireDefault(_once);

  var _find_child2 = _interopRequireDefault(_find_child);

  var _resolve_styles2 = _interopRequireDefault(_resolve_styles);

  var _set_state2 = _interopRequireDefault(_set_state);

  var _end_once2 = _interopRequireDefault(_end_once);

  var _prepare2 = _interopRequireDefault(_prepare);

  var _apply_classes2 = _interopRequireDefault(_apply_classes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name defaultRun
   * @private
   * @method
   * @memberof Frampton.Motion.Transition
   * @param {Function} resolve
   * @param {Frampton.Motion.Transition#}
   */
  function default_run(resolve, child) {
    var _this = this;

    var complete = (0, _once2.default)(function () {
      (0, _set_state2.default)(_this, _constants.STATE.CLEANUP);
      (0, _reflow2.default)(_this.element);
      (0, _set_state2.default)(_this, _constants.STATE.DONE);
      (0, _immediate2.default)(function () {
        (resolve || _noop2.default)(_this.element);
      });
    });

    /**
     * Force a reflow of our element to make sure everything is prestine for us
     * to start fuckin' things up. Without doing this, some browsers will not have
     * the correct current state of our element in which to start the transition
     * from.
     */
    (0, _prepare2.default)(this.element, this.frame.from);

    this.element.setAttribute('data-transition-id', this.id);

    (0, _end_once2.default)(this, complete);

    (0, _set_direction2.default)(this, this.direction);

    (0, _immediate2.default)(function () {
      (0, _apply_classes2.default)(_this.element, _this.frame.to.class, _this.direction);
      if (_this.direction === _constants.DIRECTION.DIR_IN) {
        (0, _apply_styles2.default)(_this.element, _this.config);
        (0, _reflow2.default)(_this.element);
        (0, _apply_styles2.default)(_this.element, _this.supported);
      } else {
        (0, _apply_styles2.default)(_this.element, _this.config);
        (0, _reflow2.default)(_this.element);
        (0, _resolve_styles2.default)(_this.element, _this.supported, (0, _find_child2.default)(child, _this.element));
      }
    });

    (0, _set_state2.default)(this, _constants.STATE.RUNNING);
  }
});
define('frampton-motion/utils/end_once', ['exports', 'frampton-events/on_event', 'frampton-motion/utils/transition_end'], function (exports, _on_event, _transition_end) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = end_once;

  var _on_event2 = _interopRequireDefault(_on_event);

  var _transition_end2 = _interopRequireDefault(_transition_end);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function end_once(transition, fn) {
    (0, _on_event2.default)(_transition_end2.default, transition.element).filter(function (evt) {
      var testId = evt.target.getAttribute('data-transition-id').trim();
      return testId === transition.id;
    }).take(1).next(fn);
  }
});
define('frampton-motion/utils/find_child', ['exports', 'frampton-motion/data/constants'], function (exports, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = find_child;


  /**
   *
   */
  function find_child(child, element) {
    if (child && child.element) {
      return child;
    } else if (child) {
      if (child.name === _constants.TYPE.WHEN) {
        var len = child.list.length;
        for (var i = 0; i < len; i++) {
          if (child.list[i].element === element) {
            return child.list[i];
          }
        }
      } else if (child.name === _constants.TYPE.CHAINED) {
        if (child.list[0].element === element) {
          return child.list[0];
        }
      }
    }
    return null;
  }
});
define('frampton-motion/utils/inverse_direction', ['exports', 'frampton-motion/data/constants'], function (exports, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = inverse_direction;
  function inverse_direction(dir) {
    return dir === _constants.DIRECTION.DIR_IN ? _constants.DIRECTION.DIR_OUT : _constants.DIRECTION.DIR_IN;
  }
});
define('frampton-motion/utils/is_valid_direction', ['exports', 'frampton-motion/data/constants', 'frampton-motion/utils/is_value_of'], function (exports, _constants, _is_value_of) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_value_of2 = _interopRequireDefault(_is_value_of);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_value_of2.default)(_constants.DIRECTION);
});
define('frampton-motion/utils/is_valid_state', ['exports', 'frampton-motion/data/constants', 'frampton-motion/utils/is_value_of'], function (exports, _constants, _is_value_of) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _is_value_of2 = _interopRequireDefault(_is_value_of);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _is_value_of2.default)(_constants.STATE);
});
define('frampton-motion/utils/is_value_of', ['exports', 'frampton-motion/utils/object_values'], function (exports, _object_values) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = is_value_of;

  var _object_values2 = _interopRequireDefault(_object_values);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name isValueOf
   * @memberof Frampton.Motion.Utils
   * @private
   * @param {Object} obj Object to test value against
   * @returns {Function} Function that tests values
   */
  function is_value_of(obj) {

    var values = (0, _object_values2.default)(obj);

    return function (val) {
      return values.indexOf(val) !== -1;
    };
  }
});
define('frampton-motion/utils/next_end', ['exports', 'frampton-utils/noop', 'frampton-events/once', 'frampton-motion/utils/transition_end'], function (exports, _noop, _once, _transition_end) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = next_end;

  var _noop2 = _interopRequireDefault(_noop);

  var _once2 = _interopRequireDefault(_once);

  var _transition_end2 = _interopRequireDefault(_transition_end);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Call the given function the next time the element recieves a transitionend
   *
   * @name nextEnd
   * @method
   * @private
   * @memberof Frampton.Motion
   * @param {Object} element
   * @param {Function} fn
   */
  function next_end(element, fn) {
    (0, _once2.default)(_transition_end2.default, element).next(function (evt) {
      (fn || _noop2.default)(evt);
    });
  }
});
define('frampton-motion/utils/normalized_frame', ['exports', 'frampton-utils/is_number', 'frampton-list/contains', 'frampton-motion/data/easing'], function (exports, _is_number, _contains, _easing) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = normalized_frame;

  var _is_number2 = _interopRequireDefault(_is_number);

  var _contains2 = _interopRequireDefault(_contains);

  var _easing2 = _interopRequireDefault(_easing);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var alias_mapping = {
    'duration': 'transition-duration',
    'delay': 'transition-delay'
  };

  //+ durations :: String -> Boolean
  var durations = (0, _contains2.default)(['transition-duration', 'transition-delay']);

  //+ pixels :: String -> Boolean
  var pixels = (0, _contains2.default)(['height', 'width', 'left', 'top', 'right', 'bottom']);

  function normalized_frame(frame) {
    var obj = {};
    for (var key in frame || {}) {

      // Handle aliased props
      if (alias_mapping[key]) {
        if ((0, _is_number2.default)(frame[key])) {
          obj[alias_mapping[key]] = frame[key] + 'ms';
        } else {
          obj[alias_mapping[key]] = frame[key];
        }

        // Handle props that default to pixels
      } else if (pixels(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'px';

        // Handle durations default to miliseconds
      } else if (durations(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'ms';

        // Handle aliased timing functions
      } else if (key === 'transition-timing-function') {
        obj[key] = _easing2.default[frame[key]] ? _easing2.default[frame[key]] : frame[key];

        // Otherwise do a direct copy
      } else {
        obj[key] = frame[key];
      }
    }
    return obj;
  }
});
define('frampton-motion/utils/not_empty', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = not_emtpy;
  function not_emtpy(str) {
    return str.trim() !== '';
  }
});
define("frampton-motion/utils/object_values", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = object_values;
  var hasOwnProp = Object.prototype.hasOwnProperty;

  /**
   * @name objectValues
   * @method
   * @memberof Frampton.Motion.Utils
   * @param {Object} obj Object whose values to get
   * @returns {String[]}
   */
  function object_values(obj) {
    var result = [];
    for (var key in obj) {
      if (hasOwnProp.call(obj, key)) {
        result.push(obj[key]);
      }
    }
    return result;
  }
});
define("frampton-motion/utils/once", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = once;
  function once(fn) {
    var triggered = false;
    return function () {
      if (!triggered) {
        triggered = true;
        return fn.apply(undefined, arguments);
      }
    };
  }
});
define('frampton-motion/utils/parsed_props', ['exports', 'frampton-record/reduce', 'frampton-list/contains', 'frampton-style/supported', 'frampton-motion/data/transitions'], function (exports, _reduce, _contains, _supported, _transitions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parsed_props;

  var _reduce2 = _interopRequireDefault(_reduce);

  var _contains2 = _interopRequireDefault(_contains);

  var _supported2 = _interopRequireDefault(_supported);

  var _transitions2 = _interopRequireDefault(_transitions);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function parsed_props(props) {
    return (0, _reduce2.default)(function (acc, value, key) {
      if (!(0, _contains2.default)(_transitions2.default, key)) {
        acc[(0, _supported2.default)(key)] = value;
      }
      return acc;
    }, {}, props);
  }
});
define('frampton-motion/utils/parsed_timing', ['exports', 'frampton-style/supported'], function (exports, _supported) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = parsed_timing;

  var _supported2 = _interopRequireDefault(_supported);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function parsed_timing(props) {

    var timing = {};

    if (props['transition-delay']) {
      timing[(0, _supported2.default)('transition-delay')] = props['transition-delay'];
    }

    if (props['transition-duration']) {
      timing[(0, _supported2.default)('transition-duration')] = props['transition-duration'];
    }

    return timing;
  }
});
define('frampton-motion/utils/prepare', ['exports', 'frampton-style/apply_styles', 'frampton-motion/utils/reflow', 'frampton-motion/utils/apply_classes'], function (exports, _apply_styles, _reflow, _apply_classes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prepare;

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _reflow2 = _interopRequireDefault(_reflow);

  var _apply_classes2 = _interopRequireDefault(_apply_classes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
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
   * @name prepare
   * @param {Element} element
   * @param {Object} frame
   */
  function prepare(element, frame) {
    (0, _apply_classes2.default)(element, frame.class);
    (0, _apply_styles2.default)(element, frame.style);
    return (0, _reflow2.default)(element), true;
  }
});
define("frampton-motion/utils/reflow", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reflow;
  /**
   * Forces browser reflow by reading the offsetHeight of given element
   *
   * @name reflow
   * @method
   * @private
   * @memberof Frampton.Motion
   * @param {Object} element DomNode to reflow
   */
  function reflow(element) {
    return element.offsetWidth;
  }
});
define('frampton-motion/utils/remove_classes', ['exports', 'frampton-utils/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _curry2 = _interopRequireDefault(_curry);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _curry2.default)(function remove_classes(element, classes) {
    var len = classes.length;
    for (var i = 0; i < len; i++) {
      element.classList.remove(classes[i]);
    }
  });
});
define('frampton-motion/utils/reset_state', ['exports', 'frampton-motion/data/constants'], function (exports, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = reset_state;
  function reset_state(transition) {
    transition.element.classList.remove('transition-' + _constants.STATE.WAITING);
    transition.element.classList.remove('transition-' + _constants.STATE.STARTED);
    transition.element.classList.remove('transition-' + _constants.STATE.RUNNING);
    transition.element.classList.remove('transition-' + _constants.STATE.CLEANUP);
    transition.element.classList.remove('transition-' + _constants.STATE.DONE);
  }
});
define('frampton-motion/utils/resolve_styles', ['exports', 'frampton-style/set_style', 'frampton-style/remove_style', 'frampton-style/remove_styles', 'frampton-motion/data/constants'], function (exports, _set_style, _remove_style, _remove_styles, _constants) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = resolve_styles;

  var _set_style2 = _interopRequireDefault(_set_style);

  var _remove_style2 = _interopRequireDefault(_remove_style);

  var _remove_styles2 = _interopRequireDefault(_remove_styles);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * If a child of this transition manipulates the same element we need to prepare
   * for that. Usually we would just remove styles here, however, it the child
   * transition is moving in the out direction it needs the styles as a starting
   * point. That is the reverse of a transition has the end point of a forward
   * transition be the start point of reversed transition.
   *
   * @name resolveStyles
   * @function
   * @param {Element} element
   * @param {Object} frame
   * @param {Frampton.Motion.Transition}
   */
  function resolve_styles(element, frame, child) {
    if (child && child.direction === _constants.DIRECTION.DIR_OUT && child.element === element) {
      for (var key in frame) {
        // The child is modifying this style
        if (child.frame.to.style[key]) {
          (0, _set_style2.default)(element, key, child.frame.to.style[key]);

          // The child is not modifying this style... remove
        } else {
          (0, _remove_style2.default)(element, key);
        }
      }

      // No matching child we are safe to remove styles
    } else {
      (0, _remove_styles2.default)(element, frame);
    }
  }
});
define('frampton-motion/utils/set_direction', ['exports', 'frampton-motion/utils/inverse_direction', 'frampton-motion/utils/is_valid_direction'], function (exports, _inverse_direction, _is_valid_direction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = set_direction;

  var _inverse_direction2 = _interopRequireDefault(_inverse_direction);

  var _is_valid_direction2 = _interopRequireDefault(_is_valid_direction);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name setDirection
   * @memberof Frampton.Motion.Utils
   * @param {Frampton.Motion.Transition#} transition
   * @param {String} dir
   */
  function set_direction(transition, dir) {
    if ((0, _is_valid_direction2.default)(dir)) {
      if (transition.element) {
        transition.element.classList.remove((0, _inverse_direction2.default)(dir));
        transition.element.classList.add(dir);
      }
      transition.direction = dir;
    } else {
      throw new Error('Transition received an invalid directino: ' + dir);
    }
  }
});
define('frampton-motion/utils/set_state', ['exports', 'frampton-motion/utils/reset_state', 'frampton-motion/utils/is_valid_state'], function (exports, _reset_state, _is_valid_state) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = set_state;

  var _reset_state2 = _interopRequireDefault(_reset_state);

  var _is_valid_state2 = _interopRequireDefault(_is_valid_state);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name setState
   * @memberof Frampton.Motion.Utils
   * @private
   * @param {Frampton.Motion.Transition} transition
   * @param {String} state
   */
  function set_state(transition, state) {
    if ((0, _is_valid_state2.default)(state)) {
      if (transition.element) {
        (0, _reset_state2.default)(transition);
        transition.element.classList.add('transition-' + state);
        transition.element.setAttribute('data-transition-state', state);
      }
      transition.state = state;
    } else {
      throw new Error('Transition received an invalid state: ' + state);
    }
  }
});
define('frampton-motion/utils/transform_object', ['exports', 'frampton-motion/data/transforms'], function (exports, _transforms) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transform_object;

  var _transforms2 = _interopRequireDefault(_transforms);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Give a string representing a CSS transform it returns an object representation
   * of the transform.
   *
   * EXAMPLE:
   *
   * transformObject('rotate(80deg) translate(100px, 50px) scale(0.5)');
   *
   * returns:
   * {
   *   rotate : '80deg',
   *   translate : '100px, 50px',
   *   scale : '0.5'
   * }
   *
   * @name transformObject
   * @method
   * @private
   * @memberof Frampton.Motion.Utils
   * @param {String} transform
   * @returns {Object}
   */
  function transform_object(transform) {
    var obj = {};
    var len = _transforms2.default.length;
    for (var i = 0; i < len; i++) {
      var prop = _transforms2.default[i];
      var cap = new RegExp(prop + "\\(([^)]+)\\)");
      var matches = cap.exec(transform);
      if (matches && matches.length) {
        obj[prop] = matches[0].replace(prop + '(', '').replace(')', '');
      }
    }
    return obj;
  }
});
define('frampton-motion/utils/transition_end', ['exports', 'frampton-style/supported', 'frampton-motion/data/end_events'], function (exports, _supported, _end_events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _supported2 = _interopRequireDefault(_supported);

  var _end_events2 = _interopRequireDefault(_end_events);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _end_events2.default[(0, _supported2.default)('transition')] || null;
});
define('frampton-motion/utils/transition_props', ['exports', 'frampton-style/supported'], function (exports, _supported) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = transition_props;

  var _supported2 = _interopRequireDefault(_supported);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * Returns an object of properties to animate in this transition
   *
   * {
   *    height : 0px,
   *    opacity : 0
   * }
   *
   * {
   *    transition-property : 'height, opacity'
   * }
   *
   * @name transitionProps
   * @method
   * @private
   * @memberof Frampton.Motion.Utils
   * @param {Object} props
   * @returns {Object}
   */
  function transition_props(props) {
    var trans = {};
    trans[(0, _supported2.default)('transition-property')] = Object.keys(props).join(', ');
    return trans;
  }
});
define('frampton-motion/utils/update_transform', ['exports', 'frampton-utils/is_string', 'frampton-string/contains'], function (exports, _is_string, _contains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = updateTransform;

  var _is_string2 = _interopRequireDefault(_is_string);

  var _contains2 = _interopRequireDefault(_contains);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function propValue(prop, value) {
    return prop + '(' + value + ')';
  }

  /**
   * Updates the value of a transform in a CSS string.
   *
   * updateTransform('rotate(90deg) scale(0.5)', 'scale', '0.8');
   * // -> 'rotate(90deg) scale(0.8)'
   *
   * // Delete a prop from the transform
   * updateTransform('rotate(90deg) scale(0.5)', 'scale', null);
   * // -> 'rotate(90deg)'
   *
   * @name updateTransform
   * @method
   * @private
   * @memberof Frampton.Motion
   * @param {String} transform
   * @param {String} prop
   * @param {String|Number} value
   * @returns {String}
   */
  function updateTransform(transform, prop, value) {

    transform = ((0, _is_string2.default)(transform) ? transform : '').trim();

    // Updating an existing prop
    if ((0, _contains2.default)(prop, transform)) {
      var reg = new RegExp(prop + "\\([^)]*\\)");
      if ((0, _is_string2.default)(value) && value.trim() !== '') {
        transform = transform.replace(reg, propValue(prop, value));
      } else {
        transform = transform.replace(reg, '').replace('  ', ' ');
      }

      // Adding a new prop
    } else {
      if (transform.length > 0) {
        transform = transform + ' ';
      }
      transform = transform + propValue(prop, value);
    }

    return transform.trim();
  }
});
define('frampton-motion/utils/validated_class', ['exports', 'frampton-utils/is_array', 'frampton-utils/is_string', 'frampton-utils/is_object', 'frampton-motion/utils/not_empty', 'frampton-motion/data/empty_class'], function (exports, _is_array, _is_string, _is_object, _not_empty, _empty_class) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validated_class;

  var _is_array2 = _interopRequireDefault(_is_array);

  var _is_string2 = _interopRequireDefault(_is_string);

  var _is_object2 = _interopRequireDefault(_is_object);

  var _not_empty2 = _interopRequireDefault(_not_empty);

  var _empty_class2 = _interopRequireDefault(_empty_class);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name validatedClass
   * @memberof Frampton.Motion.Utils
   * @private
   * @param {String|Object} toValidate
   * @returns {Object}
   */
  function validated_class(toValidate) {

    if ((0, _is_string2.default)(toValidate)) {

      return {
        add: toValidate.split(' ').filter(_not_empty2.default),
        remove: []
      };
    } else if ((0, _is_object2.default)(toValidate)) {

      var newClass = (0, _empty_class2.default)();

      if ((0, _is_array2.default)(toValidate.add)) {
        for (var i = 0; i < toValidate.add.length; i++) {
          newClass.add.push(toValidate.add[i]);
        }
      }

      if ((0, _is_array2.default)(toValidate.remove)) {
        for (var _i = 0; _i < toValidate.remove.length; _i++) {
          newClass.remove.push(toValidate.remove[_i]);
        }
      }

      return newClass;
    } else {
      return (0, _empty_class2.default)();
    }
  }
});
define('frampton-motion/utils/validated_transition', ['exports', 'frampton-utils/is_nothing', 'frampton-utils/is_string', 'frampton-motion/utils/normalized_frame', 'frampton-motion/utils/validated_class', 'frampton-motion/data/empty_description'], function (exports, _is_nothing, _is_string, _normalized_frame, _validated_class, _empty_description) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = validated_transition;

  var _is_nothing2 = _interopRequireDefault(_is_nothing);

  var _is_string2 = _interopRequireDefault(_is_string);

  var _normalized_frame2 = _interopRequireDefault(_normalized_frame);

  var _validated_class2 = _interopRequireDefault(_validated_class);

  var _empty_description2 = _interopRequireDefault(_empty_description);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @name validatedTransition
   * @memberof Frampton.Motion.Utils
   * @private
   * @param {String|Object} desc A description of the transition
   * @returns {Object} An object representing a transition.
   */
  function validated_transition(desc) {

    var newTransition = (0, _empty_description2.default)();

    if ((0, _is_nothing2.default)(desc)) {

      return newTransition;
    } else if ((0, _is_string2.default)(desc)) {

      newTransition.to.class = (0, _validated_class2.default)(desc);
      return newTransition;
    } else {

      if (desc.from || desc.to || desc.style || desc.class) {
        if (desc.from && (desc.from.style || desc.from.class)) {
          newTransition.from.class = (0, _validated_class2.default)(desc.from.class);
          newTransition.from.style = (0, _normalized_frame2.default)(desc.from.style);
        } else {
          newTransition.from.style = (0, _normalized_frame2.default)(desc.from);
        }

        if (desc.to && (desc.to.style || desc.to.class)) {
          newTransition.to.class = (0, _validated_class2.default)(desc.to.class);
          newTransition.to.style = (0, _normalized_frame2.default)(desc.to.style);
        } else {
          newTransition.to.style = (0, _normalized_frame2.default)(desc.to);
        }

        if (desc.class) {
          newTransition.to.class = (0, _validated_class2.default)(desc.class);
        }

        if (desc.style) {
          newTransition.to.style = (0, _normalized_frame2.default)(desc.style);
        }
      } else {
        newTransition.to.style = (0, _normalized_frame2.default)(desc);
      }

      return newTransition;
    }
  }
});
define('frampton-motion/when', ['exports', 'frampton-utils/noop', 'frampton-motion/transition'], function (exports, _noop, _transition) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = when;

  var _noop2 = _interopRequireDefault(_noop);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * when :: [Transition] -> Transition
   *
   * Takes one or more Transitions and returns a new Transition that represents
   * all of the given Transitions running in parallel. The new Transition completes
   * once all of its child Transitions have completed.
   *
   * @name when
   * @method
   * @memberof Frampton.Motion
   * @param {...Frampton.Motion.Transition} transitions One or more transitions to run
   * @returns {Frampton.Motion.Transition} A new Transition that runs the given tranisitions
   in parallel
   */
  function when() {
    for (var _len = arguments.length, transitions = Array(_len), _key = 0; _key < _len; _key++) {
      transitions[_key] = arguments[_key];
    }

    var transition = new _transition.Transition();
    transition.name = _transition.Transition.WHEN;
    transition.list = transitions;

    transition.reverse = function when_reverse() {
      return when.apply(null, transitions.map(function (trans) {
        return trans.reverse();
      }));
    };

    transition.run = function when_run(resolve, child) {

      var count = 0;
      var len = transitions.length;

      function handleComplete() {
        count += 1;
        if (count === len) {
          (resolve || _noop2.default)();
        }
      }

      for (var i = 0; i < len; i++) {
        transitions[i].run(handleComplete, child);
      }
    };

    return transition;
  }
});
require("frampton-motion");
})();
