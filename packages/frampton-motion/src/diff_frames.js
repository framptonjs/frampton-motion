export default function diff_frames(frame1, frame2) {
  var diff = {};
  for (let key in frame1) {
    if (frame2[key] && (frame2[key] !== frame1[key])) {
      diff[key] = frame2[key];
    }
  }
  return diff;
}