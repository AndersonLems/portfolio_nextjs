export function Measure(label?: string) {
  return function <T extends (...args: never[]) => unknown>(
    _target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      return;
    }

    descriptor.value = function (
      this: ThisParameterType<T>,
      ...args: Parameters<T>
    ): ReturnType<T> {
      const timerLabel = label ?? `measure:${propertyKey}`;

      console.time(timerLabel);

      try {
        return originalMethod.apply(this, args) as ReturnType<T>;
      } finally {
        console.timeEnd(timerLabel);
      }
    } as T;
  };
}
