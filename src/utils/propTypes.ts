import { Validator } from 'prop-types'

export const notWith = (...excludedProps: string[]): Validator<never> => (props, propName , componentName) => {
  if (!props[propName]) {
    return null
  }

  for (const prop of excludedProps) {
    if (typeof props[prop] !== 'undefined') {
      return new Error(`Prop '${prop}' can not be used in conjunction with prop '${propName}' on component '${componentName}'.`)
    }
  }

  return null
}