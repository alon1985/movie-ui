import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { Children } from 'react'

class MyDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static async getInitialProps (ctx) {
        const sheets = new ServerStyleSheets()
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App { ...props } />)
            })

        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps, styles: [ ...Children.toArray(initialProps.styles), sheets.getStyleElement() ] }
    }

    render (){
        return (
            <Html>
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument