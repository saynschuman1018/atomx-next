import { BuildMetaFunction } from '../types/buildMetaFunction'
import { createMeta } from './createMeta'

export const createPageMeta: BuildMetaFunction = (metaOrComponent) => createMeta('Pages', metaOrComponent)
