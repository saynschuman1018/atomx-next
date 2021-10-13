import React from 'react'
import { Grid, GridProps } from '../Grid'
import classes from './column.module.scss'
import classnames from 'classnames'
import { StoryblokComponent } from 'storyblok-js-client'
import { RichTextContent, useRichText } from '../../utils/useRichText'

export type ColumnProps = Omit<GridProps, 'item'> & StoryblokComponent<'column'> & {
  body: RichTextContent
}

export const isColumn = (subject: StoryblokComponent<string>): subject is ColumnProps => subject.component === 'column'

export const Column: React.FC<ColumnProps> = ({ body, className, ...gridProps }) => {
  const props = useRichText(body)

  return (
    <Grid
      item
      className={classnames(classes.column, className)}
      { ...props }
      { ...gridProps }
    />
  )
}