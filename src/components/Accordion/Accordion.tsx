import React from 'react'
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel'
import { AccordionPanelContent, AccordionPanelContentProps } from './AccordionPanelContent'
import { AccordionPanelTitle, AccordionPanelTitleProps } from './AccordionPanelTitle'
import { OverridableComponentProps } from '../../utils/overridableComponent'
import classes from './Accordion.module.scss'
import classnames from 'classnames'
import { AccordionContext, AccordionOptions, extractOptions, useAccordionContext } from './AccordionContext'

export type AccordionProps = OverridableComponentProps<(
  | (
    {
      panel?: never
      content?: never
      title?: never
    } & Partial<AccordionOptions>
  )
  | (
    {
      large?: never
      panel: true
      content?: never
      title?: never
    } & AccordionPanelProps
  )
  | (
    {
      large?: never
      panel?: never
      content: true
      title?: never
    } & AccordionPanelContentProps
  )
  | (
    {
      large?: never
      panel?: never
      content?: never
      title: true
    } & AccordionPanelTitleProps
  )
)>

export const Accordion: React.FC<AccordionProps> = ({ large, panel, content, title, ...props }) => {
  if (panel) {
    return <AccordionPanel { ...props as AccordionPanelProps } />
  }

  if (content) {
    return <AccordionPanelContent { ...props as AccordionPanelContentProps } />
  }

  if (title) {
    return <AccordionPanelTitle { ...props as AccordionPanelTitleProps } />
  }

  const { as: Component = 'div', ...rest } = props
  const [options, componentProps] = extractOptions(rest)
  const [value] = useAccordionContext(options)

  return (
    <AccordionContext.Provider value={value}>
      <Component { ...componentProps } className={classnames(props.className, classes.accordion)} />
    </AccordionContext.Provider>
  )
}
