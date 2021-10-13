import { GenericBuildMetaFunction } from '../types/buildMetaFunction'
import { isExoticComponent, isNamedExoticComponent, isReactComponent } from './isReactComponent'

export const createMeta: GenericBuildMetaFunction = (prefix, componentOrMeta, baseMeta) => {
  if (isReactComponent(componentOrMeta) || isExoticComponent(componentOrMeta)) {
    let title = ''

    if (isReactComponent(componentOrMeta)) {
      title = `${prefix}/${componentOrMeta.displayName || componentOrMeta.name}`
    }

    if (isNamedExoticComponent(componentOrMeta)) {
      title = `${prefix}/${componentOrMeta.displayName}`
    }

    return {
      ...baseMeta,
      title,
      component: componentOrMeta,
    }
  } else {
    // @ts-ignore
    const { title, ...meta } = componentOrMeta

    return {
      title: `${prefix}/${title}`,
      ...meta,
    }
  }
}
