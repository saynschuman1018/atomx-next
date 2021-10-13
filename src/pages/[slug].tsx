/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'

import StoryblokService from '../utils/storyblokService'
import { DefaultLayout } from '../components/layouts/DefaultLayout'
import { withRouter } from 'next/router'
import { SettingsContext } from '../contexts/settingsContext'

type ComponentRegistry = {
  [key: string]: ComponentType<any>
}

const SeoCard       = dynamic(() => import('../slices/SeoCard'))

const Components: ComponentRegistry = {
  menu:                   dynamic(() => import('../slices/HeaderContainer')),
  curvey_hero:            dynamic(() => import('../slices/CurveyHero')),
  face_gallery:           dynamic(() => import('../slices/FaceGallery')),
  basic_article:          dynamic(() => import('../slices/BasicArticle')),
  footer:                 dynamic(() => import('../slices/Footer')),
  two_col_collapsable:    dynamic(() => import('../slices/TwoColCollapsable')),
  carousel:               dynamic(() => import('../slices/Carousel')),
  featured_posts:         dynamic(() => import('../slices/FeaturedPosts')),
  flexible_content:       dynamic(() => import('../slices/FlexibleContent')),
  team_card:              dynamic(() => import('../slices/TeamCard')),
}

type Props = {
  doc: any
  settings: any
  menus: Record<string, unknown>
  footers: Record<string, unknown>
  router: any
}

class DynamicPage extends React.Component<Props> {
  state: {
    locale: string
    path: string
    story : any
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      locale: props.router.locale,
      path: props.router.asPath,
      story: props.doc.data.story,
    }
  }

  componentDidMount() {
    StoryblokService.initEditor(this as any)
  }

  static getDerivedStateFromProps(props: Props, state: any) {
    const propsStory = props?.doc?.data?.story

    if (props.router.locale !== state.locale || props.router.asPath !== state.path) {
      return {
        locale: props.router.locale,
        path: props.router.asPath,
        story: propsStory,
      }
    }

    return null
  }

  private mapContainerToSlice(collection: Record<string, any>, slug: string) {
    const entry = collection.find((el: any) => {
      const slugParts = slug?.split('/')

      if (slugParts?.length && slugParts.length === 0) return false

      return el.slug === slugParts[1]
    })

    return entry?.content
  }

  render() {
    // Top-level hook for the visual editor
    const content = this.state.story.content
    const siteTitle = this.props.settings?.site_name ?? 'undefined'

    return (
      <DefaultLayout title={siteTitle}>
        <SettingsContext.Provider value={this.props.settings}>
          {content?.head && content.head.length > 0 && (
            <SeoCard slice={content.head[0]} />
          )}

          {content?.body?.map((slice: any) => {
            let actualSlice = slice

            if (slice.component === 'nav_container') {
              const navigationSlug = slice.menu.url.length > 0 ? slice.menu.url : slice.menu.cached_url

              actualSlice = this.mapContainerToSlice(this.props.menus, navigationSlug)
            }

            if (slice.component === 'footer_container') {
              const footerSlug = slice.slug.url.length > 0 ? slice.slug.url : slice.slug.cached_url

              actualSlice = this.mapContainerToSlice(this.props.footers, footerSlug)
            }
            const Component = Components[actualSlice.component]

            return Component ? <Component
            slice={actualSlice}
            key={slice._uid}
            settings={this.props.settings} /> : null
        })}
        </SettingsContext.Provider>
      </DefaultLayout>
    )
  }
}

export const getStaticProps: GetStaticProps = async ({ params } : { params?: any }) => {
  const settingsDoc   = await StoryblokService.getDocumentBySlug('settings')
  const menuDocs      = await StoryblokService.getCollection('menus')
  const footerDocs    = await StoryblokService.getCollection('footers')
  const doc           = await StoryblokService.getDocumentBySlug(params.slug, {
    resolve_relations: 'featured_posts.posts',
    resolve_links: 'story',
  })

  return {
    props: {
      doc,
      footers: footerDocs,
      menus: menuDocs,
      settings: {
        ...settingsDoc?.data?.story?.content,
      },
    },
    revalidate: 20,
  }
}

export async function getStaticPaths() {
  const docs = await StoryblokService.getAll()

  return {
    paths: docs.map(doc => ({
      params: {
        slug: doc.full_slug,
      },
    }),
    ),
    fallback: false,
  }
}

export default withRouter(DynamicPage as any)
