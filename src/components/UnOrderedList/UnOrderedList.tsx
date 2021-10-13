import { UnOrderedListItemProps, UnOrderedListItem } from './UnOrderedListItem'

export type UnOrderedListWrapperProps = React.ComponentProps<'ul'> & {
}

export type UnOrderedListProps =
  | { item: true } & UnOrderedListItemProps
  | { item?: false } & UnOrderedListWrapperProps

export const UnOrderedList: React.FC<UnOrderedListProps> = ({ item = false, ...props }) => {
  if (item) {
    return (
      <UnOrderedListItem { ...props } />
    )
  }

  return (
    <ul { ...props } />
  )
}
