import dynamic from 'next/dynamic'
import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import renderRichText from '../../utils/richTextResolver'
import toReactStyle from '../../utils/styleTransformer'
import { getNodeText } from '../../utils/getNodeText'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { FrameProps } from './Frame'
import { CTAProps } from './CTA'

import articleStyles from '../../styles/article.module.scss'
import classes from './FaceGallery.module.scss'

const Frame   = dynamic(() => import('./Frame'))
const CTA     = dynamic(() => import('./CTA'))

export type FaceGalleryProps = StoryblokComponent<'face_gallery'> & {
  heading?: string
  content?: Richtext
  frames?: FrameProps[]
  cta?: CTAProps[]
  height?: number
  style?: string
}

const FaceGallery: PureSliceComponent<FaceGalleryProps> = ({ slice }) => {
  const { height, heading, style, content, frames, cta } = slice

  const richTextContent = renderRichText(content)
  const rawTextContent = getNodeText(richTextContent)

  return (
    <div className={classes.facegallery} style={toReactStyle(style)}>
      <section className={classes['facegallery__heading']}>
        {heading ?
          <h2 className={articleStyles['article__heading']}>{heading}</h2> : null}
        {cta && cta?.length > 0 ? <CTA slice={cta[0]} /> : null}
      </section>
      {rawTextContent ?
        <section
          className={articleStyles['article__content']}
          dangerouslySetInnerHTML={{ __html: richTextContent }}
        /> : null}
      <section className={classes['facegallery__content']}>
        {frames?.map((frame: FrameProps) => (
          <Frame
            key={frame._uid}
            slice={frame}
            height={height ?? 300}
          />))}
      </section>
    </div>
  )
}

export default withSlice(FaceGallery)
