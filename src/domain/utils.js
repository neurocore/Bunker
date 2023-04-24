export const Enum = (...args) =>
  Object.freeze(args.reduce((obj, item) => {
    obj[item] = Symbol(item);
    return obj;
  }, {}));
