import { OrderedList, OrderedListProps } from './OrderedList'
import { OrderedListItemProps } from './OrderedListItem'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'
import Link from 'next/link'

export default createComponentMeta({ 
  component: OrderedList,
  title: 'OrderList',
})

type DataNode = OrderedListItemProps & {
  text: string
}

type DataProps = {
  items: DataNode[]
  color?: string
}

const data: DataProps = {
  items: [
    {
      order: 1,
      text: 'User experience strategy',
      color: 'orange',
    },
    {
      order: 2,
      text: 'User Interface creative design',
      color: 'yellow',
    },
    {
      order: 3,
      text: 'Custom website development (frontend)',
      color: 'green',
      link: true,
    },
    {
      order: 4,
      text: 'Third-party collaboration',
      color: 'purple',
      link: true,
    },
  ],  
}

const dataMonoColor: DataProps = {
  items: [
    {
      order: 1,
      text: 'User experience strategy',
      color: 'orange',
    },
    {
      order: 2,
      text: 'User Interface creative design',
      color: 'yellow',
    },
    {
      order: 3,
      text: 'Custom website development (frontend)',
      color: 'green',
      link: true,
    },
    {
      order: 4,
      text: 'Third-party collaboration',
      color: 'purple',
      link: true,
    },
  ],
  color: 'red',
}

const Template: Story<DataProps> = ({ items, color }) => {
  const unorderedListItems = items.map(({ text, ...itemNode }, index) => {
    const listItemProps:OrderedListProps = {
      item: true,
      ...itemNode,
    }

    if (color !== undefined) {
      listItemProps.color = color
    }

    let child:string|React.ReactNode = text

    if (listItemProps.link !== undefined) {
      child = (
        <Link href="/">
          <a href="/">
            {text}
          </a>
        </Link>
      )
    }

    return (
      <OrderedList key={index} {...listItemProps} >
        { child }
      </OrderedList>
    )
  })

  return (
    <OrderedList>
      { unorderedListItems }
    </OrderedList>
  )
}

export const Default = Template.bind({})
Default.args = data

export const Monotone = Template.bind({})
Monotone.args = dataMonoColor
