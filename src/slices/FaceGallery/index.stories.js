import Component from './index'
import mocks from './mocks.json'
import { storiesOf } from '@storybook/react'

for (const variation of mocks) {
  storiesOf(Component.name, Component).add(variation.name, () => <Component slice={variation} />)
}
