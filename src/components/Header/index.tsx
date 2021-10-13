import React from 'react'
import headerStyles from './Header.module.scss'

export type HeaderProps = {
  //
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className={headerStyles.header}>
      {children}
    </header>
  )
}
