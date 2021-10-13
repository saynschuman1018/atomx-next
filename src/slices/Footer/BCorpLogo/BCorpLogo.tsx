import React from 'react'
import Image from 'next/image'
import classes from './BCorpLogo.module.scss'
import bCorpLogo from './images/b-corp-logo.png'
import bCorpLogoSmall from './images/b-corp-logo-small.png'
import { getBreakpoint, useMediaQuery } from '../../../hooks/useMediaQuery';
import { ColumnSocialProps } from '../Columns/ColumnSocial';

export const BCorpLogo: React.VFC<ColumnSocialProps> = ({bcorp_url, ...props}) => {

  const query = '(min-width: ' + getBreakpoint('sm') + 'px)'

  if (useMediaQuery(query)) {
    return (
      <a target="_blank" rel="noreferrer" { ...props } href={bcorp_url}>
        <div className={classes['footer-bcorp-logo']}>
          <Image alt='B Corporation Logo' src={bCorpLogo} />
        </div>
      </a>
    )
  } else {
    return (
      <a target="_blank" rel="noreferrer" { ...props } href={bcorp_url}>
        <div className={classes['footer-bcorp-logo--small']}>
          <Image alt='B Corporation Logo' src={bCorpLogoSmall} />
        </div>
      </a>
    )
  }
}

export default BCorpLogo