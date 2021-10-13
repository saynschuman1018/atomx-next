import { Args as DefaultArgs } from '@storybook/addons'
import { Meta } from '@storybook/react'
import React from 'react'

export type MetaOrComponent<Args = DefaultArgs, P = Record<string, unknown>> = Meta<Args> | React.ComponentType<P> | React.ExoticComponent

export type BuildMetaFunction = <Args = DefaultArgs, P = Record<string, unknown>>(metaOrComponent: MetaOrComponent<Args, P>) => Meta<Args>

export type GenericBuildMetaFunction = <Args = DefaultArgs, P = Record<string, unknown>>(prefix: string, metaOrComponent: MetaOrComponent<Args, P>, baseMeta?: Meta<Args>) => Meta<Args>
