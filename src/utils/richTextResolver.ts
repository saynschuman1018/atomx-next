import RichTextResolver from 'storyblok-js-client/dist/es5/rich-text-resolver.cjs'

const richTextResolver = new RichTextResolver()

const renderRichText = (data: any) => richTextResolver.render(data)

export default renderRichText
