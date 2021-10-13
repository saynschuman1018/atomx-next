import React from 'react'
import classes from './quote.module.scss'

export type QuoteWrapperProps = React.ComponentProps<'p'> & {
  //
}

export const Quote: React.FC<QuoteWrapperProps> = ({
  ...props
}) => {
  return (
    <p className={ classes.quote_text } { ...props } />
  )
}
