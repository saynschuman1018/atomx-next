import circleIconStyles from './CircleIcon.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'

export type CircleIconProps = {
  iconCode: IconDefinition
}

export const CircleIcon: React.FC<CircleIconProps> = ({
  iconCode,
}) => (
  <>
    <svg
      viewBox="0 0 51.375 51.442"
      className={circleIconStyles.icon__bg}
    >
      <g id="Group_2426" data-name="Group 2426" transform="translate(50.906 99.411) rotate(-154)" opacity="0.17">
        <path id="Path_862" data-name="Path 862" d="M28.454,37.17a19.676,19.676,0,0,0,4-2.884,20.5,20.5,0,0,0,5.917-13.813C38.132,12.878,35.12,4.918,27.8,1.721a22.374,22.374,0,0,0-17.611.172C4.452,4.272.749,10.331,0,17.487a20.739,20.739,0,0,0,2.265,9.865,26.4,26.4,0,0,0,1.947,3.264C9.966,37.1,19.638,40.62,28.454,37.17Z" transform="translate(35.783 35.918)" fill="#fff"/>
      </g>
    </svg>
    <FontAwesomeIcon
      className={circleIconStyles.icon}
      icon={iconCode}
    />
  </>
)
