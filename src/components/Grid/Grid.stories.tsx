import { createComponentMeta } from '../../utils/createComponentMeta'
import { Grid, GridProps } from './Grid'
import { Story } from '@storybook/react'
import { OverridableComponentProps } from '../../utils/overridableComponent'

export default createComponentMeta(Grid)

const Template: Story<OverridableComponentProps<GridProps>> = (props) => <Grid { ...props } />

export const Basic = Template.bind({})
Basic.args = {
  children: 'This is a test',
}

export const Container = Template.bind({})
Container.args = {
  container: true,
  children: 'This is a container',
}

export const GridItem = Template.bind({})
GridItem.args = {
  item: true,
  children: 'This is a item',
  style: {
    backgroundColor: 'red',
  },
}

export const OneColumn: Story = () => (
  <Grid container>
    <Grid row>
      <Grid item>
        <div style={{ background: 'lightgray', width: '100%', padding: 20 }}>
          This is a column!
        </div>
      </Grid>
    </Grid>
  </Grid>
)

export const ExampleBasic: Story = () => (
  <Grid container as={'section'}>
    <Grid row>
      <Grid item>
        <div style={{ background: 'red', width: '100%' }}>
          This is a left column
        </div>
      </Grid>
      <Grid item>
        <div style={{ background: 'green', width: '100%' }}>
          This is a right column
        </div>
      </Grid>
    </Grid>
  </Grid>
)

export const ExampleNested: Story = () => (
  <Grid container as={'section'}>
    <Grid row>
      <Grid item>
        <Grid row>
          <Grid item>
            <div style={{ background: 'red', width: '100%' }}>
              This is a left 25% column
            </div>
          </Grid>
          <Grid item>
            <div style={{ background: 'blue', width: '100%' }}>
              This is a right 25% column
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <div style={{ background: 'green', width: '100%' }}>
          This is a right column
        </div>
      </Grid>
    </Grid>
  </Grid>
)

export const ColumnSizes: Story = () => (
  <Grid container>
    <Grid row>
      <Grid item xs={9}>
        <div style={{ background: 'red', width: '100%', padding: 20 }}>
          This is a left 75% column
        </div>
      </Grid>
      <Grid item xs={3}>
        <div style={{ background: 'blue', width: '100%', padding: 20 }}>
          This is a right 25% column
        </div>
      </Grid>
    </Grid>
  </Grid>
)
export const ResponsiveColumns: Story = () => (
  <Grid container>
    <Grid row>
      <Grid item xs={6} lg={9}>
        <div style={{ background: 'red', width: '100%', padding: 20 }}>
          This is a left 75% column on lg, and 50% below that
        </div>
      </Grid>
      <Grid item xs={6} lg={3}>
        <div style={{ background: 'blue', width: '100%', padding: 20 }}>
          This is a right 25% column on lg, and 50% below that
        </div>
      </Grid>
    </Grid>
  </Grid>
)


export const AsSection = Template.bind({})
AsSection.args = {
  as: 'section',
  children: 'This is a grid with the tagname of <section>',
}

export const AsButton = Template.bind({})
AsButton.args = {
  as: 'button',
  onClick: console.log,
  children: 'This is a grid with the tagname of <button> with a button specific prop',
}

export const WithCustomClass = Template.bind({})
WithCustomClass.args = {
  className: 'custom-class',
  children: 'This has a custom className',
}