import { DashedList } from './DashedList'
import { Story } from '@storybook/react'
import { createComponentMeta } from '../../utils/createComponentMeta'

export default createComponentMeta(DashedList)

type ListStoryProps = {
  items: { list_item: React.ReactNode } []
}

const DefaultListProps = {
  items: [
    {
      list_item: <strong>Hi there</strong>,
    },
    {
      list_item: <a href="/"> List Item 2 </a>,
    },
    {
      list_item: 'List Item 3',
    },
    {
      list_item: 'List Item 4',
    },
    {
      list_item: 'List Item 5',
    },
  ],
}

const Template: Story<ListStoryProps> = ({ items }) => {
  const listitems = items.map(({ list_item }, index) => {
    const DashedListProps = {
      item: true,
    } 

    return (
      <DashedList key={ index } { ...DashedListProps } >
        { list_item }
      </DashedList>
    )
  })

  return (
    <DashedList item={ false }>
      { listitems }
    </DashedList>
  )
}

export const Default = Template.bind({})
Default.args = DefaultListProps

