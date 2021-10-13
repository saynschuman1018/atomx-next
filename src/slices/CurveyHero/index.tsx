import Image from 'next/image'
import { useRef } from 'react'
import { Richtext, StoryblokComponent } from 'storyblok-js-client'

import renderRichText from '../../utils/richTextResolver'
import toReactStyle from '../../utils/styleTransformer'
import heroStyles from './CurveyHero.module.scss'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { rem } from '../../utils/rem'

type Curve = {
  start: {
    x: number | string
    y: number | string
  }
  control: {
    x: number | string
    y: number | string
  }
  end: {
    x: number | string
    y: number | string
  }
}

export type CurveyHeroProps = StoryblokComponent<'curvey_hero'> & {
  style?: string
  background: { filename: string }
  heading: string
  content: Richtext
  height?: number
  top_curve?: Curve
  bottom_curve?: Curve
}

const clampOffset = (limit: number, offset: number, damping: number) => Math.ceil(Math.max(limit, limit + offset * damping))

export const CurveyHero: PureSliceComponent<CurveyHeroProps> = ({ slice }) => {
  const containerEl: any = useRef(null)

  const coverOffset = 0

  const { top_curve, bottom_curve } = slice

  return (
    <div
      className={heroStyles['curvey-hero']}
      ref={containerEl}
      style={toReactStyle(slice.style)}
    >
      <div
        className={heroStyles['curvey-hero__cover']}
        style={{
          flex: 1,
          transform: `translate3d(0,${coverOffset * -0.5}px,0)`,
        }}
      >
        <Image
          src={slice.background?.filename}
          alt=""
          layout="fill"
          objectFit="cover"
          unoptimized={!!process?.env?.STORYBOOK}
          priority
        />
      </div>
      <svg className={heroStyles['curvey-hero__overlay']} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className={heroStyles['curvey-hero__overlay-path']}
          d={`M0 0 L${top_curve?.start?.x} ${top_curve?.start?.y} Q${top_curve?.control?.x} ${top_curve?.control?.y}, ${top_curve?.end?.x} ${top_curve?.end?.y} z`}
        />
        <path
          className={heroStyles['curvey-hero__overlay-path']}
          d={`M100 100
            L${bottom_curve?.start?.x} ${clampOffset(Number(bottom_curve?.start?.y), coverOffset, 0.17)}
            Q${bottom_curve?.control?.x} ${clampOffset(Number(bottom_curve?.control?.y), coverOffset, 0.15)},
            ${bottom_curve?.end?.x} ${bottom_curve?.end?.y} z`}
        />
      </svg>
      <article
        className={heroStyles['curvey-hero__content']}
        style={{
          minHeight: slice.height ? rem(slice.height) : 'auto',
          overflow: 'hidden',
        }}
      >
        {slice.heading ?
          <h1 className={heroStyles['curvey-hero__heading']}>{slice.heading}</h1> : null}
        {slice.content ? <section dangerouslySetInnerHTML={{ __html: renderRichText(slice.content) }} /> : null}
      </article>
    </div>
  )
}

export default withSlice(CurveyHero)
