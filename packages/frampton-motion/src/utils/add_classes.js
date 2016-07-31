import curry from 'frampton-utils/curry';

/**
 * @name addClasses
 * @param {Element} element
 * @param {String[]} classes
 */
export default curry(function add_classes(element, classes) {
  const len = classes.length;
  for (let i = 0; i < len; i++) {
    element.classList.add(classes[i]);
  }
});
