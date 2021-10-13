import React from 'react'
import classnames from 'classnames'
import { StoryblokComponent } from 'storyblok-js-client'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import gridStyles from '../../styles/grid.module.scss'
import layoutStyles  from '../../styles/layout.module.scss'
import classes from './Footer.module.scss'
import FooterColumn, { FooterColumnProps } from './FooterColumn'
import toReactStyle from '../../utils/styleTransformer'

export type FooterProps = StoryblokComponent<'footer'> & {
  columns: FooterColumnProps[]
  style: string
}

function getGridColumnStyle(columnCount:number) : string {
  switch (columnCount) {
    case 3:
      return gridStyles['grid-container--three-columns']
    case 4:
      return gridStyles['grid-container--four-columns']
    default:
      return ''
  }
}

export const Footer: PureSliceComponent<FooterProps> = ({ slice }) => {
  const columnCount = slice.columns.length
  return (
    <footer className={classnames(classes.footer)}>
      <div className={classnames(layoutStyles.container)}>
        <div 
          className={classnames(
            classes.footer__columns,
            gridStyles['grid-container'], 
            getGridColumnStyle(columnCount)
          )}
          style={{ ...toReactStyle(slice.style)}}
        >
          {slice.columns.map((column) => (
            <FooterColumn slice={column} key={column._uid} />
          ))}
        </div>
        <div className={classnames(classes.footer__copyright, classes.footer__contained)}>
          <p>&copy; {new Date().getFullYear()} Atomix web &amp; creative studio</p>
        </div>
      </div>
    </footer>
  )
}

export default withSlice(Footer)