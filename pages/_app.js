import '../styles/globals.css'
import { Container, CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { customStyles } from '../styles/customStyles'

function MovieApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
      <div>
        <Head>
          <title>
            Cinemafile
          </title>
          <link
              rel="icon"
              href="./favicon.ico"
          />
          <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
          <CssBaseline />
          <Container>
            <Component { ...pageProps } />
          </Container>
      </div>
  )}

export default MovieApp
