export const rem = (input: number | string): string => {
  if (typeof input === 'string') {
    input = Number.parseFloat(input)
  }

  return `${input / 16}rem`
}