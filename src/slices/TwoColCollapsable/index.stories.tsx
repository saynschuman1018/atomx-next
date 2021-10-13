import defaultSlice from './mocks.json'
import { createSliceMeta } from '../../utils/createSliceMeta'
import { TwoColCollapsable, TwoColCollapsableProps } from './index'
import { Story } from '@storybook/react'

export default createSliceMeta({
  title: 'Two Col Collapsable',
  component: TwoColCollapsable,
})

const Template: Story<TwoColCollapsableProps> = (slice) => <TwoColCollapsable slice={slice} />

export const Default = Template.bind({})
Default.args = defaultSlice as unknown as TwoColCollapsableProps
