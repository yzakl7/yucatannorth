import { ServerStyleSheet } from 'styled-components'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { Provider } from 'react-redux'
import { store } from '../state'



class MyDocument extends Document {
  render() {
    return (
    <Provider store={store}>
      <Html>
        <Head>
          <link rel="stylesheet" href={`https://fonts.googleapis.com/css?family=ABeeZee`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </Provider>

    )
  }
    static async getInitialProps(ctx:any) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App:any) => (props:any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}

export default MyDocument
