import React from 'react'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import ColumnContact from './Columns/ColumnContact'
import ColumnSocial from './Columns/ColumnSocial'
import ColumnDefault from './Columns/ColumnDefault'

export type FooterColumnProps = StoryblokComponent<'footer_column'> & {
  heading: string
  content: Richtext
  link_url: string
  link_text: string
  bcorp_url: string
}

const FooterColumn: PureSliceComponent<FooterColumnProps> = ({ slice }) => {
  const column_type = String(slice.component);
  switch (column_type) {
    case 'footer_column_contact':
      return <ColumnContact link_text={slice.link_text} link_url={slice.link_url} />
    case 'footer_column_social':
      return <ColumnSocial bcorp_url={slice.bcorp_url} />
    default:
      return <ColumnDefault heading={slice.heading} content={slice.content} />
  }
}

export default withSlice(FooterColumn)