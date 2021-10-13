import { Quote } from './Quote'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'
import React from 'react'

export default createComponentMeta(Quote)

type QuoteStoryProps = {
  quote_item: React.ReactNode
}

const DefaultQuoteProps = {
  quote_item: 'I am a quote item',
}

const Template: Story<QuoteStoryProps> = ({ quote_item }) => {
  return (
    <Quote> { quote_item } </Quote>
  )
}

export const Default = Template.bind({})
Default.args = DefaultQuoteProps