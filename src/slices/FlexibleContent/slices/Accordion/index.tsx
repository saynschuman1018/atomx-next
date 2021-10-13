import { StoryblokComponent } from 'storyblok-js-client'
import { Accordion } from '../../../../components/Accordion'
import { FlexibleContent } from '../../../../components/FlexibleContent'
import Columns, { ColumnsSliceProps } from '../Columns'
import { GridSizes } from '../../../../components/Grid/Grid'
import classnames from 'classnames'
import accordionClasses from './Accordion.module.scss'
import { FlexibleContentSlice } from '../index'
import { withSlice } from '../../../SliceComponent'

export type AccordionProps = {
  panels: Array<AccordionPanelProps>
  constrained: boolean
  alignment?: '' | 'centre' | 'left' | 'right'
}

export type AccordionPanelProps = StoryblokComponent<'accordion_panel'> & {
  title: string
  content: Array<ColumnsSliceProps>
}

export const AccordionSlice: FlexibleContentSlice<'accordion', AccordionProps> = ({ slice, ...props }) => {
  const { panels, constrained, alignment } = slice
  const sizes: Partial<GridSizes> = {}
  const classes = []

  if (constrained) {
    sizes.md = 10
    sizes.lg = 9
    sizes.xl = 8

    switch (alignment) {
    case 'centre':
      classes.push(accordionClasses['constrained--center'])
      break
    case 'left':
      classes.push(accordionClasses['constrained--left'])
      break
    case 'right':
      classes.push(accordionClasses['constrained--right'])
      break
    }
  }

  return (
    <FlexibleContent column { ...sizes } className={classnames(classes)}>
      <Accordion>
        {panels.map(({ title, content, _uid }, i) => {
          return (
            <Accordion panel key={_uid} i={i}>
              <Accordion title>
                {title}
              </Accordion>
              <Accordion content as={FlexibleContent} container>
                {content.map((slice) => (
                  <FlexibleContent row key={slice._uid}>
                    <Columns slice={slice} />
                  </FlexibleContent>
                ))}
              </Accordion>
            </Accordion>
          )
        })}
      </Accordion>
    </FlexibleContent>
  )
}

export default withSlice(AccordionSlice)