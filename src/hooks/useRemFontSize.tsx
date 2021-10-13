import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { isSsr } from '../utils/isSsr'
import { normalise } from '../utils/normalise'

// @ts-ignore
import iOS from 'is-ios'

const minSize = 768

type BreakpointKey = 'md' | 'lg'

type Breakpoint = [number, number]

const breakpoints: Record<BreakpointKey, Breakpoint> = {
  md: [minSize, 1024],
  lg: [1024, 1600],
}

const getBreakpoint = () => {
  const fallback: Breakpoint = [0, 1600]
  const keys = Object.keys(breakpoints)

  if (typeof window === 'undefined') {
    return fallback
  }

  for (const key in breakpoints) {
    const [min, max] = breakpoints[key as BreakpointKey]

    let query = `(max-width: ${max}px)`

    if (key === Object.keys(breakpoints)[0]) {
      query = `(min-width: ${min}px) and ${query}`
    }

    if (window.matchMedia(query).matches) {
      return [min, max]
    }
  }

  return breakpoints[keys[keys.length - 1] as BreakpointKey]
}

const getWindowWidth = () => {
  if (isSsr()) {
    return Number.POSITIVE_INFINITY
  }

  let width = window.innerWidth

  /**
   * This is basically a bunch of logic to get the real screen size for iPad/iPhone when the device is rotated
   */
  if (iOS) {
    const orientation = typeof screen.orientation === 'undefined' ? window.orientation : screen.orientation.angle
    const isLandscape = Math.abs(Number(orientation)) === 90

    width = isLandscape ? screen.height : screen.width
  }

  return width
}

const getScale = () => {
  const [min, max] = getBreakpoint()
  const actual = getWindowWidth()

  return normalise(min, max, actual)
}

export const InlineFontSetter = () => {
  const min = 12
  const max = 16
  const fontSize = useRemFontSize({ min, max })

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`

    if (document.body.parentElement) {
      document.body.parentElement.style.fontSize = `${fontSize}px`
    }
  }, [fontSize])

  return (
    <Head>
      <style>{`
        html {
          font-size: ${max}px;
        }
      `}</style>
      <script  dangerouslySetInnerHTML={{ __html: `
        var breakpoints = JSON.parse('${JSON.stringify(breakpoints)}');
        var fontSizes = JSON.parse('${JSON.stringify({ min, max })}')
        var keys = Object.keys(breakpoints)

        if (window.innerWidth < ${minSize}) {
          document.querySelector('html').style.fontSize = '16px'
        } else {
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i]
            var min = breakpoints[key][0]
            var max = breakpoints[key][1]
            var condition = '(max-width: ' + (max) + 'px)'
            if (window.matchMedia(condition).matches) {
              var scale = Math.min(1, Math.max(0, (window.innerWidth - min) / (max - min)))
              var difference = fontSizes.max - fontSizes.min
              var fontSize = Number(fontSizes.min + (difference * scale)).toFixed(1)
              document.querySelector('html').style.fontSize = fontSize + 'px'
              break
            }
          }
        }
      ` }} />
    </Head>
  )
}

export const useRemFontSize = ({ min = 12, max = 16 } = {}) => {
  const [scale, setScale] = useState(getScale())

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onResize = () => window.requestAnimationFrame(() => setScale(getScale()))

      window.addEventListener('resize', onResize)
      window.addEventListener('orientationchange', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('orientationchange', onResize)
      }
    }
  }, [])

  if (typeof window === 'undefined') {
    return max
  }

  if (window.innerWidth < minSize) {
    return 16 // Fall back to normal font size on mobile
  }

  const difference = max - min

  return Number(min + (difference * scale)).toFixed(1)
}
