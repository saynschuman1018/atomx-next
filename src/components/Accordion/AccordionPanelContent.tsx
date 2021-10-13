import React, { useContext } from 'react'
import { OverridableComponent } from '../../utils/overridableComponent'
import { AccordionPanelContext } from './AccordionPanelContext'
import classnames from 'classnames'
import classes from './Accordion.module.scss'
import { AnimatePresence, motion } from 'framer-motion'

export type AccordionPanelContentProps = {
  //
}

export const AccordionPanelContent: OverridableComponent<AccordionPanelContentProps> = ({ children, as: Component = 'div', ...props }) => {
  const { open } = useContext(AccordionPanelContext)

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={classes['accordion__content__wrapper']}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.3,
          }}
          variants={{
            open: { opacity: 1, height: 'auto' },
            collapsed: { opacity: 0, height: 0 },
          }}
        >
          <Component
            { ...props }
            className={classnames(props.className, classes['accordion__content'], {
              [classes['accordion__content--open']]: open,
            })}
          >
            {children}
          </Component>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}