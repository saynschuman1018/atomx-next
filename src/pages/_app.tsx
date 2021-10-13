import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '../store/store'

import '../../public/fonts/stylesheet.css'
import './global.scss'

// This default export is required in a new `pages/_app.js` file.
export default function AtomixApp({ Component, pageProps }: AppProps) {
  return  (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://a.storyblok.com" />
        <link rel="dns-prefetch" href="https://a.storyblok.com" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
