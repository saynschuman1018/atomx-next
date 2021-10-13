import React from 'react'
import { reactRenderRichText } from '../reactRichTextResolver'
import { IconCodeType } from '../../icons/AtomixIcon'
import { UnOrderedList } from '../../UnOrderedList/UnOrderedList'
import { OrderedList } from '../../OrderedList/OrderedList'
import { Richtext } from 'storyblok-js-client'

export type ListItemRichTextProps = {
  text: Richtext
  isLink?: boolean
  iconCode?: IconCodeType
}

export type CustomListProps = {
  content: ListItemRichTextProps[]
  tag?: 'ol' | 'ul'
  isIconBlob?: boolean
  color?: string
}

export const CustomList: React.FC<CustomListProps> = ({ content, tag, isIconBlob, color }) => {
  //Remapping content
  const genericListItemProps = {
    item: true,
    color: color,
  }

  const ListComponent = tag === 'ol' ? OrderedList : UnOrderedList
  const listItemProps = content.map(({ text, isLink, iconCode }, index) => {
    return {
      ...genericListItemProps,
      iconCode: iconCode,
      order: index + 1,
      link: isLink,
      children: <p>{ reactRenderRichText(text) }</p>,
    }
  })

  return (
    <ListComponent item={ false } style={ { paddingLeft: 0 } }>
      {listItemProps.map((itemProps, index) => (
        <ListComponent key={ index } iconButton={ isIconBlob } { ...itemProps } />
      ))}
    </ListComponent>
  )
}
