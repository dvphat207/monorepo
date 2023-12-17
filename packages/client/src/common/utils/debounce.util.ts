export const debounce = <T extends (...args: any[]) => any>(func: T, wait?: number) => {
  let timerId: string | number | NodeJS.Timeout | undefined;

  return function (this: any, ...args: any[]) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), wait);
  };
};
