import defaultSlice from './mocks/default.json'
import { createSliceMeta } from '../../utils/createSliceMeta'
import { CurveyHero, CurveyHeroProps } from './index'
import { Story } from '@storybook/react'

export default createSliceMeta(CurveyHero)

const Template: Story<CurveyHeroProps> = (props) => <CurveyHero slice={props} />

export const Default = Template.bind({})
Default.args = defaultSlice