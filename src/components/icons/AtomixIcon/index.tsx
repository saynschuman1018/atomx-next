import React from 'react'
import { Brush } from './Brush'
import { Cog } from './Cog'
import { Hand } from './Hand'
import { LightBulb } from './LightBulb'
import { Egg } from './Egg'
import { Butterfly } from './Butterfly'
import { Clover } from './Clover'
import { Illuminati } from './Illuminati'
import { Eyeball } from './Eyeball'
import { Addition } from './Addition'
import { ArrowCircle } from './ArrowCircle'
import { NestedCircles } from './NestedCircles'
import { Pizza } from './Pizza'
import { PizzaNoToppings } from './PizzaNoToppings'
import { Pouch } from './Pouch'
import { Spiral } from './Spiral'
import { UpArrow } from './UpArrow'
import { IconComponent } from './iconComponentType'

//Mapping of iconCode to Icon Function Component
type AtomixIconMap = Record<string, IconComponent>

export const atomixIconMap: AtomixIconMap = {
  'addition': Addition,
  'arrowcircle': ArrowCircle,
  'brush': Brush,
  'butterfly': Butterfly,
  'clover': Clover,
  'cog': Cog,
  'egg': Egg,
  'eyeball': Eyeball,
  'hand': Hand,
  'illuminati': Illuminati,
  'lightbulb': LightBulb,
  'nestedcircles': NestedCircles,
  'pizza': Pizza,
  'pizzanotoppings': PizzaNoToppings,
  'pouch': Pouch,
  'spiral': Spiral,
  'uparrow': UpArrow,
} as const

export type IconCodeType = keyof typeof atomixIconMap

export type AtomixIconProps = React.ComponentProps<IconComponent> & {
  iconCode: IconCodeType
}

const AtomixIcon: React.FC<AtomixIconProps> = ({ iconCode , ...props }) => {
  const Icon = atomixIconMap[iconCode]

  return <Icon { ...props } />
}

export default AtomixIcon

export {
  Addition, ArrowCircle, Brush, Butterfly, Clover, Cog,
  Egg, Eyeball, Hand, Illuminati, LightBulb, NestedCircles,
  Pizza, PizzaNoToppings, Pouch, Spiral, UpArrow,
}
