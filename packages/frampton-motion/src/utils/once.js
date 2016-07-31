export default function once(fn) {
  var triggered = false;
  return function(...args) {
    if (!triggered) {
      triggered = true;
      return fn(...args);
    }
  };
}
