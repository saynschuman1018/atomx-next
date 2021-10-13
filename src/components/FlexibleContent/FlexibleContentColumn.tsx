import { OverridableComponent } from '../../utils/overridableComponent'
import { Grid } from '../Grid'
import classnames from 'classnames'
import classes from './FlexibleContent.module.scss'
import ResizeObserver from 'resize-observer-polyfill'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export const FlexibleContentColumn: OverridableComponent = ({ className, ...props }) => {
  const [isColumnRow, setIsColumnRow] = useState(false)
  const el = useRef<HTMLElement>(null)

  const observer = useMemo(() => new ResizeObserver(() => {
    if (el.current && el.current.parentElement) {
      const topMargin = window.getComputedStyle(el.current).marginTop

      setIsColumnRow(el.current.parentElement.offsetTop !== el.current.offsetTop - Number.parseInt(topMargin))
    }
  }), [])

  useEffect(() => {
    if (el.current) {
      observer.observe(el.current)
    }
  }, [el])

  return (
    <Grid ref={el} item {...props} className={classnames(className, classes.column, {
      [classes['column--row']]: isColumnRow,
    })} />
  )
}