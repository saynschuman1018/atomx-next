import { BuildMetaFunction } from '../types/buildMetaFunction'
import { createMeta } from './createMeta'

export const createComponentMeta: BuildMetaFunction = (componentOrMeta) => createMeta('Components', componentOrMeta)