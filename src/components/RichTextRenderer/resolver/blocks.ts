import { Block, CodeAttributes, HeadingAttributes, ImageAttributes } from '@marvr/storyblok-rich-text-types'
import React, { FunctionComponent, ReactNode } from 'react'

type GenericBlockResolver = {
  [key in Block]: (children: ReactNode) => ReactNode
}

export type BlockResolvers =
  Omit<GenericBlockResolver, 'horizontal_rule' | 'hard_break' | 'heading' | 'code_block' | 'image'>
  & {
    [Block.CODE]: (children: ReactNode, attrs: CodeAttributes) => ReactNode
    [Block.IMAGE]: (children: ReactNode, attrs: ImageAttributes) => ReactNode
    [Block.HEADING]: (children: ReactNode, attrs: HeadingAttributes) => ReactNode
    [Block.HR]: () => ReactNode
    [Block.BR]: () => ReactNode
  }

const simpleNodeResolver = (element: string | FunctionComponent) => {
  const nodeResolver = (children: React.ReactNode) => (
    children != undefined ? React.createElement(element, null, children) : null
  )
  
  return nodeResolver
}

const emptyNodeResolver = (element: string | FunctionComponent) => {
  const nodeResolver = () => React.createElement(element)

  return nodeResolver
}

const headingNodeResolver =  (children: React.ReactNode, attrs: HeadingAttributes) => (
  React.createElement(`h${attrs.level}`, null, children)
)

const codeNodeResolver = (children: React.ReactNode, attrs: CodeAttributes) => {
  return React.createElement('pre', null, React.createElement('code', { className: attrs.class }, children))
}

const imageNodeResolver = (children: React.ReactNode, attrs: ImageAttributes) => (
  React.createElement('img', attrs, children)
)

export const defaultBlocksResolvers: BlockResolvers = {
  [Block.DOCUMENT]: simpleNodeResolver('div'),
  [Block.HEADING]: headingNodeResolver,
  [Block.CODE]: codeNodeResolver,
  [Block.IMAGE]: imageNodeResolver,
  [Block.PARAGRAPH]: simpleNodeResolver('p'),
  [Block.QUOTE]: simpleNodeResolver('blockquote'),
  [Block.OL_LIST]: simpleNodeResolver('ol'),
  [Block.UL_LIST]: simpleNodeResolver('ul'),
  [Block.LIST_ITEM]: simpleNodeResolver('li'),
  [Block.HR]: emptyNodeResolver('hr'),
  [Block.BR]: emptyNodeResolver('br'),
}
