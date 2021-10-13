import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { Variant } from 'framer-motion'

export type Animation = {
  visible: Variant
  hidden: Variant
}

export const FadeAnimations: Record<string, Animation> = {
  'default': {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  },
} as const


export const FadeInWhenVisible: React.FC<{ animation?: keyof typeof FadeAnimations | Animation }> = ({ animation = 'default', children }) => {
  if (typeof animation === 'string') {
    animation = FadeAnimations[animation]
  }

  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.3 }}
      variants={animation}
    >
      {children}
    </motion.div>
  )
}
