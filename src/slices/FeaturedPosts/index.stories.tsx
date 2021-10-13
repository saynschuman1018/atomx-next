import defaultSlice from './mocks.json'
import { createSliceMeta } from '../../utils/createSliceMeta'
import { FeaturedPosts, FeaturedPostsProps } from './index'
import { Story } from '@storybook/react'

export default createSliceMeta({
  title: 'Featured Posts',
  component: FeaturedPosts,
})

const Template: Story<FeaturedPostsProps> = (slice) => <FeaturedPosts slice={slice} />

export const Default = Template.bind({})
Default.args = defaultSlice as unknown as FeaturedPostsProps