import classes from './button.module.scss'
import { Plus } from '../icons/Plus'
import { Underline } from '../Underline'
import classnames from 'classnames'

export type ButtonProps = React.ComponentProps<'button'> & {
  variant: 'primary' | 'primary-inverse'
  icon: 'minus' | 'plus'
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant,
  icon,
  ...props
}) => {
  return (
    <button
      { ...props }
      className={classnames(className, classes.button, [classes[`button--${variant}`]],
      )}
    >
      <div
        className={classes.button__inner}
      >
        {children}
        <Underline
          className={classes.button__underline}
        />
      </div>
      <Plus
        className={classnames(classes['button__icon'], [classes[`button__icon--${icon}`]])}
      />
    </button>
  )
}

