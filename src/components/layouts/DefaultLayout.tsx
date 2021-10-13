import React from 'react'
import Head from 'next/head'

import StoryblokService from '../../utils/storyblokService'
import layoutStyles from '../../styles/layout.module.scss'
import { InlineFontSetter } from '../../hooks/useRemFontSize'

export type DefaultLayoutProps = {
  title?: string
  nav?: { label: string; href: string }[]
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  title = '{ Untitled }',
}) => {
  return (
    <div className={layoutStyles.page}>
      <Head>
        <title>{title}</title>
      </Head>
      <InlineFontSetter />
      <main className={layoutStyles.page__content}>
        {children}
      </main>
      {StoryblokService.bridge()}
    </div>
  )
}
