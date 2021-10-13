import { PureSliceComponent, withSlice } from '../SliceComponent'
import { Richtext, StoryblokComponent, StoryData } from 'storyblok-js-client'
import { getNodeText } from '../../utils/getNodeText'
import renderRichText from '../../utils/richTextResolver'
import toReactStyle from '../../utils/styleTransformer'
import { CustomLink } from '../../components/CustomLink'
import { Anim, TeamBubble } from './Anim'
import { leadingSlashIt } from '../../utils/leadingSlashIt'

import classnames from 'classnames'
import gridStyles from '../../styles/grid.module.scss'
import classes from './TeamCard.module.scss'

export type ContentLink = {
  cached_url: string
}

export type CTAProps = StoryblokComponent<'team_card_cta'> & {
  title: string
  subtitle: string
  link: ContentLink
}

export type TeamCardProps = StoryblokComponent<'team_card'> & {
  heading?: Richtext
  content?: Richtext
  cta?: CTAProps[]
  style?: string
  height?: number
  image_source?: {
    story:  StoryData<StoryblokComponent<'post'> & {
      body: {
        frames: TeamBubble[]
        component: string
      } []
    }>
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TeamCard: PureSliceComponent<TeamCardProps, { settings: any }> = ({ slice }) => {
  const { heading, content, height, style, cta, image_source } = slice

  const richTextHeading = renderRichText(heading)
  const rawTextHeading = getNodeText(richTextHeading)

  const richTextContent = renderRichText(content)
  const rawTextContent = getNodeText(richTextContent)

  const team: TeamBubble[] = image_source?.
    story?.
    content?.
    body?.
    find((subSlice: { component: string }) => {
      const { component } = subSlice

      return component === 'face_gallery'
    })?.
    frames ?? []

  return (
    <div className={classes.wrapper}>
      <Anim team={team} />
      <article
        className={classnames(
          gridStyles['grid-container'],
          classes.teamCard,
        )}
        style={{
          minHeight: `${height}px` ?? 'auto',
          ...toReactStyle(style),
        }}
      >
        <section className={classes['teamCard-panel']}>
          {rawTextHeading ?
            <h2
              className={classes['teamCard-panel__heading']}
              dangerouslySetInnerHTML={{ __html: richTextHeading }}
            /> : null}
          {rawTextContent ?
            <div
              className={classes['teamCard-panel__content']}
              dangerouslySetInnerHTML={{ __html: richTextContent }}
            /> : null}
          {cta && cta.length > 0 ?
            <CustomLink
              variant={'primary'}
              href={leadingSlashIt(cta[0].link.cached_url)}
              underline
              icon
              className={classes['teamCard__link']}
            >{cta[0].title}
            </CustomLink>
            : null}
        </section>
      </article>
    </div>
  )
}

export default withSlice(TeamCard)
