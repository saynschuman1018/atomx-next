import { OverridableComponent } from '../../utils/overridableComponent'
import { Grid } from '../Grid'
import classnames from 'classnames'
import classes from './FlexibleContent.module.scss'
import { FlexibleContentColumn } from './FlexibleContentColumn'

export type Overflow = 'none' | '1_col' | '2_col'

export type FlexibleContentProps = {
  row?: boolean
  column?: boolean
  fluid?: boolean
  overflow?: {
    left?: Overflow
    right?: Overflow
  }
}

export const FlexibleContent: OverridableComponent<FlexibleContentProps> = ({ row, fluid, column, overflow = {}, children, ...props }) => {
  if (column) {
    return (
      <FlexibleContentColumn { ...props }>
        {children}
      </FlexibleContentColumn>
    )
  }

  if (row) {
    const overflowClasses = []

    for (const side of ['left', 'right'] as const) {
      for (let i = 1; i <= 2; i++) {
        if (overflow[side] === `${i}_col`) {
          overflowClasses.push(classes[`overflow--${side}--${i}-col`])
        }
      }
    }

    return (
      <Grid container fluid={fluid} { ...props } className={classnames(props.className, classes.outer, classes.container)}>
        <Grid row { ...props } className={classnames(props.className, classes.row, overflowClasses)}>
          {children}
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid className={classnames(props.className, classes.root)} fluid={fluid} { ...props }>
      {children}
    </Grid>
  )
}
