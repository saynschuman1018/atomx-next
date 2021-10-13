import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import React, { SyntheticEvent, useRef } from 'react'
import { Hamburger } from '../icons/Hamburger'
import { HamburgerClose } from '../icons/HamburgerClose'
import { UpArrow } from '../icons/UpArrow'
import { CircleIcon } from '../icons/CircleIcon'
import { CustomLink } from '../CustomLink'

import {
  toggleMobileMenu,
} from '../../store/slices/mobileMenu'
import menuStyles from './MobileMenu.module.scss'
import {
  faPhone,
} from '@fortawesome/pro-regular-svg-icons'

export type MobileMenuProps = {
  data?: any
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ data }) => {
  const dispatch = useDispatch()
  const mobileMenuEl = useRef(null)
  const router = useRouter()
  const linkClassName = menuStyles['mobile-menu__nav--menu--link']

  const showMenu = useSelector((state) => state.mobileMenu.showMenu)

  function handleToggle(event: SyntheticEvent) {
    event.preventDefault()
    dispatch(toggleMobileMenu())
  }
  
  return (
    <>
      <button
        aria-label="Toggle mobile navigation"
        className={menuStyles.nav__toggle}
        onClick={handleToggle}
      >
        {showMenu ? <HamburgerClose /> : <Hamburger />}
      </button>

      {showMenu && (
        <div className={menuStyles['mobile-menu']}>
          <nav 
            className={menuStyles['mobile-menu__nav']}
          >
            <ul className={menuStyles['mobile-menu__nav--menu']} ref={mobileMenuEl}>
              {data && data.map(({ label, href } : Record<string, string>, key: number) => {
                const slug = `/${router.query.slug}`

                return (
                  <li key={key}>
                    <CustomLink
                      variant={'menu-item'}
                      href={href}
                      className={`${linkClassName} ${slug === href ? 'selected' : ''}`}
                      aria-label={label}
                    >
                      {label}
                    </CustomLink>
                  </li>
                )
              })}
            </ul>
            <div className={menuStyles['mobile-menu__nav--contact']}>
              <Link href="tel:1300946160">
                <button aria-label="Contact" className={menuStyles['mobile-menu__nav--contact--link']}>
                  <CircleIcon iconCode={faPhone} />
                </button>
              </Link>
              <div className={menuStyles['mobile-menu__nav--contact--text']}><span>Say hello to us...</span><UpArrow /></div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
