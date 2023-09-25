export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function calculateAngle(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const radians = Math.atan2(deltaY, deltaX);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}
