import { reactRenderRichText } from '../../components/RichTextRenderer/reactRichTextResolver'
import { StoryblokComponent } from 'storyblok-js-client'
import { useState } from 'react'
import classes from './TwoColCollapsable.module.scss'
import { Button } from '../../components/Button'
import { PureSliceComponent, withSlice } from '../SliceComponent'
import { Richtext } from 'storyblok-js-client'
import classnames from 'classnames'
import { Grid } from '../../components/Grid'

export type TwoColCollapsableProps = StoryblokComponent<'two_col_collapsable'> & {
  left_col_title?: string
  left_col_paragraph?: Richtext
  right_col_paragraph?: Richtext
}

export const TwoColCollapsable: PureSliceComponent<TwoColCollapsableProps> = ({ slice }) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    return collapsed ? setCollapsed(false) : setCollapsed(true)
  }

  return (
    <Grid container as={'section'}
      className={classnames(classes['two-col-collapsable'])}
    >
      <Grid row
        className={classnames(classes['two-col-collapsable__columns'],{
          [classes['two-col-collapsable__columns--revealed']]: Boolean(!collapsed),
        })} 
      >
        <Grid item className={classes['two-col-collapsable__columns-left']} xs={12} md={6}>
          {slice.left_col_title ?
            <h2>{slice.left_col_title}</h2> : null}
          {slice.left_col_paragraph ?
            <section>
              { reactRenderRichText(slice.left_col_paragraph) }
            </section> : null}
        </Grid>
        <Grid item className={classes['two-col-collapsable__columns-right']} xs={12} md={6}>
          {slice.right_col_paragraph ?
            <section>
              { reactRenderRichText(slice.right_col_paragraph) }
            </section> : null}
        </Grid>
      </Grid>
      <Grid row>
        <Grid item className={classes['two-col-collapsable__show-more']}>
          <Button
            icon={collapsed ? 'plus' : 'minus'}
            variant={'primary'}
            onClick={() => toggleCollapse()}
          >
            {collapsed ? 'Read more' : 'Read less'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withSlice(TwoColCollapsable)
