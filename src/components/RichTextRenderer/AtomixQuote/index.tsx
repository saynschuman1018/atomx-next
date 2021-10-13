import React from 'react'
import { Quote } from '../../Quote/Quote'
import { reactRenderRichText } from '../reactRichTextResolver'

export type AtomixQuoteProps = {
    content: string
}

export const AtomixQuote: React.FC<AtomixQuoteProps> = ({ content }) => {
  return (
    <Quote>{reactRenderRichText(content)}</Quote>
  )
}