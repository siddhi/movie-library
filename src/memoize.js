function isEqual(arg1, arg2) {
  if (arg1.length !== arg2.length) {
    return false;
  }

  for(let i=0; i<arg1.length; i++) {
    if (arg1[i] !== arg2[i]) {
      return false;
    }
  }
  return true;
}

export default function memoize(fn) {
  let lastArgs, lastThis, value, called = false;
  return function(...args) {
    if (called && lastThis === this && isEqual(args, lastArgs)) {
      return value;
    }
    value = fn.apply(this, args);
    lastArgs = args;
    lastThis = this;
    called = true;
    return value;
  }
}
