import curry from 'frampton-utils/curry';

/**
 * @name removeClasses
 * @param {Element} element
 * @param {String[]} classes
 */
export default curry(function remove_classes(element, classes) {
  const len = classes.length;
  for (let i = 0; i < len; i++) {
    element.classList.remove(classes[i]);
  }
});
