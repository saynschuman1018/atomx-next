import React, { ReactNode } from 'react'
import { CustomList, CustomListProps } from '../CustomList'
import { AtomixQuote, AtomixQuoteProps } from '../AtomixQuote'

export const BLOK_LIST = 'custom_list'
export const BLOK_QUOTE = 'atomix_quote'

const customListBlokResolver = (props: CustomListProps): ReactNode => (
  <CustomList {...props}/>
)

const atomixQuoteBlokResolver  = (props: AtomixQuoteProps): ReactNode => (
  <AtomixQuote {...props}/>
)

export type BlokResolvers = {
  [BLOK_LIST]: (props: CustomListProps) => ReactNode
  [BLOK_QUOTE]: (props: AtomixQuoteProps) => ReactNode
}

export const customBlokResolvers:BlokResolvers = {
  [BLOK_LIST]: customListBlokResolver,
  [BLOK_QUOTE]: atomixQuoteBlokResolver,
}
