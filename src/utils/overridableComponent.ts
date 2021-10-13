import React from 'react'

export type OverridableComponentProps<P = Record<string, unknown>, C extends React.ElementType = React.ElementType> = P & React.ComponentPropsWithoutRef<C> & {
  as?: C
}

export type OverridableComponent<P = Record<string, unknown>, C extends React.ElementType = React.ElementType> = React.ComponentType<OverridableComponentProps<P,  C>>

