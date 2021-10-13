import SbEditable, { SbEditableContent } from 'storyblok-react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import sliceStyles from './Carousel.module.scss'
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

type Props = {
  slice: SbEditableContent & {
    slides: {
      imageUrl: string
      title: string
      //Work out how to interface an array of objects with string type inside
      points: [
        string
      ]
    }
  }
}

type slidesArr = Record<string, string>

const formatSlides = (slides: any) => {
  const slidesArr: any = []

  for (const entry of slides) {
    slidesArr.push({
      //Replaces the original image using the storyblok image "fit-in" service with a white background fill
      imageUrl: entry.image?.filename.replace('https://a.storyblok.com', 'https://img2.storyblok.com/fit-in/1103x679/filters:fill(fff)'),
      title: entry.title,
      points: entry.points,
    })
  }

  return slidesArr
}

const Carousel = ({
  slice,
} : Props ) => {
  const [slides, setSlides] : [slidesArr[] | any, any] = useState()

  useEffect(() => {
    setSlides(formatSlides(slice.slides))
  }, [slice])

  return (
    <SbEditable content={slice}>
      <div 
        className={`
      ${sliceStyles.carousel}
      `}>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={50}
          totalSlides={slides?.length}
        >
          <Slider>
            {slides && slides.map(({ imageUrl, title, points } : { imageUrl: string; title: string; points: any }, i: any) => (
              <Slide index={i}>
                <div className={sliceStyles.carousel__slide}>
                  <Image 
                    className={sliceStyles.carousel__image}
                    src={imageUrl} 
                    height={679}
                    width={1103}
                  />
                  <div className={sliceStyles.slide__content}>
                    <h4>Featured projects</h4>
                    <h3>{title}</h3>
                    {points.map((point: any) => (
                      <p>{point.text}</p>
                    ))}
                  </div>
                </div>
              </Slide>
            ))}
          </Slider>
          <DotGroup 
            className={sliceStyles.carousel__dot}
          />
        </CarouselProvider>
      </div>
    </SbEditable>
  )
}

export default Carousel
