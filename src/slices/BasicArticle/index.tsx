import React from 'react'
import articleStyles from '../../styles/article.module.scss'
import renderRichText from '../../utils/richTextResolver'
import toReactStyle from '../../utils/styleTransformer'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { Richtext, StoryblokComponent } from 'storyblok-js-client'

export type BasicArticleProps = StoryblokComponent<'basic_article'> & {
  height?: number
  heading?: string
  content?: Richtext
  style?: string
}

export const BasicArticle: PureSliceComponent<BasicArticleProps> = ({ slice }) => (
  <article
    className={articleStyles.article}
    style={{
      minHeight: `${slice.height}px` ?? 'auto',
      ...toReactStyle(slice.style),
    }}
  >
    {slice.heading ?
      <h2 className={articleStyles['article__heading']}>{slice.heading}</h2> : null}
    {slice.content ?
      <section
        className={articleStyles['article__content']}
        dangerouslySetInnerHTML={{ __html: renderRichText(slice.content) }}
      /> : null}
  </article>
)

export default withSlice(BasicArticle)
