import { CustomLink, CustomLinkProps } from './index'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'

export default createComponentMeta({ 
  component: CustomLink,
  title: 'Link',
  parameters:{
    layout:'centered',
  },
})

const Template: Story<CustomLinkProps> = args => <CustomLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
  'children': 'Primary',
  'variant': 'primary',
  'icon': true,
  'underline': true,
  'href': '/',
} 

export const PrimaryInverse = Template.bind({})
PrimaryInverse.args = {
  'children': 'Primary Inverse',
  'variant': 'primary-inverse',
  'icon': true,
  'underline': true,
  'href': '/',
}

export const Secondary = Template.bind({})
Secondary.args = {
  'children': 'Secondary',
  'variant': 'secondary',
  'icon': true,
  'underline': false,
  'href': '/',
}

export const Default = Template.bind({})
Default.args = {
  'children': 'Default',
  'variant': 'default',
  'icon': false,
  'underline': false,
  'href': '/',
}

export const DefaultInverse = Template.bind({})
DefaultInverse.args = {
  'children': 'Default Inverse',
  'variant': 'default-inverse',
  'icon': false,
  'underline': false,
  'href': '/',
}

export const MenuItem = Template.bind({})
MenuItem.args = {
  'children': 'Menu item',
  'variant': 'menu-item',
  'icon': false,
  'underline': true,
  'href': '/',
}

const darkBg = {
  backgrounds: {
    default: 'dark',
  },
}

PrimaryInverse.parameters = darkBg
DefaultInverse.parameters = darkBg
