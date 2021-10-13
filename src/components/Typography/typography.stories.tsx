import { createComponentMeta } from '../../utils/createComponentMeta'
import { Story } from '@storybook/react'

export default createComponentMeta({
  title: 'Typography Elements',
})

export const HeadingOne: Story<{ children: string }> = (props) => (
  <h1>
    {props.children}
  </h1>
)
HeadingOne.args = { children: 'Sample Heading 1' }

export const HeaderTwo: Story<{ children: string }> = (props) => (
  <h2>
    {props.children}
  </h2>
)
HeaderTwo.args = { children: 'Sample Heading 2' }

export const HeaderThree: Story<{ children: string }> = (props) => (
  <h3>
    {props.children}
  </h3>
)
HeaderThree.args = { children: 'Sample Heading 3' }

export const HeaderFour: Story<{ children: string }> = (props) => (
  <h4>
    {props.children}
  </h4>
)
HeaderFour.args = { children: 'Sample Heading 4' }

export const Paragraph: Story<{ children: any }> = (props) => <p { ...props } />
Paragraph.args = {
  children: (
    <>
      Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.
    </>
  ),
}

export const Small: Story<{ children: any }> = (props) => <small { ...props } />
Small.args = {
  children: (
    <>
      Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.
    </>
  ),
}

export const SmallWithLinks: Story<{ children: any }> = (props) => <small { ...props } />
SmallWithLinks.args = {
  children: (
    <>
      Sample body big text with <a href="/">link option</a> id dui posuere blandit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
    </>
  ),
}

export const UnorderedList: Story<{ children: any }> = (props) => <ul { ...props } />
UnorderedList.args = {
  children: (
    <>
      <li><strong>List item 1</strong></li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
      <li>List item 5</li>
    </>
  ),
}

export const OrderedList: Story<{ children: any }> = (props) => <ol { ...props } />
OrderedList.args = {
  children: (
    <>
      <li><strong>List item 1</strong></li>
      <li>List item 2</li>
      <li>List item 3</li>
      <li>List item 4</li>
      <li>List item 5</li>
    </>
  ),
}

export const HeaderOneWithContent: Story<{ children: any }> = (props) => <div { ...props } />
HeaderOneWithContent.args = {
  children: (
    <>
      <h1>Sample Heading 1</h1>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
    </>
  ),
}

export const HeaderThreeWithContent: Story<{ children: any }> = (props) => <div { ...props } />
HeaderThreeWithContent.args = {
  children: (
    <>
      <h3>Sample Heading 3</h3>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
    </>
  ),
}

export const HeaderWithSubHeadingAndContent: Story<{ children: any }> = (props) => <div { ...props } />
HeaderWithSubHeadingAndContent.args = {
  children: (
    <>
      <h1>Sample Heading 1</h1>
      <h3>Sample Heading 3</h3>
      <p><strong>Sample body big text with bold option id dui posuere blandit quis ac lectus. Sample body big text with bold option id dui posuere blandit quis ac lectus. Sample body big text with bold option id dui posuere blandit quis ac lectus. Sample body big text with bold option id dui posuere blandit quis ac lectus. Sample body big text with bold option id dui posuere blandit quis ac lectus.</strong></p>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
      <p>Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus. Sample body big text with <strong>bold option id dui posuere blandit. <a href="/">Curabitur</a> non</strong> nulla sit amet nisl tempus <a href="/">convallis</a> quis ac lectus.</p>
    </>
  ),
}

export const FullFCPPageExample: Story<{ children: any }> = (props) => <div { ...props } />
FullFCPPageExample.args = {
  children: (
    <>
      <h1>FCP Page Content</h1>
      <h2>Secondary Title</h2>
      <h3>Subtitle of the FCP Pages</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <strong>eiusmod tempor incididunt ut labore</strong> et dolore magna aliqua. <a href="#">Vitae aliquet nec ullamcorper sit amet risus</a>. Arcu dictum varius duis at consectetur lorem donec massa. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Risus feugiat in ante metus dictum at tempor. Convallis a cras semper auctor neque vitae tempus quam. Pharetra et ultrices neque ornare aenean euismod. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Ac turpis egestas maecenas pharetra convallis posuere. In metus vulputate eu scelerisque. In arcu cursus euismod quis viverra nibh cras pulvinar. Dignissim sodales ut eu sem integer vitae justo. Enim neque volutpat ac tincidunt vitae. Felis imperdiet proin fermentum leo vel orci porta. Dui id ornare arcu odio ut. Pellentesque pulvinar pellentesque habitant morbi tristique. Sit amet massa vitae tortor condimentum lacinia quis vel eros.</p>
      <p><strong>Aliquam nulla facilisi cras fermentum odio eu feugiat. Vestibulum sed arcu non odio. Lorem sed risus ultricies tristique nulla aliquet enim tortor at. Ornare arcu odio ut sem nulla pharetra diam sit amet.</strong> Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Proin sagittis nisl rhoncus mattis rhoncus urna. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Turpis in eu mi bibendum neque. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Pellentesque adipiscing commodo elit at. Velit euismod in pellentesque massa placerat duis ultricies. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris.</p>
      <p>Morbi tristique senectus et netus. Odio tempor orci dapibus ultrices. Blandit massa enim nec dui nunc mattis enim. Urna porttitor rhoncus dolor purus. Mattis molestie a iaculis at erat pellentesque. Id velit ut tortor pretium viverra suspendisse. Congue mauris rhoncus aenean vel elit. Risus pretium quam vulputate dignissim suspendisse in. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Ut consequat semper viverra nam libero justo laoreet. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Tristique senectus et netus et malesuada. Nisi lacus sed viverra tellus in hac. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Integer enim neque volutpat ac tincidunt vitae. Eget arcu dictum varius duis at consectetur lorem.</p>
      <ul>
        <li>Lorem ipsum option 1</li>
        <li>Lorem ipsum option 2</li>
        <li>Lorem ipsum option 3</li>
        <li>Lorem ipsum option 4</li>
        <li>Lorem ipsum option 5</li>
      </ul>
      <p>Massa id neque aliquam vestibulum morbi blandit cursus. Risus feugiat in ante metus dictum at. Placerat vestibulum lectus mauris ultrices eros. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Enim nec dui nunc mattis enim ut. Cursus metus aliquam eleifend mi in. Enim eu turpis egestas pretium aenean pharetra. Praesent elementum facilisis leo vel. In aliquam sem fringilla ut morbi. Eget nullam non nisi est sit amet facilisis magna. Odio aenean sed adipiscing diam. Sed arcu non odio euismod lacinia at quis risus. Sit amet nisl purus in. Facilisis gravida neque convallis a cras semper auctor neque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Vestibulum lectus mauris ultrices eros in. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus.</p>
      <ol>
        <li>Lorem ipsum option 1</li>
        <li>Lorem ipsum option 2</li>
        <li>Lorem ipsum option 3</li>
        <li>Lorem ipsum option 4</li>
        <li>Lorem ipsum option 5</li>
      </ol>
      <p>Sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper. Pulvinar proin gravida hendrerit lectus. Vulputate sapien nec sagittis aliquam malesuada bibendum. Ultrices dui sapien eget mi proin sed libero. Enim diam vulputate ut pharetra sit amet aliquam. Sed cras ornare arcu dui vivamus. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. In fermentum posuere urna nec tincidunt. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Vestibulum lectus mauris ultrices eros in. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Pellentesque nec nam aliquam sem et tortor consequat. Vulputate mi sit amet mauris commodo. Sem fringilla ut morbi tincidunt augue interdum velit. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Sit amet nisl purus in mollis nunc sed. Amet cursus sit amet dictum sit. Sit amet facilisis magna etiam tempor orci eu. Aenean euismod elementum nisi quis eleifend quam adipiscing.</p>
    </>
  ),
}

