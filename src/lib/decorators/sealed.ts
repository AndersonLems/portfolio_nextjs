export function Sealed() {
  return function <T extends new (...args: never[]) => object>(constructor: T) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
  };
}
