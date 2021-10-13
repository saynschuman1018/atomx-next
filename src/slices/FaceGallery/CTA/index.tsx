import React from 'react'
import Link from 'next/link'
import { StoryblokComponent } from 'storyblok-js-client'
import { PureSliceComponent, withSlice } from '../../SliceComponent'
import { Underline } from '../../../components/Underline'
import AtomixIcon from '../../../components/icons/AtomixIcon'

import classes from './CTA.module.scss'
import { leadingSlashIt } from '../../../utils/leadingSlashIt'

export type CTAProps = StoryblokComponent<'face_gallery_cta'> & {
  title: string
  subtitle: string
  link: {
    cached_url: string
  }
}

const CTA: PureSliceComponent<CTAProps> = ({ slice }) => {
  const { title, subtitle, link } = slice

  return (
    <aside className={classes['facegallery-cta']}>
      <div className={classes['facegallery-cta__heading']}>
        <Link href={leadingSlashIt(link?.cached_url)}>
          <a className={classes['facegallery-cta__link']}>
            {title}
            <Underline className={classes['facegallery-cta__underline']} />
          </a>
        </Link>
      </div>
      <div className={classes['facegallery-cta__subtitle']}>
        <AtomixIcon className={classes['facegallery-cta__image']} iconCode={'uparrow'} />
        <span>{subtitle}</span>
      </div>
    </aside>
  )
}

export default withSlice(CTA)
