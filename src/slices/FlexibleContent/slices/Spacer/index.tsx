import { FlexibleContentSlice } from '../index'
import classes from './spacer.module.scss'
import classnames from 'classnames'
import { withSlice } from '../../../SliceComponent'
import { FlexibleContent } from '../../../../components/FlexibleContent'

export type SpacerProps = {
  hr?: boolean
  small?: boolean
}

export const Spacer: FlexibleContentSlice<'spacer', SpacerProps> = ({ slice }) => {
  const { hr, small } = slice

  return (
    <FlexibleContent column>
      <div className={classnames(classes.spacer, {
        [classes['spacer--hr']]: hr,
        [classes['spacer--empty']]: !hr,
        [classes['spacer--small']]: small,
      })}>
        {hr && (
          <hr className={classnames(classes.hr, {
            [classes['hr--small']]: small,
          })} />
        )}
      </div>
    </FlexibleContent>
  )
}

export default withSlice(Spacer)