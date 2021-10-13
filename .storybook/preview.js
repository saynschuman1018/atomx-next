import { Provider } from 'react-redux'
import { RouterContext } from "next/dist/shared/lib/router-context"
import { InlineFontSetter } from '../src/hooks/useRemFontSize'
import { store } from '../src/store/store'
import * as NextImage from 'next/image';

import '../src/pages/global.scss'
import '../public/fonts/stylesheet.css'

const withRemFontSizes = (story) => (
  <>
    <InlineFontSetter />
    {story()}
  </>
)

const withMockStore = (story) => {
  return (
  <Provider store={store}>
    { story() }
  </Provider>
  )
}

// see: https://github.com/vercel/next.js/issues/18393#issuecomment-783269086
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const decorators = [withMockStore, withRemFontSizes]

export const parameters = {
  layout: 'fullscreen',
  viewport: {
    viewports: {
      iphone6: {
        name: 'iPhone 6',
        styles: {
          height: '667px',
          width: '375px',
        },
        type: 'mobile',
      },
      iphonex: {
        name: 'iPhone X',
        styles: {
          height: '812px',
          width: '375px',
        },
        type: 'mobile',
      },
      ipad: {
        name: 'iPad',
        styles: {
          height: '1024px',
          width: '768px',
        },
        type: 'tablet',
      },
    }
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
