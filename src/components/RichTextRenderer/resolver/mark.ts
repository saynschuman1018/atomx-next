import { LinkAttributes, Mark, StyledAttributes } from '@marvr/storyblok-rich-text-types'
import React, { FunctionComponent, ReactNode } from 'react'

export type GenericMarkResolver = {
  [key in Mark]: (children: ReactNode) => ReactNode
}

export type MarkResolvers = Omit<GenericMarkResolver, 'link' | 'styled'> & {
  link: (children: ReactNode, attrs: LinkAttributes) => ReactNode
  styled: (children: ReactNode, attrs: StyledAttributes) => ReactNode
};

const simpleMarkResolver = (element: string | FunctionComponent) => {
  const markResolver = (children: React.ReactNode) => (
    React.createElement(element, null, children)
  )

  return markResolver
}

const linkResolver = (children: ReactNode, { href, target, linktype }: LinkAttributes) => (
  React.createElement('a', {
    href: linktype === 'email' ? `mailto:${href}` : href,
    target,
  }, children)
)

const styledResovler = (children: React.ReactNode, attrs: StyledAttributes) => (
  React.createElement('span', { className: attrs.class }, children)
)

export const defaultMarkResolvers: MarkResolvers = {
  [Mark.LINK]: linkResolver,
  [Mark.STYLED]: styledResovler,
  [Mark.BOLD]: simpleMarkResolver('b'),
  [Mark.STRONG]: simpleMarkResolver('strong'),
  [Mark.ITALIC]: simpleMarkResolver('i'),
  [Mark.STRIKE]: simpleMarkResolver('s'),
  [Mark.UNDERLINE]: simpleMarkResolver('u'),
  [Mark.CODE]: simpleMarkResolver('code'),
}
