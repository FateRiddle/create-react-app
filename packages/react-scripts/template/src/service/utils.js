export function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

export function applyArguments(func, args) {
  return func.apply(null, args);
}

export const is = {
  arr: a => Array.isArray(a),
  obj: a => stringContains(Object.prototype.toString.call(a), 'Object'),
  pth: a => is.obj(a) && a.hasOwnProperty('totalLength'),
  svg: a => a instanceof SVGElement,
  inp: a => a instanceof HTMLInputElement,
  dom: a => a.nodeType || is.svg(a),
  str: a => typeof a === 'string',
  fnc: a => typeof a === 'function',
  und: a => typeof a === 'undefined',
  hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
  rgb: a => /^rgb/.test(a),
  hsl: a => /^hsl/.test(a),
  col: a => is.hex(a) || is.rgb(a) || is.hsl(a),
  promise: a => typeof a.then === 'function',
};
