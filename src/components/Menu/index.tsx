import { useRouter } from 'next/router'
import React from 'react'
import { CustomLink } from '../CustomLink'
import menuStyles from './Menu.module.scss'

export type MenuProps = {
  data?: any
}

export const Menu: React.FC<MenuProps> = ({ data }) => {
  const router = useRouter()
  
  return (
    <>
      <nav 
        className={menuStyles.nav}
      >
        <ul className={menuStyles.nav__menu}>
          {data && data.map(({ label, href } : Record<string, string>, key: number) => {
            return (
              <li key={key}>
                <CustomLink
                  variant={'menu-item'}
                  href={href}
                  underline={router.asPath === href}
                >
                  {label}
                </CustomLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
