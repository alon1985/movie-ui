import '../styles/globals.css'
import { Container, CssBaseline, MuiThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AppProps } from 'next/app'
import { MenuAppBar } from '../components/MenuAppBar'
import theme from '../styles/theme'
import Head from 'next/head'
import { useEffect } from 'react'
import { customStyles } from '../styles/customStyles'

const { navSpacing } = customStyles

const useStyles = makeStyles(() => ({
  navSpacing
}))



function MovieApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  const classes = useStyles()
  return (
      <div>
        <Head>
          <title>
            CinemaFile
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
        <MuiThemeProvider theme={theme}>
          <CssBaseline/>
          <MenuAppBar/>
          <Container className={classes.navSpacing}>
            <Component {...pageProps} />
          </Container>
        </MuiThemeProvider>
      </div>
  )
}

export default MovieApp
