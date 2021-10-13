import classnames from 'classnames'
import React, { useContext } from 'react'
import { OverridableComponent } from '../../utils/overridableComponent'
import classes from './Grid.module.scss'
import { notWith } from '../../utils/propTypes'
import { GridContext } from './GridContext'

export type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type GridSizes = Record<Breakpoints, Columns>

export type GridProps = {
  item?: boolean
  container?: boolean
  fluid?: boolean
  row?: boolean
  className?: string
  center?: boolean
  withoutMargin?: boolean
  verticalAlign?: boolean
} & Partial<GridSizes>

export const Grid: OverridableComponent<GridProps> = React.forwardRef(function Grid({ withoutMargin = false, center = false, item = false, fluid = false, container = false, row = false, verticalAlign = false, className, as: Component = 'div', ...props }, ref) {
  const { xs, sm, md, lg, xl, ...componentProps } = props
  const { root } = useContext(GridContext)
  const allClasses = classnames(className, classes.grid, {
    [classes['grid-item']]: item,
    [classes['grid-container']]: container,
    [classes['grid-container--fluid']]: fluid,
    [classes['grid-row']]: row,
    [classes['grid--center']]: center,
    [classes['grid--vertical']]: verticalAlign,
    [classes['grid--without-margin']]: !root || withoutMargin,
  }, ...breakpointClasses({ xs, sm, md, lg, xl }))
  
  let Wrapper: React.ComponentType = React.Fragment

  // This all looks a bit complicated, but basically what this does is avoid double page margins when nesting grids.
  if (item && root) {
    Wrapper = ({ children }) => (
      <GridContext.Provider value={{ root: false }}>
        {children}
      </GridContext.Provider>
    )
  }

  return (
    <Wrapper>
      <Component ref={ref} className={allClasses} { ...componentProps } />
    </Wrapper>
  )
})

Grid.propTypes = {
  item: notWith('container', 'row'),
  container: notWith('item', 'row'),
  row: notWith('container', 'item'),
}

Grid.displayName = 'Grid'

const breakpointClasses = (breakpoints: Partial<Record<Breakpoints, Columns>>): string[] => {
  const result: string[] = []

  for (const breakpoint in breakpoints) {
    const columns = breakpoints[breakpoint as keyof typeof breakpoints]
    const classname = `grid-item--${breakpoint}-${columns}`

    if (columns && classname in classes) {
      result.push(classes[classname])
    }
  }

  return result
}
