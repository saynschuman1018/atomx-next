import { PureSliceComponent } from '../SliceComponent'
import { ComponentKeys, getFlexibleContentSlice, isFlexibleContentSlice, slices } from './slices'
import { FlexibleContent } from '../../components/FlexibleContent'
import React from 'react'
import { StoryblokComponent } from 'storyblok-js-client'
import { Overflow } from '../../components/FlexibleContent/FlexibleContent'

export type FlexibleContentRowProps = StoryblokComponent<'flexible_content_row'> & {
  row: [StoryblokComponent<ComponentKeys> & Record<string, unknown>] // Storyblok puts this in an array even if it's only ever 1 block
  overflow_left?: Overflow
  overflow_right?: Overflow
}

type FlexibleContentRowContextType = {
  i: number
  row: StoryblokComponent<ComponentKeys> & Record<string, unknown>
}

export const FlexibleContentRowContext = React.createContext<FlexibleContentRowContextType | null>(null)

export const FlexibleContentRow: PureSliceComponent<FlexibleContentRowProps, { i: number }> = ({ slice, i }) => {
  const { row: rows, overflow_left, overflow_right } = slice
  const [row] = rows

  if (!row) {
    return null
  }

  if (!isFlexibleContentSlice(row.component)) {
    throw new Error(`"${row.component}" is not a registered flexible content slice. Expected one of: "${Object.keys(slices).join(', ')}"`)
  }

  const Component = getFlexibleContentSlice(row.component)
  const props = Component.getRowProps ? Component.getRowProps(row) : {}

  return (
    <FlexibleContentRowContext.Provider value={{ row, i }} key={row._uid}>
      <FlexibleContent row {...props} overflow={{ left: overflow_left, right: overflow_right }}>
        <Component slice={row}/>
      </FlexibleContent>
    </FlexibleContentRowContext.Provider>
  )
}