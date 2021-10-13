import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import SeoCard from '../slices/SeoCard'
import StoryblokService from '../utils/storyblokService'

const Index = ({ doc, destination } : { doc: any; destination : string }) => {
  const head = doc?.data?.story?.content?.head

  if (destination && typeof window !== 'undefined') {
    const router = useRouter()

    router.replace(destination)

    return (head && head.length > 0 ?
      <SeoCard slice={head[0]} />
      :
      null)
  }

  console.warn('Please make sure to define a homepage in your website settings.' )

  return null
}

export const getStaticProps: GetStaticProps = async () => {
  const settings = await StoryblokService.getDocumentBySlug('settings')
  const homepage = settings?.data?.story?.content?.homepage
  const slug = homepage.cached_url ?? homepage.url
  const doc = await StoryblokService.getDocumentBySlug(slug)
  const destination = `/${slug}`

  const payload: {
    props: Record<string, unknown>
    redirect?: Record<string, unknown>
  } = {
    props: {
      doc,
    },
  }

  if (homepage) {
    payload.props.destination = destination

    if(process.env['NODE_ENV'] !== 'production') {
      payload.redirect = {
        destination,
        permanent: false,
      }
    }
  }

  return payload
}

export default Index
