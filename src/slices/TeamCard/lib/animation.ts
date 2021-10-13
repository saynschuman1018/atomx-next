/* eslint-disable unicorn/no-null */
import { Point2D, Intersection } from './2D'
import { cloneDeep } from 'lodash'
import { isBrowser } from '../../../utils/isSsr'
if (isBrowser()) require('path-data-polyfill')

// Interfaces
export interface SVGPathDataSettings {
  normalize: boolean
}

export interface SVGPathSegment {
  type: 'M' | 'm' | 'Q' | 'q' | 'C' | 'c'
  values: number[]
}

export interface SVGPathElement extends Element {
  getPathData(settings?: SVGPathDataSettings): SVGPathSegment[]
  setPathData(pathData: SVGPathSegment[]): void
  getTotalLength(): number
  getPointAtLength(length: number): SVGPoint
}

export interface BubbleAnimationDef {
  startPos: Point2D
  endPos: Point2D
  trigger: number
  anim?: Keyframe[]
  timing?: EffectTiming
}

export interface BubbleEventCallback {
  (key: number, payload: BubbleAnimationDef) : void
}

export function getDocumentHeight() {
  const body = document.body
  const html = document.documentElement

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  )
}

/**
 * Get intersection between arbitrary dom object/offset, and SVG viewport.
 * TODO: Decouple from bounding client rect, so as to be able to compute it offscreen/outside the browser viewport.
 *
 * @param svgViewport
 * @returns
 */
function getViewportIntersections(svgViewport: SVGElement) {
  // Get bounding rects of delimiter, and svg viewport
  const svgPosInfo = svgViewport.getBoundingClientRect()

  // Extract points used for intersection
  const a1 = new Point2D(window.innerWidth, 0)
  const a2 = new Point2D(window.innerWidth, getDocumentHeight())
  const r1 = new Point2D(svgPosInfo.x, svgPosInfo.y)
  const r2 = new Point2D(svgPosInfo.x + svgPosInfo.width, svgPosInfo.y + svgPosInfo.height)

  // Intersect line and rectangle
  let intersection
  const failOver = [
    new Point2D(svgPosInfo.width, 0),
    new Point2D(svgPosInfo.width, svgPosInfo.height),
  ]

  try {
    intersection = Intersection.intersectLineRectangle(a1, a2, r1, r2)
  } catch {
    return failOver
  }

  if (intersection.points.length === 0) {
    return failOver
  }

  return intersection.points
}

/**
 * Parse path data to coordinates of points that actually contribute to the path
 * (as opposed to control points, helpers, etc.).
 *
 * TODO: handle Ll, Hh, Vv, Zz, Aa arcs and composite curves Ss and Tt
 *
 * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
 */
function parsePathData(pathData: SVGPathSegment[]): { contributingPoints: Point2D[]; pathTranslated: SVGPathSegment[] } {
  let point = null
  const curvePoints = []
  const pathTranslated = []

  const prevPoint = new Point2D(0, 0)

  for (point of pathData) {
    switch (point.type) {
    case 'M':
      curvePoints.push(new Point2D(point.values[0], point.values[1]))
      pathTranslated.push(point)
      prevPoint.x = point.values[0]
      prevPoint.y = point.values[1]
      break
    case 'm':
      curvePoints.push(new Point2D(point.values[0] + prevPoint.x, point.values[1] + prevPoint.y))
      pathTranslated.push({ ...point, values: [point.values[0] + prevPoint.x, point.values[1] + prevPoint.y] })
      prevPoint.x += point.values[0]
      prevPoint.y += point.values[1]
      break
    case 'Q':
      curvePoints.push(new Point2D(point.values[2], point.values[3]))
      pathTranslated.push(point)
      prevPoint.x = point.values[2]
      prevPoint.y = point.values[3]
      break
    case 'q':
      curvePoints.push(new Point2D(point.values[2] + prevPoint.x, point.values[3] + prevPoint.y))
      pathTranslated.push(
        {
          ...point, values: [
            point.values[0] + prevPoint.x,
            point.values[1] + prevPoint.y,
            point.values[2] + prevPoint.x,
            point.values[3] + prevPoint.y,
          ],
        },
      )
      prevPoint.x += point.values[2]
      prevPoint.y += point.values[3]
      break
    case 'C':
      curvePoints.push(new Point2D(point.values[4], point.values[5]))
      pathTranslated.push(point)
      prevPoint.x = point.values[4]
      prevPoint.y = point.values[5]
      break
    case 'c':
      curvePoints.push(new Point2D(point.values[4] + prevPoint.x, point.values[5] + prevPoint.y))
      pathTranslated.push(
        {
          ...point, values: [
            point.values[0] + prevPoint.x,
            point.values[1] + prevPoint.y,
            point.values[2] + prevPoint.x,
            point.values[3] + prevPoint.y,
            point.values[4] + prevPoint.x,
            point.values[5] + prevPoint.y,
          ],
        },
      )
      prevPoint.x += point.values[4]
      prevPoint.y += point.values[5]
      break
    default:
      break
    }
  }

  return {
    contributingPoints: curvePoints,
    pathTranslated,
  }
}

/**
 * Translate DOM point to SVG.
 *
 * @param {*} svgContext
 * @param {*} domPoint
 * @returns
 */
function translateDomPoint(svgContext: SVGSVGElement, domPoint: Point2D) {
  const svgPoint = svgContext.createSVGPoint()

  svgPoint.x = domPoint.x
  svgPoint.y = domPoint.y

  return svgPoint.matrixTransform(svgContext.getScreenCTM()?.inverse() ?? new SVGMatrix())
}

function getDistanceToPoint(svgPath: SVGPathElement, targetPoint: Point2D) {
  let lastPos = 0
  const { contributingPoints } = parsePathData(svgPath.getPathData({ normalize: true }))

  let currentPoint = new Point2D(contributingPoints[0].x, contributingPoints[0].y)
  let delta = currentPoint.distanceFrom(targetPoint) / 2

  let maxIter = 500

  while (Math.abs(delta) > 0.01 && maxIter-- > 0) {
    const svgPoint = svgPath.getPointAtLength(lastPos + delta)

    currentPoint = new Point2D(svgPoint.x, svgPoint.y)

    lastPos = lastPos + delta
    delta = currentPoint.distanceFrom(targetPoint) * 0.5
  }

  return lastPos + delta
}

export function animate(
  svgViewport: SVGSVGElement,
  svgPath: SVGPathElement,
  animationDefs: BubbleAnimationDef[],
  onCheckpoint: BubbleEventCallback,
  onComplete?: () => void,
) {
  const localAnimationDefs = cloneDeep(animationDefs)

  // *** Compute
  // Get intersections between vertical line and svg in DOM space
  const viewportIntersections = getViewportIntersections(svgViewport)

  // Convert intersections to svg space
  const intersectionsTranslated = viewportIntersections.map((point: Point2D) => translateDomPoint(svgViewport, point))

  if (intersectionsTranslated.length === 0) return

  const intersectionTranslatedX = intersectionsTranslated[0].x

  // Get target svg path data
  const pathData = svgPath.getPathData({ normalize: true })

  // Parse path data
  const { contributingPoints, pathTranslated } = parsePathData(pathData)

  // Get curve draw direction
  const ltr = Math.max(contributingPoints[contributingPoints.length - 1].x, contributingPoints[0].x) === contributingPoints[contributingPoints.length - 1].x

  let adjacentVertexRefs: { start: number; end: number } = ltr ?
    {
      start: 0,
      end: 1,
    }
    :
    {
      start: contributingPoints.length - 1,
      end: contributingPoints.length - 2,
    }

  // Pick relevant points adjacent to the curve/line intersection
  for (const [i, currentPoint] of contributingPoints.entries()) {
    if (i > 0 && // Verify if contributing points wrap the line intersection
      (
        (contributingPoints[i - 1].x <= intersectionTranslatedX && currentPoint.x > intersectionTranslatedX) ||
        (contributingPoints[i - 1].x > intersectionTranslatedX && currentPoint.x <= intersectionTranslatedX)
      )) {
      // If left-to-right, retain any new pair of wrapping points
      if (ltr) adjacentVertexRefs = { start: i - 1, end: i }

      // If right-to-left, only retain the first pair of wrapping points encountered
      if (!ltr && !adjacentVertexRefs) adjacentVertexRefs = { start: i - 1, end: i }
    }
  }

  // To compute the "right" intersection
  // 0. Transform the whole curve into its absolute representation
  let pathIntersection

  // 1. Select the right intersection function according to the curve command
  switch (pathTranslated[adjacentVertexRefs.end].type.toLowerCase()) {
  case 'c':
  // bezier3
    pathIntersection = Intersection.intersectBezier3Line(
      new Point2D(
        contributingPoints[adjacentVertexRefs.start].x,
        contributingPoints[adjacentVertexRefs.start].y,
      ),
      new Point2D(
        pathTranslated[adjacentVertexRefs.end].values[0],
        pathTranslated[adjacentVertexRefs.end].values[1],
      ),
      new Point2D(
        pathTranslated[adjacentVertexRefs.end].values[2],
        pathTranslated[adjacentVertexRefs.end].values[3],
      ),
      new Point2D(
        contributingPoints[adjacentVertexRefs.end].x,
        contributingPoints[adjacentVertexRefs.end].y,
      ),
      new Point2D(intersectionsTranslated[0].x, 0),
      new Point2D(intersectionsTranslated[0].x, svgViewport.viewBox.baseVal.height),
    )
    break
  case 'q':
  // bezier2
    pathIntersection = Intersection.intersectBezier2Line(
      new Point2D(
        contributingPoints[adjacentVertexRefs.start].x,
        contributingPoints[adjacentVertexRefs.start].y,
      ),
      new Point2D(
        pathTranslated[adjacentVertexRefs.end].values[0],
        pathTranslated[adjacentVertexRefs.end].values[1],
      ),
      new Point2D(
        contributingPoints[adjacentVertexRefs.end].x,
        contributingPoints[adjacentVertexRefs.end].y,
      ),
      new Point2D(intersectionsTranslated[0].x, 0),
      new Point2D(intersectionsTranslated[0].x, svgViewport.viewBox.baseVal.height),
    )
    break
  default:
    break
  }

  const distanceToIntersection =
  (typeof pathIntersection?.points === 'undefined' || pathIntersection?.points?.length === 0) ?
    (ltr ? svgPath.getTotalLength() : 0)
    :
    getDistanceToPoint(svgPath, pathIntersection?.points[0])

  const step = 30
  let dashArray = `${svgPath.getTotalLength()}`

  for (let preStep = distanceToIntersection; preStep < svgPath.getTotalLength(); preStep += step * 2) {
    dashArray = `${step / 2},${step},${dashArray}`
  }

  svgPath.setAttribute('stroke-dasharray', dashArray)
  svgPath.setAttribute('stroke-dashoffset', `-${distanceToIntersection}`)

  // Animate
  svgPath.setAttribute('style', 'visibility: visible')

  let currentOffset = distanceToIntersection

  // Chloe   :  1009.17 | 503.99  -> 3790
  // Adam    :  1073.74 | 930.47  -> 3295
  // Georgie :   740.45 | 1172.53 -> 2870
  // Malinda :   458.79 | 1174.18 -> 2585
  // Josh    :   572.60 | 520.48  -> 1820
  // Luke    :   639.54 | 866.89  -> 1320

  function run() {
    currentOffset -= (step * 1.5)
    svgPath.setAttribute('stroke-dashoffset', `-${currentOffset}`)

    dashArray = `${step / 2},${step},${dashArray}`
    svgPath.setAttribute('stroke-dasharray', dashArray)

    const triggerCond = (val: BubbleAnimationDef) => currentOffset < val.trigger

    // Retrieve all the animations that are triggered
    for (const [key, val] of Object.entries(localAnimationDefs)) {
      if (triggerCond(val)){
        // Trigger the relevant callback, with animation parameters
        onCheckpoint(Number(key), val)
        delete localAnimationDefs[Number(key)]
      }
    }

    if (currentOffset - (step * 1.5) > 0) {
      setTimeout(() => window.requestAnimationFrame(run), 16)
    } else {
      if (onComplete) onComplete()
    }
  }

  window.requestAnimationFrame(run)
}
