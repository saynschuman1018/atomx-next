import { BuildMetaFunction } from '../types/buildMetaFunction'
import { createMeta } from './createMeta'

export const createSliceMeta: BuildMetaFunction = (metaOrComponent) => createMeta('Slices', metaOrComponent)