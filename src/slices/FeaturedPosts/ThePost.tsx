import { Post } from './index'
import classes from './FeaturedPosts.module.scss'
import { Grid } from '../../components/Grid'
import React from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '../../components/Button'
import Image from 'next/image'

export type ThePostProps = {
  post: Post
  isCollapsed: boolean
  classname?: string
  keyProp: number
  numberOfPosts: number
  toggleCollapse?: () => void
}

export const ThePost: React.FC<ThePostProps> = ({
  post,
  classname,
  numberOfPosts,
  keyProp,
  isCollapsed,
  toggleCollapse,
}) => {
  const variants = {
    closed: {
      y: 0,
      opacity: 0,
      display: 'none',
    },
    open: {
      y: 50,
      opacity: 1,
    },
  }

  const loadMoreVariants = {
    open: {
      x: 0,
      opacity: 0,
      transition: {
        x: { stiffness: 1000, velocity: 100, from: 100, duration: 0.5 },
        opacity: { duration: 1 },
      },
    },
    closed: {
      x: 0,
      opacity: 1,
      transition: {
        x: { stiffness: 1000, from: 100, duration: 0.5 },
        opacity: { duration: 1 },
      },
    },
  }

  return (
    <>
      {keyProp == numberOfPosts - 1 && numberOfPosts % 2 ?
        <Grid className={classnames(classes['featured-posts__post'], classes['featured-posts__post--placeholder'])}>
          <div />
        </Grid>
        : null}
      <Grid className={classnames(classname, classes['featured-posts__post'])}>
        {post.content.body.map((postItem, i) => (
          <React.Fragment key={i}>
            {postItem.component == 'featured_image' ?
              <motion.div
                variants={variants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={'/' + post.slug}>
                  <div className={classnames(classes['featured-posts__post-image'])}>
                    <Image
                      //TBC placeholder image
                      src={postItem.image.filename || 'https://a.storyblok.com/f/105336/279x160/8b837292bf/logo.png'}
                      height={400}
                      width={600}
                      alt={postItem.image.alt}
                    />
                  </div>
                </Link>
              </motion.div>
              : null}
            {postItem.component == 'post_category' ?
              <motion.div
                variants={variants}
              >
                <h4>{postItem.category_name}</h4>
                <Link href={'/' + post.slug}>
                  <h3>{post.name}</h3>
                </Link>
              </motion.div>
              : null}
          </React.Fragment>
        ))}
        {(keyProp == numberOfPosts - 1 && !isCollapsed) || (keyProp == 1 && isCollapsed) ?
          <motion.div
            initial={'open'}
            animate={'closed'}
            variants={loadMoreVariants}>
            <Grid container className={classes['featured-posts__load-more']}>
              <Button
                icon={isCollapsed ? 'plus' : 'minus'}
                variant={'primary'}
                onClick={toggleCollapse}
              >
                {isCollapsed ? 'Load more' : 'Load less'}
              </Button>
            </Grid>
          </motion.div>
          : null}
      </Grid>
    </>
  )
}
