/**
 * Forces browser reflow by reading the offsetHeight of given element
 *
 * @name reflow
 * @method
 * @private
 * @memberof Frampton.Motion
 * @param {Object} element DomNode to reflow
 */
export default function reflow(element) {
  return element.offsetWidth;
}
