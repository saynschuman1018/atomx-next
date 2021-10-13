import accordion from './Accordion'
import columns from './Columns'
import spacer from './Spacer'
import { SliceComponent } from '../../SliceComponent'
import { StoryblokComponent } from 'storyblok-js-client'
import { GridProps } from '../../../components/Grid'

export type FlexibleContentSlice<
  K extends string = string,
  SP extends Record<string, unknown> = Record<string, unknown>,
  P = Record<string, unknown>
> = SliceComponent<StoryblokComponent<K> & SP, P> & {
  getRowProps?: (props: StoryblokComponent<K> & SP) => GridProps
}

export const slices = {
  accordion,
  columns,
  spacer,
}

export type ComponentKeys = keyof typeof slices

export const isFlexibleContentSlice = (key: string): key is ComponentKeys => key in slices

export const getFlexibleContentSlice = <K extends ComponentKeys>(key: K): FlexibleContentSlice<K> => {
  return slices[key] as unknown as FlexibleContentSlice<K>
}

export default slices
