import React from 'react'
import classes from './orderedlist.module.scss'
import classnames from 'classnames'

export type OrderedListItemProps = {
  order?: number
  color?: string
  link?: boolean
}

export const OrderedListItem: React.FC<OrderedListItemProps> = ({
  order,
  children,
  link,
  color = 'green',
}) => {
  return (
    <li className={classes['list-item']}>
      <span
        className={
          classnames(
            classes['list-item__order'],
            {
              [classes[`list-item__order--${color}`]]: Boolean(color),
              [classes['list-item__order--link']]: link,
            },
          )
        }
      >
        { order }
      </span>
      <span className={classnames(
        classes['list-item__content'],
        {
          [classes['list-item__content--link']]: link,
          [classes[`list-item__content--link-${color}`]]: Boolean(color),
        },
      )}>
        { children }
      </span>
    </li>
  )
}
