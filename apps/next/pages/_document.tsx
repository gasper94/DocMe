import React from 'react'
import { AppRegistry } from 'react-native'

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'
// import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf'

// const fontsCSS = `
//   @font-face {
//     src: url(${MaterialIconsFont});
//     font-family: MaterialIcons;
//   }
// `

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent('Main', () => Main)
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const styles = [getStyleElement()]

    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps, styles: React.Children.toArray(styles) }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=XXXXX&libraries=places"
async defer></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
