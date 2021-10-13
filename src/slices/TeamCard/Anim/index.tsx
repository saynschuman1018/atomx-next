import React, { createRef, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import Chance from 'chance'
import { Point2D } from '../lib/2D'
import {
  animate,
  SVGPathElement as EnhancedSVGPath,
  BubbleAnimationDef,
  BubbleEventCallback,
} from '../lib/animation'
import styles from './Anim.module.scss'

// Chloe   :  1009.17 | 503.99  -> 3790
// Adam    :  1073.74 | 930.47  -> 3295
// Georgie :   740.45 | 1172.53 -> 2870
// Malinda :   458.79 | 1174.18 -> 2585
// Josh    :   572.60 | 520.48  -> 1820
// Luke    :   639.54 | 866.89  -> 1320

export type TeamBubble = {
  media: {
    filename: string
  }
}

// Define the bubble animation table
const animationDefs: BubbleAnimationDef[] = [
  {
    startPos: new Point2D(1009, 504),
    endPos: new Point2D(700, 330),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 400,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 3790,
  },
  {
    startPos: new Point2D(1074, 930),
    endPos: new Point2D(860, 770),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 400,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 3295,
  },
  {
    startPos: new Point2D(740, 1173),
    endPos: new Point2D(600, 990),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 400,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 2870,
  },
  {
    startPos: new Point2D(459, 1174),
    endPos: new Point2D(300, 1000),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 400,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 2585,
  },
  {
    startPos: new Point2D(573, 520),
    endPos: new Point2D(375, 280),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 400,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 1820,
  },
  {
    startPos: new Point2D(640, 867),
    endPos: new Point2D(440, 620),
    anim: [
      { transform: 'scale(0.01, 0.01)' },
      { transform: 'scale(1, 1.2)' },
      { transform: 'scale(0.8, 0.7)' },
      { transform: 'scale(1, 1)' },
      { transform: 'scale(0.95, 0.95)' },
      { transform: 'scale(1, 1)' },
    ],
    timing: {
      duration: 500,
      iterations: 1,
      fill: 'forwards',
    },
    trigger: 1320,
  },
]

function Anim({ team } : { team: TeamBubble[] }) {
  const [isMounted, setIsMounted] = useState(false)
  const [anchorRef, isInView] = useInView({
    root: null,
    rootMargin: '50%',
    threshold: 0.5,
    triggerOnce: true,
  })
  const emptyRef = useRef(null)

  const [images, setImages] = useState(team.map(entry => entry.media.filename))

  const chance = new Chance(Math.round(Math.random() * images.length))

  const viewportRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const bubbleRefs: React.RefObject<SVGImageElement>[] = []

  for(const key in animationDefs) {
    bubbleRefs[key] = createRef()
  }

  const handleAnimationCheckpoint: BubbleEventCallback =
    (key: number, animationDef: BubbleAnimationDef) => {
      bubbleRefs[key].current?.animate(
        animationDef.anim as Keyframe[],
        animationDef.timing,
      )
    }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleAnimationComplete = () => {
    setInterval(() => {
      const index = Math.round(Math.random() * (bubbleRefs.length - 1))

      const currentRef = bubbleRefs[index]?.current

      if (currentRef) {
        currentRef.
          animate(
            [{ transform: 'scale(0.01, 0.001)' }],
            {
              duration: 400,
              iterations: 1,
              fill: 'forwards',
            },
          ).finished.then(() => {
            const imageIndex = images.indexOf(currentRef.href.baseVal)

            const newImageIndex = Math.round(Math.random() * (images.length - 7)) + 6

            const tempImage = images[newImageIndex]

            images[newImageIndex] = images[imageIndex]
            images[imageIndex] = tempImage

            // TODO:
            // - verified garbage collection, and memory allocation is constant. Ok.
            // - load events seem to be queued when the tab is deactivated.
            // - trade-in: flash of weird content on swap fixed.
            const svgImageLoad = new Promise((resolve, reject) => {
              currentRef.addEventListener('error', (error) => reject(error))
              currentRef.addEventListener('load', () => resolve(tempImage))
              currentRef.setAttribute('href', tempImage)
            })

            return svgImageLoad.then(() => {
              return currentRef.animate(
                [
                  { transform: 'scale(0.01, 0.01)' },
                  { transform: 'scale(1, 1.2)' },
                  { transform: 'scale(0.8, 0.7)' },
                  { transform: 'scale(1, 1)' },
                  { transform: 'scale(0.95, 0.95)' },
                  { transform: 'scale(1, 1)' },
                ],
                {
                  duration: 500,
                  iterations: 1,
                  fill: 'forwards',
                },
              )
            })
          }).catch(error => console.error(error))
      }
    }, 4000)
  }

  // Initialize the animation
  useEffect(() => {
    if (isMounted && isInView && viewportRef.current && pathRef.current) {
      animate(
        viewportRef.current,
        pathRef.current as unknown as EnhancedSVGPath,
        animationDefs,
        handleAnimationCheckpoint,
        handleAnimationComplete,
      )
    }
  }, [isMounted, isInView, viewportRef, pathRef])

  useEffect(() => {
    setImages(chance.shuffle(images))

    async function preloadImages() {
      await Promise.all(images.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image()

          img.src = url

          img.addEventListener('error', (error) => {
            reject(error)
          })

          img.addEventListener('load', () => {
            resolve(img)
          })
        })
      }))
    }

    preloadImages()
    setIsMounted(true)
  }, [])

  return (
    <div ref={isMounted ? anchorRef : emptyRef} style={{ position: 'absolute' }}>
      <svg ref={viewportRef} className={styles.svgViewport} viewBox="0 0 2951.694 1262.296" preserveAspectRatio="none">
        <defs>
          <clipPath id="clip-path">
            <path d="M751.581,507.268c3.627-9.314,8.225-18.295,9.863-29.895,3.6-35.563-2.557-69.518-21.192-93.574-29.721-38.357-75.127-68.217-124.956-57.324-43.264,9.789-72.49,37.725-90.394,66.906-20.729,33.787-17.184,79,5.781,118.8a132.22,132.22,0,0,0,48.69,42.5,169.573,169.573,0,0,0,22.3,9.578C655.7,576.209,718.946,558.162,751.581,507.268Z" transform={`matrix(0.602, 0.799, -0.799, 0.602, ${animationDefs[5].endPos.x + 145.809}, ${animationDefs[5].endPos.y -603.393})`} fill="#ffffff"/>
          </clipPath>
          <clipPath id="clip-path-2">
            <path d="M835.683,571.32c4.9-12.573,11.1-24.7,13.313-40.355,4.86-48.006-3.452-93.842-28.608-126.315-40.12-51.779-101.413-92.086-168.678-77.381-58.4,13.214-97.854,50.924-122.022,90.316-27.982,45.609-23.2,106.648,7.8,160.362,17.412,25.173,39.674,43.809,65.727,57.368a228.88,228.88,0,0,0,30.1,12.929C706.249,664.383,791.628,640.021,835.683,571.32Z" transform={`translate(${animationDefs[4].endPos.x-511.22} ${animationDefs[4].endPos.y-324.208})`} fill="#ffffff"/>
          </clipPath>
          <clipPath id="clip-path-3">
            <path d="M707.283,473.53c2.958-7.6,6.709-14.923,8.045-24.385,2.937-29.009-2.086-56.706-17.287-76.328-24.243-31.288-61.281-55.645-101.927-46.759-35.291,7.985-59.13,30.772-73.734,54.575-16.909,27.56-14.017,64.444,4.715,96.9A107.853,107.853,0,0,0,566.811,512.2,138.337,138.337,0,0,0,585,520.013C629.07,529.765,680.662,515.044,707.283,473.53Z" transform={`translate(${animationDefs[3].endPos.x + 870.829} ${animationDefs[3].endPos.y-17.259}) rotate(133)`} fill="#ffffff" />
          </clipPath>
          <clipPath id="clip-path-4">
            <path d="M712.739,477.686c3.041-7.809,6.9-15.339,8.269-25.064,3.018-29.816-2.144-58.284-17.768-78.452-24.918-32.159-62.986-57.193-104.763-48.06C562.2,334.317,537.7,357.738,522.69,382.2c-17.379,28.327-14.407,66.237,4.846,99.6a110.854,110.854,0,0,0,40.822,35.63,142.173,142.173,0,0,0,18.693,8.03C632.35,535.486,685.378,520.355,712.739,477.686Z" transform={`translate(${animationDefs[2].endPos.x + 890.895} ${animationDefs[2].endPos.y + 189.663}) rotate(149)`} fill="#ffffff"/>
          </clipPath>
          <clipPath id="clip-path-5">
            <path d="M723.488,485.872c3.2-8.226,7.263-16.157,8.71-26.4,3.179-31.406-2.258-61.393-18.716-82.637-26.247-33.874-66.346-60.244-110.351-50.624-38.208,8.645-64.017,33.315-79.829,59.086-18.306,29.838-15.176,69.77,5.1,104.911a116.767,116.767,0,0,0,43,37.531A149.757,149.757,0,0,0,591.1,536.2C638.811,546.756,694.667,530.818,723.488,485.872Z" transform={`translate(${animationDefs[1].endPos.x-431.185} ${animationDefs[1].endPos.y-392.202}) rotate(8)`} fill="#fff" />
          </clipPath>
          <clipPath id="clip-path-6">
            <path d="M782.779,531.028c4.1-10.523,9.292-20.67,11.143-33.775,4.067-40.179-2.889-78.541-23.943-105.719C736.4,348.2,685.1,314.463,628.8,326.771c-48.88,11.059-81.9,42.621-102.126,75.59-23.42,38.172-19.415,89.259,6.531,134.215,14.573,21.069,33.205,36.666,55.01,48.014a191.578,191.578,0,0,0,25.191,10.821C674.449,608.917,745.907,588.528,782.779,531.028Z" transform={`translate(${animationDefs[0].endPos.x -590.737} ${animationDefs[0].endPos.y +332.92}) rotate(-45)`} fill="#ffffff"/>
          </clipPath>
        </defs>
        <image
          href={images[0]}
          width="270"
          ref={bubbleRefs[1]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[1].startPos.x} ${animationDefs[1].startPos.y}`}
          x={animationDefs[1].endPos.x}
          y={animationDefs[1].endPos.y}
          clipPath="url(#clip-path-5)"
        />
        <image
          href={images[1]}
          width="290"
          ref={bubbleRefs[3]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[3].startPos.x} ${animationDefs[3].startPos.y}`}
          x={animationDefs[3].endPos.x}
          y={animationDefs[3].endPos.y}
          clipPath="url(#clip-path-3)"
        />
        <image
          href={images[2]}
          width="350"
          ref={bubbleRefs[4]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[4].startPos.x} ${animationDefs[4].startPos.y}`}
          x={animationDefs[4].endPos.x}
          y={animationDefs[4].endPos.y}
          clipPath="url(#clip-path-2)"
        />
        <path
          ref={pathRef}
          className={styles.mainPath}
          d="m 1.901,1127.037 c 50.844,-155.209 176.617,-243.518 334.5,-270.278 157.883,-26.76 82.959,46.134 82.959,46.134 -22.721,24.152 -57,37.826 -80.124,42.013 C 238.604,963.132 201.8,824.032 266.827,787.183 c 80.28,-45.492 329.14,69.576 329.14,69.576 0,0 107.9,82.039 107.9,-196.267 0,-278.306 -148.029,-191.756 -284.506,83.874 -136.477,275.63 -93.672,468.142 200.13,445.692 293.802,-22.45 403.035,-156.919 486.667,-317.728 51.517,-99.057 61.734,-160.93 22.491,-235.653 -39.243,-74.723 -72.919,-87.937 -124.3,-137.262 -133.8,-128.449 53.646,-247.14 233.02,-261.6 179.374,-14.46 308.249,27.707 436.014,16.094 127.765,-11.613 334.163,-75.672 351.5,-155.178 17.337,-79.506 -44.211,-67.988 -84.817,-62.6 -40.606,5.388 -36.065,80.586 14.757,87.233 50.822,6.647 48.1,-58.006 70.06,-87.233 21.96,-29.227 -12.677,-39.254 -45.122,-31.718 -32.445,7.536 -62.472,116.013 89.524,118.951 151.996,2.938 182.944,-23.667 424.636,-72.036 241.692,-48.369 332.665,-17.306 457.491,0"
        />
        <image
          href={images[3]}
          width="410"
          ref={bubbleRefs[0]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[0].startPos.x} ${animationDefs[0].startPos.y}`}
          x={animationDefs[0].endPos.x}
          y={animationDefs[0].endPos.y}
          clipPath="url(#clip-path-6)"
        />
        <image
          href={images[4]}
          width="290"
          ref={bubbleRefs[2]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[2].startPos.x} ${animationDefs[2].startPos.y}`}
          x={animationDefs[2].endPos.x}
          y={animationDefs[2].endPos.y}
          clipPath="url(#clip-path-4)"
        />
        <image
          href={images[5]}
          width="355"
          ref={bubbleRefs[5]}
          className={styles.bubbleAnimatable}
          transform-origin={`${animationDefs[5].startPos.x} ${animationDefs[5].startPos.y}`}
          x={animationDefs[5].endPos.x}
          y={animationDefs[5].endPos.y}
          clipPath="url(#clip-path)"
        />
      </svg>
    </div>
  )
}

export { Anim }
