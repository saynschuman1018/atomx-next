import { useEffect, useState } from 'react'
import SbEditable, { SbEditableContent } from 'storyblok-react'
import { Header } from '../../components/Header'
import { Logo } from '../../components/Logo'
import { Menu } from '../../components/Menu'
import { MobileMenu } from '../../components/MobileMenu'

import headerStyles from './HeaderContainer.module.scss'

type Props = {
  slice: SbEditableContent
}

type menuLink = Record<string, string>

function formatMenu(links: any) {
  const menu: menuLink[] = []

  for (const entry of links) {
    const url = entry.link.url.length > 0 ? entry.link.url : entry.link.cached_url

    switch(entry.link.linktype.toLowerCase()) {
    case 'story':
      menu.push({
        label: entry.label,
        href: `/${url}`,
      })
      break
    case 'url':
      menu.push({
        label: entry.label,
        href: url,
      })
      break
    default:
      break
    }
  }
  
  return menu
}

const HeaderContainer = ({
  slice,
} : Props) => {
  const [menu, setMenu] : [menuLink[] | undefined, any] = useState()

  useEffect(() => {
    setMenu(formatMenu(slice.nav))
  }, [slice])

  return (
    <SbEditable content={slice}>
      <Header>
        <Logo 
          className={headerStyles.title} 
          href="/home"
          title="Home"
          // inverse
        />
        <Menu data={menu} />
        <MobileMenu data={menu} />
      </Header>
    </SbEditable>
  )
}

export default HeaderContainer
