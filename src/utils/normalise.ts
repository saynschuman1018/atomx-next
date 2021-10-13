export const normalise = (min: number, max: number, actual: number): number => clamp(0, 1, (actual - min) / (max - min))

const clamp = (min: number, max: number, actual: number): number => Math.min(max, Math.max(min, actual))
