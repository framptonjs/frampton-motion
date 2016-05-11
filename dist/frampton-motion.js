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
define('frampton-motion', ['exports', 'frampton/namespace', 'frampton-motion/prepare', 'frampton-motion/transition', 'frampton-motion/sequence', 'frampton-motion/when', 'frampton-motion/reflow'], function (exports, _framptonNamespace, _framptonMotionPrepare, _framptonMotionTransition, _framptonMotionSequence, _framptonMotionWhen, _framptonMotionReflow) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Frampton = _interopRequireDefault(_framptonNamespace);

  var _prepare = _interopRequireDefault(_framptonMotionPrepare);

  var _sequence = _interopRequireDefault(_framptonMotionSequence);

  var _when = _interopRequireDefault(_framptonMotionWhen);

  var _reflow = _interopRequireDefault(_framptonMotionReflow);

  /**
   * @name Motion
   * @namespace
   * @memberof Frampton
   */
  _Frampton['default'].Motion = {};
  _Frampton['default'].Motion.VERSION = '0.0.9';
  _Frampton['default'].Motion.prepare = _prepare['default'];
  _Frampton['default'].Motion.describe = _framptonMotionTransition.describe;
  _Frampton['default'].Motion.sequence = _sequence['default'];
  _Frampton['default'].Motion.reflow = _reflow['default'];
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
    _once['default'](_transitionend['default'], element).next(function (evt) {
      (fn || _noop['default'])(evt);
    });
  }
});
define('frampton-motion/normalized_frame', ['exports', 'module', 'frampton-utils/is_number', 'frampton-list/contains', 'frampton-motion/easing'], function (exports, module, _framptonUtilsIs_number, _framptonListContains, _framptonMotionEasing) {
  'use strict';

  module.exports = normalized_frame;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isNumber = _interopRequireDefault(_framptonUtilsIs_number);

  var _contains = _interopRequireDefault(_framptonListContains);

  var _easing = _interopRequireDefault(_framptonMotionEasing);

  var alias_mapping = {
    'duration': 'transition-duration',
    'delay': 'transition-delay'
  };

  var durations = _contains['default'](['transition-duration', 'transition-delay']);

  var pixels = _contains['default'](['height', 'width', 'left', 'top', 'right', 'bottom']);

  function normalized_frame(frame) {
    var obj = {};
    for (var key in frame) {
      if (alias_mapping[key]) {
        if (_isNumber['default'](frame[key])) {
          obj[alias_mapping[key]] = frame[key] + 'ms';
        } else {
          obj[alias_mapping[key]] = frame[key];
        }
      } else if (pixels(key) && _isNumber['default'](frame[key])) {
        obj[key] = frame[key] + 'px';
      } else if (durations(key) && _isNumber['default'](frame[key])) {
        obj[key] = frame[key] + 'ms';
      } else if (key === 'transition-timing-function') {
        obj[key] = _easing['default'][frame[key]] ? _easing['default'][frame[key]] : frame[key];
      } else {
        obj[key] = frame[key];
      }
    }
    return obj;
  }
});
define('frampton-motion/parsed_props', ['exports', 'module', 'frampton-record/reduce', 'frampton-list/contains', 'frampton-style/supported', 'frampton-motion/transitions'], function (exports, module, _framptonRecordReduce, _framptonListContains, _framptonStyleSupported, _framptonMotionTransitions) {
  'use strict';

  module.exports = parsed_props;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _reduceObj = _interopRequireDefault(_framptonRecordReduce);

  var _contains = _interopRequireDefault(_framptonListContains);

  var _supported = _interopRequireDefault(_framptonStyleSupported);

  var _transitions = _interopRequireDefault(_framptonMotionTransitions);

  function parsed_props(props) {
    return _reduceObj['default'](function (acc, value, key) {
      if (!_contains['default'](_transitions['default'], key)) {
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

    if (props['transition-delay']) {
      timing[_supported['default']('transition-delay')] = props['transition-delay'];
    }

    if (props['transition-duration']) {
      timing[_supported['default']('transition-duration')] = props['transition-duration'];
    }

    return timing;
  }
});
define('frampton-motion/prepare', ['exports', 'module', 'frampton-utils/is_object', 'frampton-style/add_class', 'frampton-style/apply_styles', 'frampton-motion/normalized_frame', 'frampton-motion/reflow'], function (exports, module, _framptonUtilsIs_object, _framptonStyleAdd_class, _framptonStyleApply_styles, _framptonMotionNormalized_frame, _framptonMotionReflow) {
  'use strict';

  module.exports = prepare;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  var _addClass = _interopRequireDefault(_framptonStyleAdd_class);

  var _applyStyles = _interopRequireDefault(_framptonStyleApply_styles);

  var _normalizedFrame = _interopRequireDefault(_framptonMotionNormalized_frame);

  var _reflow = _interopRequireDefault(_framptonMotionReflow);

  function prepare(element, classes, props) {
    if (_isObject['default'](classes)) {
      _applyStyles['default'](element, _normalizedFrame['default'](classes));
    } else {
      classes.split(' ').forEach(_addClass['default'](element));
      _applyStyles['default'](element, _normalizedFrame['default'](props));
    }
    return (_reflow['default'](element), true);
  }
});
define("frampton-motion/reflow", ["exports", "module"], function (exports, module) {
  /**
   * Forces browser reflow by reading the offsetHeight of given element
   *
   * @name reflow
   * @method
   * @private
   * @memberof Frampton.Motion
   * @param {Object} element DomNode to reflow
   */
  "use strict";

  module.exports = reflow;

  function reflow(element) {
    return element.offsetWidth;
  }
});
define("frampton-motion/sequence", ["exports", "module"], function (exports, module) {
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
define('frampton-motion/transform_object', ['exports', 'module', 'frampton-motion/transforms'], function (exports, module, _framptonMotionTransforms) {
  'use strict';

  module.exports = transform_object;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _transforms = _interopRequireDefault(_framptonMotionTransforms);

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
    for (var i = 0; i < _transforms['default'].length; i++) {
      var prop = _transforms['default'][i];
      var cap = new RegExp(prop + "\\(([^)]+)\\)");
      var matches = cap.exec(transform);
      if (matches && matches.length) {
        obj[prop] = matches[0].replace(prop + '(', '').replace(')', '');
      }
    }
    return obj;
  }
});
define('frampton-motion/transforms', ['exports', 'module'], function (exports, module) {
  'use strict';

  module.exports = ['matrix', 'matrix3d', 'translate', 'translate3d', 'translateX', 'translateY', 'translateZ', 'scale', 'scale3d', 'scaleX', 'scaleY', 'scaleZ', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'skew', 'skewX', 'skewY', 'perspective'];
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
define('frampton-motion/transition_props', ['exports', 'module', 'frampton-style/supported'], function (exports, module, _framptonStyleSupported) {
  'use strict';

  module.exports = transition_props;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _supported = _interopRequireDefault(_framptonStyleSupported);

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
    trans[_supported['default']('transition-property')] = Object.keys(props).join(', ');
    return trans;
  }
});
define('frampton-motion/transition', ['exports', 'frampton-utils/assert', 'frampton-utils/immediate', 'frampton-utils/not', 'frampton-utils/is_empty', 'frampton-utils/is_something', 'frampton-utils/is_string', 'frampton-utils/is_object', 'frampton-utils/guid', 'frampton-utils/noop', 'frampton-utils/not_implemented', 'frampton-list/add', 'frampton-list/copy', 'frampton-list/remove', 'frampton-list/reverse', 'frampton-record/merge', 'frampton-style/set_style', 'frampton-style/apply_styles', 'frampton-style/remove_style', 'frampton-style/remove_styles', 'frampton-style/add_class', 'frampton-style/remove_class', 'frampton-events/on_event', 'frampton-motion/sequence', 'frampton-motion/transition_end', 'frampton-motion/reflow', 'frampton-motion/transition_props', 'frampton-motion/parsed_props', 'frampton-motion/parsed_timing', 'frampton-motion/update_transform', 'frampton-motion/normalized_frame'], function (exports, _framptonUtilsAssert, _framptonUtilsImmediate, _framptonUtilsNot, _framptonUtilsIs_empty, _framptonUtilsIs_something, _framptonUtilsIs_string, _framptonUtilsIs_object, _framptonUtilsGuid, _framptonUtilsNoop, _framptonUtilsNot_implemented, _framptonListAdd, _framptonListCopy, _framptonListRemove, _framptonListReverse, _framptonRecordMerge, _framptonStyleSet_style, _framptonStyleApply_styles, _framptonStyleRemove_style, _framptonStyleRemove_styles, _framptonStyleAdd_class, _framptonStyleRemove_class, _framptonEventsOn_event, _framptonMotionSequence, _framptonMotionTransition_end, _framptonMotionReflow, _framptonMotionTransition_props, _framptonMotionParsed_props, _framptonMotionParsed_timing, _framptonMotionUpdate_transform, _framptonMotionNormalized_frame) {
  'use strict';

  exports.__esModule = true;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _assert = _interopRequireDefault(_framptonUtilsAssert);

  var _immediate = _interopRequireDefault(_framptonUtilsImmediate);

  var _not = _interopRequireDefault(_framptonUtilsNot);

  var _isEmpty = _interopRequireDefault(_framptonUtilsIs_empty);

  var _isSomething = _interopRequireDefault(_framptonUtilsIs_something);

  var _isString = _interopRequireDefault(_framptonUtilsIs_string);

  var _isObject = _interopRequireDefault(_framptonUtilsIs_object);

  var _guid = _interopRequireDefault(_framptonUtilsGuid);

  var _noop = _interopRequireDefault(_framptonUtilsNoop);

  var _notImplemented = _interopRequireDefault(_framptonUtilsNot_implemented);

  var _add = _interopRequireDefault(_framptonListAdd);

  var _copyList = _interopRequireDefault(_framptonListCopy);

  var _remove = _interopRequireDefault(_framptonListRemove);

  var _reverse = _interopRequireDefault(_framptonListReverse);

  var _merge = _interopRequireDefault(_framptonRecordMerge);

  var _setStyle = _interopRequireDefault(_framptonStyleSet_style);

  var _applyStyles = _interopRequireDefault(_framptonStyleApply_styles);

  var _removeStyle = _interopRequireDefault(_framptonStyleRemove_style);

  var _removeStyles = _interopRequireDefault(_framptonStyleRemove_styles);

  var _addClass = _interopRequireDefault(_framptonStyleAdd_class);

  var _removeClass = _interopRequireDefault(_framptonStyleRemove_class);

  var _onEvent = _interopRequireDefault(_framptonEventsOn_event);

  var _sequence = _interopRequireDefault(_framptonMotionSequence);

  var _transitionend = _interopRequireDefault(_framptonMotionTransition_end);

  var _reflow = _interopRequireDefault(_framptonMotionReflow);

  var _transitionProps = _interopRequireDefault(_framptonMotionTransition_props);

  var _parsedProps = _interopRequireDefault(_framptonMotionParsed_props);

  var _parsedTiming = _interopRequireDefault(_framptonMotionParsed_timing);

  var _updateTransform = _interopRequireDefault(_framptonMotionUpdate_transform);

  var _normalizedFrame = _interopRequireDefault(_framptonMotionNormalized_frame);

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
    _onEvent['default'](_transitionend['default'], transition.element).filter(function (evt) {
      return parseInt(evt.target.getAttribute('data-transition-id')) === transition.id;
    }).take(1).next(fn);
  }

  function defaultRun(resolve, child) {
    var _this = this;

    var complete = once(function () {
      setState(_this, Transition.CLEANUP);
      _reflow['default'](_this.element);
      setState(_this, Transition.DONE);
      _immediate['default'](function () {
        (resolve || _noop['default'])(_this.element);
      });
    });

    /**
     * Force a reflow of our element to make sure everything is prestine for us
     * to start fuckin' things up. Without doing this, some browsers will not have
     * the correct current state of our element in which to start the transition
     * from.
     */
    _reflow['default'](this.element);

    this.element.setAttribute('data-transition-id', this.id);

    endOnce(this, complete);

    setDirection(this, this.direction);

    _immediate['default'](function () {
      if (_this.direction === Transition.DIR_IN) {
        _this.classList.forEach(_addClass['default'](_this.element));
        if (_isSomething['default'](_this.frame)) {
          _applyStyles['default'](_this.element, _this.config);
          _reflow['default'](_this.element);
          _applyStyles['default'](_this.element, _this.supported);
        }
      } else {
        _this.classList.forEach(_removeClass['default'](_this.element));
        if (_isSomething['default'](_this.frame)) {
          _applyStyles['default'](_this.element, _this.config);
          _reflow['default'](_this.element);
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
          _setStyle['default'](element, key, child.frame[key]);
        } else {
          _removeStyle['default'](element, key);
        }
      }
    } else {
      _removeStyles['default'](element, frame);
    }
  }

  function withDefaultRun(element, list, frame, dir) {
    var trans = new Transition(element, list, frame, dir);
    trans.run = defaultRun;
    return trans;
  }

  function withFrame(transition, props) {

    var frame = _isSomething['default'](transition.frame) ? transition.frame : {};

    for (var key in props) {
      frame[key] = props[key];
    }

    return withDefaultRun(transition.element, _copyList['default'](transition.classList), frame, transition.direction);
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

    _assert['default']('Browser does not support CSS transitions', _isSomething['default'](_transitionend['default']));

    this.id = _guid['default']();
    this.name = Transition.NORMAL;
    this.element = _isSomething['default'](element) ? element : null;
    this.direction = _isSomething['default'](dir) ? dir : Transition.DIR_IN;
    this.frame = _isSomething['default'](frame) ? _normalizedFrame['default'](frame) : null;
    this.config = null;
    this.supported = null;
    this.classList = (_isSomething['default'](list) ? list : []).filter(_not['default'](_isEmpty['default']));
    this.state = Transition.WAITING;
    this.list = [this];

    if (_isObject['default'](this.frame)) {
      this.supported = _parsedProps['default'](this.frame);
      this.config = _merge['default'](_parsedTiming['default'](this.frame), _transitionProps['default'](this.supported));
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
  Transition.prototype.run = _notImplemented['default'];

  /**
   * @name delay
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {Number} time Miliseconds to delay transition
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.delay = function Transition_delay(time) {
    return withFrame(this, {
      'transition-delay': _isString['default'](time) ? time : time + 'ms'
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
      'transition-duration': _isString['default'](time) ? time : time + 'ms'
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
      width: _isString['default'](width) ? width : width + 'px'
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
      height: _isString['default'](height) ? height : height + 'px'
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
      width: _isString['default'](width) ? width : width + 'px',
      height: _isString['default'](height) ? height : height + 'px'
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
      top: _isString['default'](position) ? position : position + 'px'
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
      left: _isString['default'](position) ? position : position + 'px'
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
      top: _isString['default'](left) ? left : left + 'px',
      left: _isString['default'](top) ? top : top + 'px'
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateX', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateY', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'translateZ', _isString['default'](distance) ? distance : distance + 'px')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'rotate', _isString['default'](degrees) ? degrees : degrees + 'deg')
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
      transform: _updateTransform['default'](_isSomething['default'](this.frame) ? this.frame['transform'] : null, 'scale', scale)
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
    return withDefaultRun(this.element, _add['default'](this.classList, name), _isSomething['default'](this.frame) ? this.frame : null, this.direction);
  };

  /**
   * @name removeClass
   * @method
   * @memberof Frampton.Motion.Transition#
   * @param {String} name Name of class to remove
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.removeClass = function Transition_removeClass(name) {
    return withDefaultRun(this.element, _remove['default'](this.classList, name), _isSomething['default'](this.frame) ? this.frame : null, this.direction);
  };

  /**
   * @name reverse
   * @method
   * @memberof Frampton.Motion.Transition#
   * @returns {Frampton.Motion.Transition}
   */
  Transition.prototype.reverse = function Transition_reverse() {
    return withDefaultRun(this.element, _copyList['default'](this.classList), _isSomething['default'](this.frame) ? this.frame : null, inverseDirection(this.direction));
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
    trans.list = _add['default'](this.list, child);

    trans.run = function chain_run(resolve, next) {
      saved(function () {
        child.run(resolve, next);
      }, child);
    };

    trans.reverse = function chain_reverse() {
      return _sequence['default'].apply(null, _reverse['default'](trans.list).map(function (next) {
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

    if (_isObject['default'](name)) {
      dir = frame;
      frame = name;
      name = null;
    }

    return withDefaultRun(element, _isString['default'](name) ? name.split(' ') : null, _isObject['default'](frame) ? frame : null, dir === false ? Transition.DIR_OUT : Transition.DIR_IN);
  }

  exports.Transition = Transition;
  exports.describe = describe;
});
define('frampton-motion/transitions', ['exports', 'module'], function (exports, module) {
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
    var reg;
    transform = (_isString['default'](transform) ? transform : '').trim();

    if (_contains['default'](prop, transform)) {
      reg = new RegExp(prop + "\\([^)]*\\)");
      if (_isString['default'](value) && value.trim() !== '') {
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

    var transition = new _framptonMotionTransition.Transition();
    transition.name = _framptonMotionTransition.Transition.WHEN;
    transition.list = transitions;

    transition.reverse = function when_reverse() {
      return when.apply(null, transitions.map(function (trans) {
        return trans.reverse();
      }));
    };

    transition.run = function when_run(resolve, child) {

      var len = transitions.length;

      var _loop = function (i) {
        transitions[i].run(function () {
          if (i === len - 1) {
            (resolve || _noop['default'])();
          }
        }, child);
      };

      for (var i = 0; i < len; i++) {
        _loop(i);
      }
    };

    return transition;
  }
});
require("frampton-motion");

})();