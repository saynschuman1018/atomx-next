import React from 'react'

export type ListItemProps = React.ComponentProps<'li'> & {
    //
}

export const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <li { ...props } />
  )
}