import React from 'react'
import { CustomLink } from '../../../components/CustomLink'
import { Logo } from '../../../components/Logo'
import { getHomepageUrl, SettingsContext } from '../../../contexts/settingsContext'
import classes from '../Footer.module.scss'

export interface ColumnContactProps {
  link_text: string
  link_url: string
}

export const ColumnContact: React.VFC<ColumnContactProps> = (props) => {
  
  const { 
    homepage,
    address_line_1, 
    address_line_2, 
    contact_phone, 
    contact_email,
  } = React.useContext(SettingsContext)

  return (
    <div className={classes['footer__column-contact']}>
      <Logo 
        className={classes['footer__column-contact__logo']}
        href={homepage ? getHomepageUrl(homepage) : '/'}
        title='Atomix Logo'
        inverse
      />
      <div className={classes['footer__column-contact__address']}>
        <p>{address_line_1}</p>
        <p>{address_line_2}</p>
      </div>
      <p>{contact_phone}</p>
      <a href={'mailto:' + contact_email}>{contact_email}</a>
      <div className={classes['footer__column-contact__link']}>
      {props.link_text && (
        <CustomLink variant={'primary'} href={props.link_url} underline icon>
          {props.link_text}
        </CustomLink>
      )}
      </div>
    </div>
  )
}

export default ColumnContact