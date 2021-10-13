import React from 'react'

export const isReactComponent = <P = unknown>(subject: unknown | React.ComponentType<P>): subject is React.ComponentType<P> => {
  return typeof subject === 'function'
}

export const isExoticComponent = <P = unknown>(subject: unknown | React.NamedExoticComponent<P> | React.ExoticComponent<P>): subject is React.NamedExoticComponent<P> | React.ExoticComponent<P> => {
  return typeof subject === 'object' && subject !== null && '$$typeof' in subject
}

export const isNamedExoticComponent = <P = unknown>(subject: unknown | React.NamedExoticComponent<P>): subject is React.NamedExoticComponent<P> => {
  return isExoticComponent(subject) && 'displayName' in subject
}
