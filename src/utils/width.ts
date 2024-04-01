export const toWidth = (number: string | number | undefined) => {
  if (!number) return null;
  const width = !isNaN(+number) ? `${number}rem` : number;
  return { width, flex: `0 0 ${width}` };
};
