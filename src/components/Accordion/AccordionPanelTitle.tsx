import React, { useContext } from 'react'
import { OverridableComponent } from '../../utils/overridableComponent'
import classes from './Accordion.module.scss'
import classnames from 'classnames'
import { AccordionPanelContext } from './AccordionPanelContext'
import { AccordionContext } from './AccordionContext'
import { ToggleOpener } from '../icons/ToggleOpener'

export type AccordionPanelTitleProps = {
  //
}

export const AccordionPanelTitle: OverridableComponent<AccordionPanelTitleProps> = ({ children, as: Component = 'div', ...props }) => {
  const { i, open } = useContext(AccordionPanelContext)
  const { toggleRow } = useContext(AccordionContext)
  const onClick = () => toggleRow(i)

  return (
    <Component { ...props } className={classnames(props.className, classes['accordion__title'], {
      [classes['accordion__title--open']]: open,
    })} onClick={onClick}>
      <span className={classes['accordion__title__text']}>
        {children}
      </span>
      <span className={classes['accordion__title__icon']}>
        <ToggleOpener open={open} />
      </span>
    </Component>
  )
}