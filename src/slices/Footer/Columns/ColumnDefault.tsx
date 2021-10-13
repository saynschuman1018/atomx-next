import React from 'react'
import { Richtext } from 'storyblok-js-client'
import classes from '../Footer.module.scss'
import renderRichText from '../../../utils/richTextResolver'

export interface ColumnDefaultProps {
  heading: string
  content: Richtext
}

export const ColumnDefault: React.VFC<ColumnDefaultProps> = (props) => {
  return (
    <div className={classes['footer__column-default']} >
      {props.heading && (
        <h2 className={classes['footer__column-default__heading']}>{props.heading}</h2>
      )}
      {props.content && (
        <section
          className={classes['footer__column-default__content']}
          dangerouslySetInnerHTML={{ __html: renderRichText(props.content) }}
        />
      )}
    </div>
  )
}

export default ColumnDefault