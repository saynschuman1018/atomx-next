import Head from 'next/head'
import { SbEditableContent } from 'storyblok-react'

type Props = {
  slice: SbEditableContent
}

const SeoCard = ({
  slice,
} : Props) => (
  <Head>
    {slice.title?.length > 0 ? <title>{slice.title}</title> : null}
    {slice.keywords?.length > 0 ?
      <meta name="keywords" content={slice.keywords} key="seo_keywords" />
      :
      null}
    {slice.description ?
      <meta name="description" content={slice.description} key="seo_description" />
      :
      null}
    {slice.rel_canonical?.length > 0 ? <link rel="canonical" href={slice.rel_canonical} /> : null}
    {slice.og_title?.length > 0 || slice?.title?.length > 0 ?
      <meta
        property="og:title"
        content={slice.og_title?.length > 0 ? slice.og_title : slice.title}
        key="og_title"
      />
      :
      null}
    {slice.og_type ? <meta property="og:type" content={slice.og_type} key="og_type" /> : null}
    {slice.og_url?.length > 0 || slice.rel_canonical?.length > 0 ?
      <meta
        property="og:url"
        content={slice.og_url?.length > 0 ? slice.og_url : slice.rel_canonical}
        key="og_url"
      />
      :
      null}
    {slice.og_image?.id ?
      <meta property="og:image" content={slice.og_image?.filename} key="og_image" />
      :
      null}
    {slice.og_description?.length > 0 || slice.description.length > 0 ? <meta
      property="og:description"
      content={slice.og_description?.length > 0 ? slice.og_description : slice.description}
      key="og_description"
    />
      :
      null}
  </Head>
)

export default SeoCard
