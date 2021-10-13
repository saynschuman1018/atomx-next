import classes from './dashedlist.module.scss'
import { ListItemProps, ListItem } from './ListItem'

export type DashedListWrapperProps = React.ComponentProps<'ul'> & {
    //
}

export type DashedListProps = 
  | { item: true } & ListItemProps
  | { item?: false } & DashedListWrapperProps

export const DashedList: React.FC<DashedListProps> = ({
  item,
  ...props
}) => {
  if (item) {
    return <ListItem { ...props as ListItemProps } />
  }
  
  return (
    <ul className={ classes.dashed_ul } { ...props as DashedListWrapperProps } />
  )
}