import * as colorsys from 'colorsys';

let h = Math.random();

export function genRandomColor() {
  h += 0.618033988749895;
  h %= 1.0;

  return colorsys.hsvToRgb(h * 360, 80, 99);
}

export function rgbToHex(r, g, b) {
  return (r & 0x0ff) << 16 | (g & 0x0ff) << 8 | b & 0x0ff;
}

export function isValidHexString(hexStr) {
  if (hexStr.startsWith('#')) {
    hexStr = value.substring(1);
  }
  return /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(hexStr);
}