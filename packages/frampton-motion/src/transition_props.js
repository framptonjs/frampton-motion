import supported from 'frampton-style/supported';

/**
 * Returns an objec
 * @name transitionProps
 * @method
 * @private
 * @memberof Frampton.Motion
 * @param {Object} props
 * @returns {Object}
 */
export default function transition_props(props) {
  var trans = {};
  trans[supported('transition-property')] = Object.keys(props).join(', ');
  return trans;
}