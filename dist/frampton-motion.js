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
define('frampton-motion', ['frampton/namespace', 'frampton-motion/prepare', 'frampton-motion/transition', 'frampton-motion/sequence', 'frampton-motion/when', 'frampton-motion/reflow'], function (_namespace, _prepare, _transition, _sequence, _when, _reflow) {
  'use strict';

  var _namespace2 = _interopRequireDefault(_namespace);

  var _prepare2 = _interopRequireDefault(_prepare);

  var _sequence2 = _interopRequireDefault(_sequence);

  var _when2 = _interopRequireDefault(_when);

  var _reflow2 = _interopRequireDefault(_reflow);

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
  _namespace2.default.Motion.VERSION = '0.0.10';
  _namespace2.default.Motion.prepare = _prepare2.default;
  _namespace2.default.Motion.describe = _transition.describe;
  _namespace2.default.Motion.sequence = _sequence2.default;
  _namespace2.default.Motion.reflow = _reflow2.default;
  _namespace2.default.Motion.when = _when2.default;
});
define('frampton-motion/animation_end', ['exports', 'frampton-style/supported'], function (exports, _supported) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _supported2 = _interopRequireDefault(_supported);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var eventMap = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'animationend',
    'animation': 'animationend'
  };

  function animationEnd() {
    return eventMap[(0, _supported2.default)('animation')] || null;
  }

  exports.default = animationEnd();
});
define('frampton-motion/easing', ['exports'], function (exports) {
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
define('frampton-motion/next_end', ['exports', 'frampton-utils/noop', 'frampton-events/once', 'frampton-motion/transition_end'], function (exports, _noop, _once, _transition_end) {
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
define('frampton-motion/normalized_frame', ['exports', 'frampton-utils/is_number', 'frampton-list/contains', 'frampton-motion/easing'], function (exports, _is_number, _contains, _easing) {
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

  var durations = (0, _contains2.default)(['transition-duration', 'transition-delay']);

  var pixels = (0, _contains2.default)(['height', 'width', 'left', 'top', 'right', 'bottom']);

  function normalized_frame(frame) {
    var obj = {};
    for (var key in frame) {
      if (alias_mapping[key]) {
        if ((0, _is_number2.default)(frame[key])) {
          obj[alias_mapping[key]] = frame[key] + 'ms';
        } else {
          obj[alias_mapping[key]] = frame[key];
        }
      } else if (pixels(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'px';
      } else if (durations(key) && (0, _is_number2.default)(frame[key])) {
        obj[key] = frame[key] + 'ms';
      } else if (key === 'transition-timing-function') {
        obj[key] = _easing2.default[frame[key]] ? _easing2.default[frame[key]] : frame[key];
      } else {
        obj[key] = frame[key];
      }
    }
    return obj;
  }
});
define('frampton-motion/parsed_props', ['exports', 'frampton-record/reduce', 'frampton-list/contains', 'frampton-style/supported', 'frampton-motion/transitions'], function (exports, _reduce, _contains, _supported, _transitions) {
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
define('frampton-motion/parsed_timing', ['exports', 'frampton-style/supported'], function (exports, _supported) {
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
define('frampton-motion/prepare', ['exports', 'frampton-utils/is_object', 'frampton-style/add_class', 'frampton-style/apply_styles', 'frampton-motion/normalized_frame', 'frampton-motion/reflow'], function (exports, _is_object, _add_class, _apply_styles, _normalized_frame, _reflow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = prepare;

  var _is_object2 = _interopRequireDefault(_is_object);

  var _add_class2 = _interopRequireDefault(_add_class);

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _normalized_frame2 = _interopRequireDefault(_normalized_frame);

  var _reflow2 = _interopRequireDefault(_reflow);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function prepare(element, classes, props) {
    if ((0, _is_object2.default)(classes)) {
      (0, _apply_styles2.default)(element, (0, _normalized_frame2.default)(classes));
    } else {
      classes.split(' ').forEach((0, _add_class2.default)(element));
      (0, _apply_styles2.default)(element, (0, _normalized_frame2.default)(props));
    }
    return (0, _reflow2.default)(element), true;
  }
});
define("frampton-motion/reflow", ["exports"], function (exports) {
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
define('frampton-motion/transform_object', ['exports', 'frampton-motion/transforms'], function (exports, _transforms) {
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
   * @memberof Frampton.Motion
   * @param {String} transform
   * @returns {Object}
   */
  function transform_object(transform) {
    var obj = {};
    for (var i = 0; i < _transforms2.default.length; i++) {
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
define('frampton-motion/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['matrix', 'matrix3d', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'skew', 'skewX', 'skewY', 'perspective'];
});
define('frampton-motion/transition', ['exports', 'frampton-utils/assert', 'frampton-utils/immediate', 'frampton-utils/not', 'frampton-utils/is_empty', 'frampton-utils/is_something', 'frampton-utils/is_string', 'frampton-utils/is_object', 'frampton-utils/guid', 'frampton-utils/noop', 'frampton-utils/not_implemented', 'frampton-list/add', 'frampton-list/copy', 'frampton-list/remove', 'frampton-list/reverse', 'frampton-record/merge', 'frampton-style/set_style', 'frampton-style/apply_styles', 'frampton-style/remove_style', 'frampton-style/remove_styles', 'frampton-style/add_class', 'frampton-style/remove_class', 'frampton-events/on_event', 'frampton-motion/sequence', 'frampton-motion/transition_end', 'frampton-motion/reflow', 'frampton-motion/transition_props', 'frampton-motion/parsed_props', 'frampton-motion/parsed_timing', 'frampton-motion/update_transform', 'frampton-motion/normalized_frame'], function (exports, _assert, _immediate, _not, _is_empty, _is_something, _is_string, _is_object, _guid, _noop, _not_implemented, _add, _copy, _remove, _reverse, _merge, _set_style, _apply_styles, _remove_style, _remove_styles, _add_class, _remove_class, _on_event, _sequence, _transition_end, _reflow, _transition_props, _parsed_props, _parsed_timing, _update_transform, _normalized_frame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.describe = exports.Transition = undefined;

  var _assert2 = _interopRequireDefault(_assert);

  var _immediate2 = _interopRequireDefault(_immediate);

  var _not2 = _interopRequireDefault(_not);

  var _is_empty2 = _interopRequireDefault(_is_empty);

  var _is_something2 = _interopRequireDefault(_is_something);

  var _is_string2 = _interopRequireDefault(_is_string);

  var _is_object2 = _interopRequireDefault(_is_object);

  var _guid2 = _interopRequireDefault(_guid);

  var _noop2 = _interopRequireDefault(_noop);

  var _not_implemented2 = _interopRequireDefault(_not_implemented);

  var _add2 = _interopRequireDefault(_add);

  var _copy2 = _interopRequireDefault(_copy);

  var _remove2 = _interopRequireDefault(_remove);

  var _reverse2 = _interopRequireDefault(_reverse);

  var _merge2 = _interopRequireDefault(_merge);

  var _set_style2 = _interopRequireDefault(_set_style);

  var _apply_styles2 = _interopRequireDefault(_apply_styles);

  var _remove_style2 = _interopRequireDefault(_remove_style);

  var _remove_styles2 = _interopRequireDefault(_remove_styles);

  var _add_class2 = _interopRequireDefault(_add_class);

  var _remove_class2 = _interopRequireDefault(_remove_class);

  var _on_event2 = _interopRequireDefault(_on_event);

  var _sequence2 = _interopRequireDefault(_sequence);

  var _transition_end2 = _interopRequireDefault(_transition_end);

  var _reflow2 = _interopRequireDefault(_reflow);

  var _transition_props2 = _interopRequireDefault(_transition_props);

  var _parsed_props2 = _interopRequireDefault(_parsed_props);

  var _parsed_timing2 = _interopRequireDefault(_parsed_timing);

  var _update_transform2 = _interopRequireDefault(_update_transform);

  var _normalized_frame2 = _interopRequireDefault(_normalized_frame);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function inverseDirection(dir) {
    return dir === Transition.DIR_IN ? Transition.DIR_OUT : Transition.DIR_IN;
  }

  function resetState(transition) {
    transition.element.classList.remove('transition-' + Transition.WAITING);
    transition.element.classList.remove('transition-' + Transition.STARTED);
    transition.element.classList.remove('transition-' + Transition.RUNNING);
    transition.element.classList.remove('transition-' + Transition.CLEANUP);
    transition.element.classList.remove('transition-' + Transition.DONE);
  }

  function setState(transition, state) {
    if (transition.element) {
      resetState(transition);
      transition.element.classList.add('transition-' + state);
      transition.element.setAttribute('data-transition-state', state);
    }
    transition.state = state;
  }

  function setDirection(transition, dir) {
    if (transition.element) {
      transition.element.classList.remove(inverseDirection(dir));
      transition.element.classList.add(dir);
    }
    transition.direction = dir;
  }

  function once(fn) {
    var triggered = false;
    return function () {
      if (!triggered) {
        triggered = true;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fn.apply(null, args);
      }
    };
  }

  function endOnce(transition, fn) {
    (0, _on_event2.default)(_transition_end2.default, transition.element).filter(function (evt) {
      return evt.target.getAttribute('data-transition-id') === transition.id;
    }).take(1).next(fn);
  }

  function defaultRun(resolve, child) {
    var _this = this;

    var complete = once(function () {
      setState(_this, Transition.CLEANUP);
      (0, _reflow2.default)(_this.element);
      setState(_this, Transition.DONE);
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
    (0, _reflow2.default)(this.element);

    this.element.setAttribute('data-transition-id', this.id);

    endOnce(this, complete);

    setDirection(this, this.direction);

    (0, _immediate2.default)(function () {
      if (_this.direction === Transition.DIR_IN) {
        _this.classList.forEach((0, _add_class2.default)(_this.element));
        if ((0, _is_something2.default)(_this.frame)) {
          (0, _apply_styles2.default)(_this.element, _this.config);
          (0, _reflow2.default)(_this.element);
          (0, _apply_styles2.default)(_this.element, _this.supported);
        }
      } else {
        _this.classList.forEach((0, _remove_class2.default)(_this.element));
        if ((0, _is_something2.default)(_this.frame)) {
          (0, _apply_styles2.default)(_this.element, _this.config);
          (0, _reflow2.default)(_this.element);
          resolveStyles(_this.element, _this.supported, findChild(child, _this.element));
        }
      }
    });

    setState(this, Transition.RUNNING);
  }

  function findChild(child, element) {
    if (child && child.element) {
      return child;
    } else if (child) {
      if (child.name === Transition.WHEN) {
        for (var i = 0; i < child.list.length; i++) {
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
    if (child && child.direction === Transition.DIR_OUT && child.element === element) {
      for (var key in frame) {
        if (child.frame && child.frame[key]) {
          (0, _set_style2.default)(element, key, child.frame[key]);
        } else {
          (0, _remove_style2.default)(element, key);
        }
      }
    } else {
      (0, _remove_styles2.default)(element, frame);
    }
  }

  function withDefaultRun(element, list, frame, dir) {
    var trans = new Transition(element, list, frame, dir);
    trans.run = defaultRun;
    return trans;
  }

  function withFrame(transition, props) {

    var frame = (0, _is_something2.default)(transition.frame) ? transition.frame : {};

    for (var key in props) {
      frame[key] = props[key];
    }

    return withDefaultRun(transition.element, (0, _copy2.default)(transition.classList), frame, transition.direction);
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

    (0, _assert2.default)('Browser does not support CSS transitions', (0, _is_something2.default)(_transition_end2.default));

    this.id = (0, _guid2.default)();
    this.name = Transition.NORMAL;
    this.element = (0, _is_something2.default)(element) ? element : null;
    this.direction = (0, _is_something2.default)(dir) ? dir : Transition.DIR_IN;
    this.frame = (0, _is_something2.default)(frame) ? (0, _normalized_frame2.default)(frame) : null;
    this.config = null;
    this.supported = null;
    this.classList = ((0, _is_something2.default)(list) ? list : []).filter((0, _not2.default)(_is_empty2.default));
    this.state = Transition.WAITING;
    this.list = [this];

    if ((0, _is_object2.default)(this.frame)) {
      this.supported = (0, _parsed_props2.default)(this.frame);
      this.config = (0, _merge2.default)((0, _parsed_timing2.default)(this.frame), (0, _transition_props2.default)(this.supported));
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
    return withDefaultRun(this.element, (0, _add2.default)(this.classList, name), (0, _is_something2.default)(this.frame) ? this.frame : null, this.direction);
  };

  /**
   * @name removeClass
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {String} name Name of class to remove
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.removeClass = function Transition_removeClass(name) {
    return withDefaultRun(this.element, (0, _remove2.default)(this.classList, name), (0, _is_something2.default)(this.frame) ? this.frame : null, this.direction);
  };

  /**
   * @name reverse
   * @method
   * @memberof Frampton.Motion.Transition#
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.reverse = function Transition_reverse() {
    return withDefaultRun(this.element, (0, _copy2.default)(this.classList), (0, _is_something2.default)(this.frame) ? this.frame : null, inverseDirection(this.direction));
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

  Transition.WAITING = 'waiting';
  Transition.STARTED = 'started';
  Transition.RUNNING = 'running';
  Transition.DONE = 'done';
  Transition.CLEANUP = 'cleanup';
  Transition.DIR_IN = 'transition-in';
  Transition.DIR_OUT = 'transition-out';
  Transition.NORMAL = 'normal';
  Transition.CHAINED = 'chained';
  Transition.WHEN = 'when';

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

    if ((0, _is_object2.default)(name)) {
      dir = frame;
      frame = name;
      name = null;
    }

    return withDefaultRun(element, (0, _is_string2.default)(name) ? name.split(' ') : null, (0, _is_object2.default)(frame) ? frame : null, dir === false ? Transition.DIR_OUT : Transition.DIR_IN);
  }

  exports.Transition = Transition;
  exports.describe = describe;
});
define('frampton-motion/transition_end', ['exports', 'frampton-style/supported'], function (exports, _supported) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _supported2 = _interopRequireDefault(_supported);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var eventMap = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
  };

  function transitionEnd() {
    return eventMap[(0, _supported2.default)('transition')] || null;
  }

  exports.default = transitionEnd();
});
define('frampton-motion/transition_props', ['exports', 'frampton-style/supported'], function (exports, _supported) {
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
   * Returns an objec
   * @name transitionProps
   * @method
   * @private
   * @memberof Frampton.Motion
   * @param {Object} props
   * @returns {Object}
   */
  function transition_props(props) {
    var trans = {};
    trans[(0, _supported2.default)('transition-property')] = Object.keys(props).join(', ');
    return trans;
  }
});
define('frampton-motion/transitions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ['transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function'];
});
define('frampton-motion/update_transform', ['exports', 'frampton-utils/is_string', 'frampton-string/contains'], function (exports, _is_string, _contains) {
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

    if ((0, _contains2.default)(prop, transform)) {
      var reg = new RegExp(prop + "\\([^)]*\\)");
      if ((0, _is_string2.default)(value) && value.trim() !== '') {
        transform = transform.replace(reg, propValue(prop, value));
      } else {
        transform = transform.replace(reg, '').replace('  ', ' ');
      }
    } else {
      if (transform.length > 0) {
        transform = transform + ' ';
      }
      transform = transform + propValue(prop, value);
    }

    return transform.trim();
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
        if (count === len - 1) {
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
