import { createComponentMeta } from '../../utils/createComponentMeta'
import { Accordion } from './Accordion'
import { Story } from '@storybook/react'
import { AccordionPanel, AccordionPanelProps } from './AccordionPanel'
import { AccordionPanelTitle } from './AccordionPanelTitle'
import { AccordionPanelContent } from './AccordionPanelContent'
import { FlexibleContent } from '../FlexibleContent'
import React from 'react'
import { Grid } from '../Grid'

export default createComponentMeta(Accordion)

const ExamplePanel: React.FC<AccordionPanelProps> = (props) => (
  <AccordionPanel { ...props }>
    <Accordion title>
      Accordion content here lorem ipsom donor sit amet
    </Accordion>
    <Accordion content>
      <h4>
        Where will the gas wells will be located?
      </h4>
      <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
        Vivamus suscipit tortor eget felis porttitor volutpat. Donec sollicitudin molestie malesuada.
      </p>
      <p>
        Sed porttitor lectus nibh. Proin eget tortor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet
      </p>
    </Accordion>
  </AccordionPanel>
)

export const Basic: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Accordion>
          <Accordion panel i={0}>
            <Accordion title>
              This is a title
            </Accordion>
            <Accordion content>
              This is some content
            </Accordion>
          </Accordion>
        </Accordion>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const SeparateComponents: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Accordion>
          <AccordionPanel i={0}>
            <AccordionPanelTitle>
              This is a title
            </AccordionPanelTitle>
            <AccordionPanelContent>
              This is some content
            </AccordionPanelContent>
          </AccordionPanel>
        </Accordion>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const SinglePanelOpen: Story<{ count: number }> = ({ count = 3 }) => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Accordion>
          {Array.from({ length: count }).map((_, i) => (
            <ExamplePanel i={i} key={i} />
          ))}
        </Accordion>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const MultiplePanelOpen: Story<{ count: number }> = ({ count = 3 }) => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Accordion multiple>
          {Array.from({ length: count }).map((_, i) => (
            <ExamplePanel i={i} key={i} />
          ))}
        </Accordion>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const VariousContentOptions: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Accordion>
          <Accordion panel i={0}>
            <Accordion title>
              Constrained
            </Accordion>
            <Accordion content as={FlexibleContent} container>
              <FlexibleContent row>
                <FlexibleContent column lg={8} center>
                  This is some constrained (center) content
                </FlexibleContent>
              </FlexibleContent>
            </Accordion>
          </Accordion>
          <Accordion panel i={1}>
            <Accordion title>
              Multiple Columns
            </Accordion>
            <Accordion content as={FlexibleContent} container>
              <FlexibleContent row>
                <FlexibleContent column xs={12} lg={6}>
                  This is a left column
                </FlexibleContent>
                <FlexibleContent column xs={12} lg={6}>
                  This is a right column
                </FlexibleContent>
              </FlexibleContent>
            </Accordion>
          </Accordion>
          <Grid row>
            <Grid item md={8} center>
              <Accordion panel i={2}>
                <Accordion title>
                  Inside another container
                </Accordion>
                <Accordion content>
                  With content
                </Accordion>
              </Accordion>
            </Grid>
          </Grid>
        </Accordion>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)