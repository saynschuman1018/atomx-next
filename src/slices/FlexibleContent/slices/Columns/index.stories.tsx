import oneColMock from './mocks/one-col.json'
import twoColMock from './mocks/two-col.json'
import threeColMock from './mocks/three-col.json'
import fourColMock from './mocks/four-col.json'
import twoColWideLeft from './mocks/two-col-wide-left.json'
import twoColWideRight from './mocks/two-col-wide-right.json'
import nestedColumnsMock from './mocks/nested-columns.json'
import { Columns, ColumnsSliceProps } from '.'
import { createSliceMeta } from '../../../../utils/createSliceMeta'
import { Story } from '@storybook/react'
import { FlexibleContent } from '../../../../components/FlexibleContent'

export default createSliceMeta({
  title: 'Columns',
  component: Columns,
})

const Template: Story<ColumnsSliceProps> = (slice) => (
  <FlexibleContent>
    <FlexibleContent row>
      <FlexibleContent column>
        <Columns slice={slice} />
      </FlexibleContent>
    </FlexibleContent>
  </FlexibleContent>
)

export const OneColumn = Template.bind({})
OneColumn.args = oneColMock as unknown as ColumnsSliceProps

export const TwoColumn = Template.bind({})
TwoColumn.args = twoColMock as unknown as ColumnsSliceProps

export const ThreeColumn = Template.bind({})
ThreeColumn.args = threeColMock as unknown as ColumnsSliceProps

export const FourColumn = Template.bind({})
FourColumn.args = fourColMock as unknown as ColumnsSliceProps

export const TwoColumnWiderLeft = Template.bind({})
TwoColumnWiderLeft.args = twoColWideLeft as unknown as ColumnsSliceProps

export const TwoColumnWiderRight = Template.bind({})
TwoColumnWiderRight.args = twoColWideRight as unknown as ColumnsSliceProps

export const NestedColumns = Template.bind({})
NestedColumns.args = nestedColumnsMock as unknown as ColumnsSliceProps
