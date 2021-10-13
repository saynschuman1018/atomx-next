import { OrderedListItemProps, OrderedListItem } from './OrderedListItem'

export type OrderedListWrapperProps = React.ComponentProps<'ol'> & {
}

export type OrderedListProps =
  | { item: true } & OrderedListItemProps
  | { item?: false } & OrderedListWrapperProps

export const OrderedList: React.FC<OrderedListProps> = ({ item = false, ...props }) => {
  if (item) {
    return (
      <OrderedListItem { ...props } />
    )
  }

  return (
    <ol { ...props } />
  )
}
