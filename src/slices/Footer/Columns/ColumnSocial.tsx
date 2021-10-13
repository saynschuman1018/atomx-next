import React from 'react'
import { faFacebookF, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SettingsContext } from '../../../contexts/settingsContext'
import BCorpLogo from '../BCorpLogo/BCorpLogo'
import classes from '../Footer.module.scss'

export interface ColumnSocialProps {
  bcorp_url: string
}

export const ColumnSocial: React.VFC<ColumnSocialProps> = (props) => {

  const { 
    facebook, 
    linkedin, 
    instagram, 
    twitter 
  } = React.useContext(SettingsContext)

  return (
    <div className={classes['footer__column-social']}>
      <div className={classes['footer__column-social__icons']}> 
        <a target="_blank" rel="noreferrer" href={facebook}><FontAwesomeIcon icon={faFacebookF} /></a>   
        <a target="_blank" rel="noreferrer" href={instagram}><FontAwesomeIcon icon={faInstagram} /></a>
        <a target="_blank" rel="noreferrer" href={linkedin}><FontAwesomeIcon icon={faLinkedinIn} /></a>
        <a target="_blank" rel="noreferrer" href={twitter}><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
      <BCorpLogo bcorp_url={props.bcorp_url} />
    </div>
  )
}

export default ColumnSocial