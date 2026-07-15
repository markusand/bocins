export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export const percent = (v: number, min = 0, max = 1) => (v - min) / (max - min) * 100;
