import React, { useContext } from 'react'
import { OverridableComponent } from '../../utils/overridableComponent'
import { AccordionPanelContext } from './AccordionPanelContext'
import { AccordionContext } from './AccordionContext'
import classnames from 'classnames'
import classes from './Accordion.module.scss'

export type AccordionPanelProps = React.ComponentProps<'div'> & {
  i: number
}

export const AccordionPanel: OverridableComponent<AccordionPanelProps> = ({ i, children, as: Component = 'div', ...props }) => {
  const { activeRows } = useContext(AccordionContext)
  const open = activeRows.includes(i)

  return (
    <AccordionPanelContext.Provider value={{ i, open }}>
      <Component { ...props } className={classnames(props.className, classes['accordion__panel'], {
        [classes['accordion__panel--open']]: open,
      })}>
        {children}
      </Component>
    </AccordionPanelContext.Provider>
  )
}