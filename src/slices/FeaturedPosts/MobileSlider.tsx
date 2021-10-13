import { useMemo } from 'react';
import classes from './FeaturedPosts.module.scss'
import { Post } from './index'
import { ThePost } from './ThePost'
import classnames from 'classnames'
import { CarouselProvider, Slider, Slide, Dot } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import AtomixIcon from '../../components/icons/AtomixIcon'

export type MobileSliderProps = {
  posts: Post[]
  isCollapsed: boolean
  numberOfPosts: number
}

export const MobileSlider: React.FC<MobileSliderProps> = ({
  posts,
  isCollapsed,
}) => {
  const dots = useMemo(() => {
    const dots: JSX.Element[] = []

    for (let i = 0; i < posts.length; i++) {
      dots.push(<Dot key={i} slide={i}><AtomixIcon iconCode="egg"/></Dot>)
    }

    return dots
  }, [posts.length])


  return (
    <CarouselProvider
      naturalSlideWidth={10}
      naturalSlideHeight={10}
      totalSlides={posts.length}
      isIntrinsicHeight={true}
      className={classnames(classes['featured-posts__slider-wrapper'])}
    >
      <Slider className={classnames(classes[`posts-${posts.length}`])}>
        {posts.map((Post: Post, i: number) => {
          return (
            <Slide key={i} classNameHidden={classes['featured-posts__slider-slide--hidden']} index={i}>
              <div className={classes['featured-posts__slider-slide']}>
                <ThePost
                  isCollapsed={isCollapsed}
                  post={Post}
                  keyProp={i}
                  numberOfPosts={posts.length}
                />
              </div>
            </Slide>
          )})}
      </Slider>
      <div className={classes['featured-posts__slider-dots']}>
        {dots}
      </div>
    </CarouselProvider>
  )
}
