import { withSlice } from '../../../SliceComponent'
import React from 'react'
import { Grid } from '../../../../components/Grid'
import { Column, ColumnProps } from '../../../../components/Column'
import { GridSizes } from '../../../../components/Grid/Grid'
import { Tuple } from 'ts-essentials'
import columnClasses from './columns.module.scss'
import classnames from 'classnames'
import { StoryblokComponent } from 'storyblok-js-client'
import { FlexibleContent } from '../../../../components/FlexibleContent'
import { FlexibleContentSlice } from '../index'

export type ColumnsProps = {
  content: Array<ColumnProps | ColumnsSliceProps>
  extra_gap: boolean
  constrained: boolean
  align_vertical: boolean
  wider_column?: 'left' | 'right'
}

export type ColumnsSliceProps = StoryblokComponent<'columns'> & ColumnsProps

export const isColumns = (subject: StoryblokComponent<string>): subject is ColumnsSliceProps => subject.component === 'columns'

export const Columns: FlexibleContentSlice<'columns', ColumnsProps> = ({ slice }) => {
  const { content, wider_column, align_vertical, constrained } = slice
  const classes: string[] = []
  const columnCount: ColumnCount = content.length as ColumnCount
  let sizes: Tuple<Partial<GridSizes>> = withColumnSizes(columnCount)

  if (wider_column) {
    const wideSize: Partial<GridSizes> = { xs: 12, sm: 6, lg: 7 }
    const narrowSize: Partial<GridSizes> = { xs: 12, sm: 6, lg: 5 }

    switch (wider_column) {
    case 'left':
      sizes = [wideSize, narrowSize]
      break
    case 'right':
      sizes = [narrowSize, wideSize]
      break
    }
  }

  // Constrained only to be applied to 1 column rows
  if (constrained && columnCount === 1) {
    classes.push(columnClasses.constrained)
  }

  return (
    <FlexibleContent column>
      <Grid>
        <Grid verticalAlign={align_vertical} row>
          {content.map((props, i) => {
            switch (props.component) {
            case 'column':
              return <Column { ...props } key={props._uid} { ...sizes[i] } className={classnames(classes)} />
            case 'columns':
              return (
                <Grid item key={props._uid} { ...sizes[i] } className={classnames(classes)}>
                  <Columns slice={props} />
                </Grid>
              )
            }
          })}
        </Grid>
      </Grid>
    </FlexibleContent>
  )
}

type ColumnCount = 1 | 2 | 3 | 4

const withColumnSizes = (count: ColumnCount): Tuple<Partial<GridSizes>> => {
  const sizes: Record<ColumnCount, Partial<GridSizes>> = {
    1: {
      xs: 12,
    },
    2: {
      xs: 12,
      sm: 6,
    },
    3: {
      xs: 12,
      md: 4,
    },
    4: {
      xs: 12,
      sm: 6,
      md: 3,
    },
  }

  return Array.from<Partial<GridSizes>>({ length: count }).fill(sizes[count])
}

export default withSlice(Columns)