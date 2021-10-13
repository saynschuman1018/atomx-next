import { Button, ButtonProps } from './index'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'


export default createComponentMeta({ 
  component: Button,
  title: 'Button',
  parameters: {
    layout:'centered',
  },
})

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  'children': 'Primary plus',
  'variant':  'primary',
  'icon': 'plus',
}

export const PrimaryInverse = Template.bind({})
PrimaryInverse.args = {
  'children': 'Primary Inverse plus',
  'variant': 'primary-inverse',
  'icon': 'plus',
}

PrimaryInverse.parameters = {
  backgrounds: {
    default: 'dark',
  },
}

export const PrimaryMinus = Template.bind({})
PrimaryMinus.args = {
  'children': 'Primary Minus',
  'variant': 'primary',
  'icon': 'minus',
} 