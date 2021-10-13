import hamburgerCloseStyles from './HamburgerClose.module.scss'

export type HamburgerCloseProps = {
  className?: string
}

export const HamburgerClose: React.FC<HamburgerCloseProps> = ({
  className,
}) => (
  <svg
    viewBox="0 0 42.313 42.468"
    className={`${hamburgerCloseStyles.icon ?? ''} ${className ?? ''}`}
  >
    <g id="Group_2901" data-name="Group 2901" transform="translate(-319.931 -11.558)">
      <path id="Path_6472" data-name="Path 6472" d="M26.184,27.731a15.984,15.984,0,0,0,2.559-3.021c2.1-3.977,2.977-8.227,1.937-11.91C29.021,6.926,25.133,1.3,18.809.227A17.954,17.954,0,0,0,5.116,3.77C1.107,6.734-.61,12.174.193,17.9a16.63,16.63,0,0,0,3.676,7.25,21.316,21.316,0,0,0,2.149,2.168C11.755,31.253,19.98,32.128,26.184,27.731Z" transform="translate(362.244 27.353) rotate(121)" className={hamburgerCloseStyles.icon__background} />
      <g id="Group_2902" data-name="Group 2902" transform="translate(452.965 -170.775) rotate(90)">
        <path id="Path_5147" data-name="Path 5147" d="M193.787,153.514c7.7-8.043,2.875-3.2,5.84-6.2,1.443-1.464,2.1-1.966,3.587-3.392,1.569-1.5,1.591-1.172,3.14-2.681a.4.4,0,0,0-.458-.63h0c-1.854,1.071-1.883,1.062-3.672,2.249a18.394,18.394,0,0,0-3.035,2.427c-3.225,2.8-6.184,6.465-6.184,7.583S193.787,153.514,193.787,153.514Z" transform="translate(3.83 -34.91)" className={hamburgerCloseStyles.icon__path} strokeWidth="1"/>
      </g>
      <g id="Group_2903" data-name="Group 2903" transform="translate(137.216 -79.389)">
        <path id="Path_5147-2" data-name="Path 5147" d="M193.787,153.514c7.7-8.043,2.875-3.2,5.84-6.2,1.443-1.464,2.1-1.966,3.587-3.392,1.569-1.5,1.591-1.172,3.14-2.681a.4.4,0,0,0-.458-.63h0c-1.854,1.071-1.883,1.062-3.672,2.249a18.394,18.394,0,0,0-3.035,2.427c-3.225,2.8-6.184,6.465-6.184,7.583S193.787,153.514,193.787,153.514Z" transform="translate(3.83 -34.91)" className={hamburgerCloseStyles.icon__path} strokeWidth="1"/>
      </g>
    </g>
  </svg>
)

  