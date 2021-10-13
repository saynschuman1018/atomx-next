import { createContext } from 'react'

export type MultiLink = {
  cached_url: string
  url?: string
  linktype: 'story' | 'url'
}

export const getHomepageUrl = (mlink: MultiLink): string => {
  if (mlink != undefined && mlink.url != undefined) {
    let url = mlink.url.length > 0 ? mlink.url : mlink.cached_url
    switch (mlink.linktype) {
      case 'story':
        return `/${url}`
      case 'url':
        return url
    }
  } else {
    return '/'
  }
}

export type SettingsContextType = {
  site_name?: string
  homepage?: MultiLink
  heading?: string
  contact_phone?: string
  contact_email?: string
  address_line_1?: string
  address_line_2?: string
  twitter?: string
  facebook?: string
  instagram?: string
  linkedin?: string
}

export const SettingsContext = createContext<SettingsContextType>({

})