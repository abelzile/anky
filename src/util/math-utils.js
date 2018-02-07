export function degreesToRadians(degrees = 0) {
  return degrees * (Math.PI / 180.0);
}

export function radiansToDegrees(radians = 0) {
  return radians * (180.0 / Math.PI);
}

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}
