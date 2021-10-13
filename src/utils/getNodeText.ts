
import cheerio from 'cheerio'
import { isSsr } from './isSsr'

export const getNodeText = (html: string): string | undefined => {
  if (isSsr()) {
    const $ = cheerio.load(html)

    return $.text()
  }

  const fragment = document.createElement('div')

  fragment.innerHTML = html

  return fragment.textContent ?? undefined
}
