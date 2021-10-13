
import React from 'react'
import { StoryblokComponent } from 'storyblok-js-client'
import classes from './FeaturedPosts.module.scss'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { Grid } from '../../components/Grid'
import { ThePost } from './ThePost'
import classnames from 'classnames'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { MobileSlider } from './MobileSlider'
import { motion, useCycle } from 'framer-motion'
import { FadeInWhenVisible } from '../../components/FadeInWhenVisible'

export type FeaturedPostsProps = StoryblokComponent<'featured_posts'> & {
  posts: Post[]
}

export type Post = {
  name: string
  slug: string
  content: {
    body: [{
      component: 'featured_image' | 'post_category'
      category_name: string
      image: {filename: string; alt: string}
    }]
  }
}

export const FeaturedPosts: PureSliceComponent<FeaturedPostsProps> = ({ slice }) => {
  const [isCollapsed, toggleCollapse] = useCycle(true, false)
  const numberOfPosts = slice.posts.length

  const variants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, delayChildren: 0.1, staggerDirection: 1,
        opacity: { duration: 0.2 },
      },
    },
    closed: {
      opacity: 0,
      transition: {
        opacity: { duration: 1 },
      },
    },
  }

  return (
    <Grid container className={classes['featured-posts']}>
      <FadeInWhenVisible>
        <Grid className={classes['featured-posts-mosiac']}>
          {slice.posts.map((Post, i: number) => (
            <React.Fragment key={i}>
              { i <= 1 ?
                <ThePost
                  isCollapsed={isCollapsed}
                  toggleCollapse={toggleCollapse}
                  classname={classnames([classes['featured-posts__post-above']], {
                    [classes['featured-posts__stagger-posts--down']]: i == 0,
                    [classes['featured-posts__stagger-posts--up']]: i == 1,
                  })}
                  keyProp={i}
                  post={Post}
                  numberOfPosts={numberOfPosts}
                />
                : null }
            </React.Fragment>
          ))}
        </Grid>
      </FadeInWhenVisible>
      <motion.div
        animate={isCollapsed ? 'closed' : 'open'}
        variants={variants}
      >
        <Grid className={classes['featured-posts-mosiac']}>
          {slice.posts.map((Post, i: number) => (
            <ThePost
              isCollapsed={isCollapsed}
              keyProp={i}
              key={i}
              classname={classnames([classes['featured-posts__post-below']], {
                [classes['featured-posts__post--hidden']]: i <= 1,
                [classes['featured-posts__stagger-posts--down']]: i % 2 == 0,
                [classes['featured-posts__stagger-posts--up']]: i % 2 || i == numberOfPosts -1,
              })}
              numberOfPosts={numberOfPosts}
              toggleCollapse={toggleCollapse}
              post={Post}
            />
          ))}
        </Grid>
      </motion.div>
      <Grid className={classes['featured-posts__slider']}>
        <Grid row>
          <MobileSlider posts={slice.posts} isCollapsed={isCollapsed} numberOfPosts={numberOfPosts} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withSlice(FeaturedPosts)
