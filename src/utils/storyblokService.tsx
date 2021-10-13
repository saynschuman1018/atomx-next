import React from 'react'
import router from 'next/router'
import StoryblokClient, { Richtext } from 'storyblok-js-client'

export class StoryblokService {
  private devMode: boolean

  private token: string

  private client: StoryblokClient

  private query: any

  constructor() {
    this.devMode = true
    this.token = process.env['NEXT_PUBLIC_STORYBLOK_API_TOKEN'] ?? ''
    this.client = new StoryblokClient({
      accessToken: this.token,
      cache: {
        clear: 'auto',
        type: 'memory',
      },
    })

    this.query = {}
  }

  getCacheVersion() {
    return this.client.cacheVersion
  }

  // ask Storyblok's Content API for content of story
  async get(path: string, params?: { version?: string; cv?: number }) {
    params = params || {}

    if (this.getQuery('_storyblok') || this.devMode || (typeof window !== 'undefined' && window.storyblok)) {
      params.version = 'draft'
    }

    if (typeof window !== 'undefined' && typeof window.StoryblokCacheVersion !== 'undefined') {
      params.cv = window.StoryblokCacheVersion
    }

    return this.client.get(path, params)
  }

  async getDocumentBySlug(slug: string, params?: {
    version?: string
    cv?: number
    resolve_relations?: string
    resolve_links?: 'url' | 'story' }
  ) {
    return this.get(`cdn/stories/${slug}`, { cv: Date.now(), ...params })
  }

  async getAll(pathExpr?: string) {
    return this.client.getAll(pathExpr ?? 'cdn/stories')
  }

  async getCollection(id: string) {
    let response: any

    try {
      response = await this.client.getAll('cdn/stories', {
        'version': this.devMode ? 'draft' : 'published',
        'starts_with': `${id}/`,
        cv: Date.now(),
      })
    } catch (error) {
      console.error(error)
    }

    return response
  }

  // initialize the connection between Storyblok & Next.js in Visual Editor
  initEditor(reactComponent: { state: { story: { content: { _uid: string } } }; setState: (arg0: { story: any }) => void }) {
    if (typeof window !== 'undefined' && window.storyblok) {
      window.storyblok.init()

      // reload on Next.js page on save or publish event in Storyblok Visual Editor
      window.storyblok.on(['change', 'published'], () => router.reload())

      window.storyblok.on('input', (event: any) => {
        if (event.story.content._uid === reactComponent.state.story.content._uid) {
          event.story.content = window.storyblok.addComments(event.story.content, event.story.id)
          window.storyblok.resolveRelations(event.story, ['featured_posts.posts'], () => {
            reactComponent.setState({
              story: event.story,
            })
          })
        }
      })
    }
  }

  setQuery(query: any) {
    this.query = query
  }

  getQuery(param: string) {
    return this.query[param]
  }

  renderRichText(content: Richtext) {
    return this.client.richTextResolver.render(content)
  }

  bridge() {
    return (<script src={'//app.storyblok.com/f/storyblok-latest.js?t=' + this.token}></script>)
  }
}

const storyblokInstance = new StoryblokService()

export default storyblokInstance
