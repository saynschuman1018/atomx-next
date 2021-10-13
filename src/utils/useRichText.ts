import { Richtext } from 'storyblok-js-client'
import richTextResolver from './richTextResolver'

export type RichTextContent = {
  content: Richtext
}

type DangerousInnerHTMLProps = {
  dangerouslySetInnerHTML: {
    __html: string
  }
}

export const useRichText = (data: RichTextContent): DangerousInnerHTMLProps => ({
  dangerouslySetInnerHTML: {
    __html: richTextResolver(data),
  },
})