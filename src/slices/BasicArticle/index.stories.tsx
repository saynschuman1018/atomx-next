import basicSlice from './mocks/basic.json'
import { BasicArticle as BasicArticleComponent, BasicArticleProps } from './index'
import { createSliceMeta } from '../../utils/createSliceMeta'
import { Story } from '@storybook/react'

export default createSliceMeta({
  title: 'Basic Article',
  component: BasicArticleComponent,
})

const Template: Story<BasicArticleProps> = (slice) => <BasicArticleComponent slice={slice} />

export const BasicArticle = Template.bind({})
BasicArticle.args = basicSlice
