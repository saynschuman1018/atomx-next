import basicSlice from './mocks/basic.json'
import { TeamCard as TeamCardComponent, TeamCardProps } from './index'
import { createSliceMeta } from '../../utils/createSliceMeta'
import { Story } from '@storybook/react'

export default createSliceMeta({
  title: 'Team Card',
  component: TeamCardComponent,
})

const Template: Story<TeamCardProps> = (slice) => <TeamCardComponent slice={slice} settings={{}} />

export const TeamCard = Template.bind({})
TeamCard.args = basicSlice
