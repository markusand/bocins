export const isNumber = (num: any) => typeof +num === 'number' && !Number.isNaN(+num);

export const round = (num: number, decimals: number): number => {
  const pow = 10 ** decimals;
  return Math.round(num * pow) / pow;
};

export const decimals = (num: number): number => (
  num % 1 ? num.toString().split('.')[1].length : 0
);

export const clamp = (num: number, min: number, max: number): number => (
  Math.min(Math.max(num, min), max)
);
