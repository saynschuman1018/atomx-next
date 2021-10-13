import React from 'react'
import classes from './unorderedlist.module.scss'
import classnames from 'classnames'
import AtomixIcon, { IconCodeType } from '../icons/AtomixIcon'
import classNames from 'classnames'

export type UnOrderedListItemProps = {
  iconCode?: IconCodeType
  color?: string
  link?:  boolean // if true, the styling will change accordingly
  iconButton?: boolean //if define true, the icon will become button
}

export const UnOrderedListItem: React.FC<UnOrderedListItemProps> = ({
  children,
  link,
  iconCode = 'butterfly',
  color = 'green',
  iconButton = false,
}) => {
  const classNameString = (iconButton) ? 'list-item-button' : 'list-item'

  // Icon in front of text 
  const iconPrefix = (
    <div
      className={
        classNames(
          classes[`${classNameString}__icon-wrapper`],
        )
      }
    >
      {iconButton && <AtomixIcon
        iconCode="egg"
        className={
          classnames(
            classes[`${classNameString}__circle`],
            {
              [classes[`${classNameString}__circle--link-${color}`]]: link && Boolean(color),
              [classes[`${classNameString}__circle--link`]]: link,
            },
          )
        }
      >
      </AtomixIcon>}
      <span
        className={
          classnames(
            classes[`${classNameString}__icon`],
            {
              [classes[`${classNameString}__icon--${color}`]]: color,
              [classes[`${classNameString}__icon--link`]]: link,
            },
          )
        }
      >
        <AtomixIcon iconCode={iconCode} className={classes['list-item__svg']} />
      </span>
    </div>
  )

  return (
    <li
      className={
        classnames(
          classes[classNameString],
          { [classes[`${classNameString}--link`]]: link },
        )
      }
    >
      { iconPrefix }
      <span
        className={
          classnames(
            classes[`${classNameString}__content`],
            {
              [classes[`${classNameString}__content--link`]]: link,
              [classes[`${classNameString}__content--link-${color}`]]: Boolean(color),
            },
          )
        }
      >
        { children }
      </span>
    </li>
  )
}
