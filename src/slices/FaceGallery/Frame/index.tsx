import { useEffect, useState } from 'react'
import { Richtext, StoryblokComponent } from 'storyblok-js-client'
import Image from 'next/image'
import Chance from 'chance'
import { useViewportScroll } from 'framer-motion'
import { PureSliceComponent, withSlice } from '../../SliceComponent'
import renderRichText from '../../../utils/richTextResolver'
import { getNodeText } from '../../../utils/getNodeText'

import classes from './Frame.module.scss'

export type FrameProps = StoryblokComponent<'face_gallery_frame'> & {
  seed: Chance.Seed
  heading: string
  description: Richtext
  media: {
    filename: string
  }
}

const Frame: PureSliceComponent<FrameProps, { height: number | string }> = ({ slice }) => {
  const [offsets, setOffsets] = useState<number[]>([0,0,0,0])
  const [factor, setShimmerFactor] = useState<number>(0)
  const { media, heading, seed, description } = slice

  const richTextContent = renderRichText(description)
  const rawTextContent = getNodeText(richTextContent)

  const { scrollY } = useViewportScroll()

  const intensity = 0.005

  useEffect(() => {
    const chance = new Chance(seed)

    setOffsets([
      chance.integer({ min: 0, max: 49 }) - 25,
      chance.integer({ min: 0, max: 49 }) - 25,
      chance.integer({ min: 0, max: 49 }) - 25,
      chance.integer({ min: 0, max: 49 }) - 25,
    ])
  }, [seed])


  useEffect(() => {
    function updateShimmer() {
      setShimmerFactor(scrollY.get() * intensity)
    }

    const unsubscribeY = scrollY.onChange(updateShimmer)

    return () => {
      unsubscribeY()
    }
  }, [])

  const sin = Math.sin(factor)
  const cos = Math.cos(factor)

  return (
    <article className={classes['facegallery-frame']}>
      <section
        className={classes['facegallery-frame__image']}
      >
        {media?.filename ? <Image
          src={media?.filename}
          alt={heading}
          layout="fill"
          objectFit="cover"
          unoptimized={!!process?.env?.STORYBOOK}
          priority
        /> : null}
        <svg className={classes['facegallery-frame__mask']} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            fill="#fff"
            d={`M0 0 L100 0 L100 ${50 - offsets[0] * sin} Q98 3, ${50 - offsets[1] * cos} 0 Q3 3, 0 ${50 - offsets[3] * sin} z`}
          />
          <path
            fill="#fff"
            d={`M100 100 L100 ${50 - offsets[0] * sin} Q98 98, ${50 - offsets[2] * cos} 100 Q3 98, 0 ${50 - offsets[3] * sin} L0 100 z`}
          />
        </svg>
      </section>
      <header>
        {heading ? <h3 className={classes['facegallery-frame__title']}>{heading}</h3> : null}
      </header>
      {rawTextContent ?
        <section
          className={classes['facegallery-frame__content']}
          dangerouslySetInnerHTML={{ __html: richTextContent }}
        /> : null}
    </article>
  )
}

export default withSlice(Frame)
