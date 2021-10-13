import { createComponentMeta } from '../../utils/createComponentMeta'
import { FlexibleContent } from './FlexibleContent'
import React from 'react'
import { Story } from '@storybook/react'

export default createComponentMeta({
  title: 'Flexible Content',
  component: FlexibleContent,
})

const BoxContent: React.FC<{ square?: boolean }> = ({ square, ...props }) => (
  <div style={Object.assign({
    width: '100%',
    backgroundColor: 'lightgray',
    boxShadow: 'inset 0 0 0 1px gray',
  }, square ? {
    height: 0,
    paddingBottom: '100%',
  } : {
    padding: 20,
  })} { ...props } />
)

export const Contained: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <BoxContent>
          Default (contained) row
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const FullWidth: Story = () => (
  <FlexibleContent>
    <FlexibleContent row fluid>
      <FlexibleContent column>
        <BoxContent>
          Full-width (fluid) row
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

const SixColRow: React.FC = () => (
  <>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
    <FlexibleContent column xs={6} sm={4} md={3} lg={2}>
      <BoxContent square />
    </FlexibleContent>
  </>
)

export const MultipleColumns: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <SixColRow />
    </FlexibleContent>
  </FlexibleContent>
)

export const MultipleRows: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row fluid>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row fluid>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row fluid>
      <SixColRow />
    </FlexibleContent>
    <FlexibleContent row>
      <SixColRow />
    </FlexibleContent>
  </FlexibleContent>
)

export const WiderColumns: Story = () => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <BoxContent>
          Normal
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ left: '1_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -1 left
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ left: '2_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -2 left
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ left: '1_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -1 left
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <BoxContent>
          Normal
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ right: '1_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -1 right
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ right: '2_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -2 right
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ right: '1_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -1 right
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <BoxContent>
          Normal
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ right: '1_col', left: '1_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -1 left, -1 right
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
    <FlexibleContent row overflow={{ right: '2_col', left: '2_col' }}>
      <FlexibleContent column>
        <BoxContent>
          -2 left, -2 right
        </BoxContent>
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)
