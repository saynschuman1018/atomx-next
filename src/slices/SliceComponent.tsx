import React, { ComponentProps } from 'react'
import SbEditable from 'storyblok-react'
import { StoryblokComponent } from 'storyblok-js-client'

export type PureSliceComponentProps<SliceProps> = {
  slice: SliceProps
}

export type SliceComponentProps<SliceProps extends StoryblokComponent<string>> = {
  slice: SliceProps
}

export type SliceComponent<SP extends StoryblokComponent<string> = StoryblokComponent<string>, P = Record<string, unknown>> = React.ComponentType<SliceComponentProps<SP> & P>

export type PureSliceComponent<SP extends StoryblokComponent<string> = StoryblokComponent<string>, P = Record<string, unknown>> = React.ComponentType<PureSliceComponentProps<SP> & P>

export type WithSliceHOC = <SP extends StoryblokComponent<string> = StoryblokComponent<string>, P = Record<string, unknown>>(Component: PureSliceComponent<SP, P>) => SliceComponent<SP, P>

export const withSlice: WithSliceHOC = (Component) => {
  const SliceComponent = (props: ComponentProps<typeof Component>) => {
    return (
      <SbEditable content={props.slice}>
        <Component { ...props } />
      </SbEditable>
    )
  }

  Object.assign(SliceComponent, Component)

  return SliceComponent
}