import { createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: blue[400],
            main: blue[600],
            dark: blue[800]
        }
    }
})

export default theme