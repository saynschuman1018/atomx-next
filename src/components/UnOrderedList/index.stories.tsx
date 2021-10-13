import { UnOrderedList, UnOrderedListProps } from './UnOrderedList'
import { UnOrderedListItemProps } from './UnOrderedListItem'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'
import Link from 'next/link'

export default createComponentMeta({ 
  component: UnOrderedList,
  title: 'UnOrderList',
})

type DataNode = UnOrderedListItemProps & {
  text: string
}

type DataProps = {
  items: DataNode[]
  color?: string
  buttonEnabled?: true
}

const data: DataProps = {
  items: [
    {
      iconCode: 'illuminati',
      text: 'User experience strategy',
      color: 'orange',
    },
    {
      iconCode: 'clover',
      text: 'User Interface creative design',
      color: 'yellow',
    },
    {
      iconCode: 'eyeball',
      text: 'Custom website development (frontend)',
      color: 'green',
      link: true,
    },
    {
      iconCode: 'butterfly',
      text: 'Third-party collaboration',
      color: 'purple',
      link: true,
    },
    {
      iconCode: 'pizza',
      text: 'Lorem Posum tecta alcm',
      color: 'red',
      link: true,
    },
  ],  
}

const dataWithIconButton: DataProps = {
  items: [
    {
      iconCode: 'illuminati',
      text: 'User experience strategy',
      color: 'orange',
    },
    {
      iconCode: 'clover',
      text: 'User Interface creative design',
      color: 'yellow',
    },
    {
      iconCode: 'eyeball',
      text: 'Custom website development (frontend)',
      color: 'green',
      link: true,
    },
    {
      iconCode: 'butterfly',
      text: 'Third-party collaboration',
      color: 'purple',
      link: true,
    },
    {
      iconCode: 'pizza',
      text: 'Lorem Posum tecta alcm',
      color: 'red',
      link: true,
    },
  ],
  buttonEnabled: true,
}

const dataMonoColor: DataProps = {
  items: [
    {
      iconCode: 'illuminati',
      text: 'User experience strategy',
      color: 'orange',
    },
    {
      iconCode: 'clover',
      text: 'User Interface creative design',
      color: 'yellow',
    },
    {
      iconCode: 'eyeball',
      text: 'Custom website development (frontend)',
      color: 'green',
      link: true,
    },
  ],
  color:'green',
}

const Template: Story<DataProps> = ({ items, color, ...args }) => {
  const unorderedListItems = items.map(({ text, ...itemNode }, index) => {
    const listItemProps:UnOrderedListProps = {
      item: true,
      ...itemNode,
    }

    if (color !== undefined) {
      listItemProps.color = color
    }
    
    let child:string|React.ReactNode = (<p style={{ fontWeight: 300, color: '#707070' }}>{text}</p>)

    if (listItemProps.link !== undefined) {
      child = (
        <Link href="#">
          <p>
            <a href="#">
              {text}
            </a>
          </p>
        </Link>
      )
    }

    return (
      <UnOrderedList iconButton={args.buttonEnabled} key={index} {...listItemProps} >
        { child }
      </UnOrderedList>
    )
  })

  return (
    <UnOrderedList>
      { unorderedListItems }
    </UnOrderedList>
  )
}

export const Default = Template.bind({})
Default.args = data

export const withIconButton = Template.bind({})
withIconButton.args = dataWithIconButton

export const Monotone = Template.bind({})
Monotone.args = dataMonoColor
