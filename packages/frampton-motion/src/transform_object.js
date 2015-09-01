var transforms = [
  'matrix',
  'matrix3d',
  'translate',
  'translate3d',
  'translateX',
  'translateY',
  'translateZ',
  'scale',
  'scale3d',
  'scaleX',
  'scaleY',
  'scaleZ',
  'rotate',
  'rotate3d',
  'rotateX',
  'rotateY',
  'rotateZ',
  'skew',
  'skewX',
  'skewY',
  'perspective'
];

export default function transform_object(transform) {
  var obj = {};
  for (let i=0;i<transforms.length;i++) {
    let prop = transforms[i];
    let cap = new RegExp(prop + "\\(([^)]+)\\)");
    let matches = cap.exec(transform);
    if (matches && matches.length) {
      obj[prop] = matches[0].replace(prop + '(', '').replace(')', '');
    }
  }
  return obj;
}