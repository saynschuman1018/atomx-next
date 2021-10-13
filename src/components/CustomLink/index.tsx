import classes from './link.module.scss'
import { RightArrow } from '../icons/RightArrow'
import { Underline } from '../Underline'
import classnames from 'classnames'
import Link from 'next/link'

export type CustomLinkProps = React.ComponentProps<typeof Link> & {
  variant: 'primary' | 'primary-inverse' | 'secondary' | 'default' | 'default-inverse' | 'menu-item'
  href: string
  icon?: boolean
  underline?: boolean
  className?: string
}

export const CustomLink: React.FC<CustomLinkProps> = ({
  variant,
  href,
  icon,
  underline,
  children,
  className,
  ...props
}) => {
  return (
    <Link
      { ...props }
      href={href}
    >
      <a
        className={classnames(className, classes.link, {
          [classes[`link--${variant}`]]: Boolean(variant),
        })}
      >
        {underline ?
          <div className={classes.link__underline}>
            {children}
            <Underline className={classes['link__underline-svg']}/>
          </div>
          : children}
        {icon ?
          <RightArrow
            className={classnames(classes.link, classes['link__icon'], {
              [classes[`link__icon--${variant}`]]: Boolean(variant),
            })}
          />
          : null }
      </a>
    </Link>
  )
}
