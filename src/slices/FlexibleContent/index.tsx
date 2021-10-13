import React from 'react'
import { StoryblokComponent } from 'storyblok-js-client'
import { FlexibleContent } from '../../components/FlexibleContent'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { FlexibleContentRow, FlexibleContentRowProps } from './flexibleContentRow'

export type FlexibleContentProps = StoryblokComponent<'flexible_content'> & {
  rows: FlexibleContentRowProps[]
}

type FlexibleContentContextType = FlexibleContentProps

export const FlexibleContentContext = React.createContext<FlexibleContentContextType | null>(null)

export const FlexibleContentSlice: PureSliceComponent<FlexibleContentProps> = ({ slice }) => {
  return (
    <FlexibleContent>
      <FlexibleContentContext.Provider value={slice}>
        {slice.rows.map((row, i) => <FlexibleContentRow slice={row} i={i} key={row._uid} />)}
      </FlexibleContentContext.Provider>
    </FlexibleContent>
  )
}

export default withSlice(FlexibleContentSlice)