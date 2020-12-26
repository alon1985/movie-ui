import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { MouseEvent, useState } from 'react'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
)

export const MenuAppBar = () => {
    const classes = useStyles()
    const [ auth ] = useState(true)
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={ classes.root }>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={ classes.menuButton }
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        className={ classes.title }
                    >
                        Movie List
                    </Typography>
                    {auth &&
                    <div>
                        <IconButton
                            aria-label="notifications"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={ handleMenu }
                            color="inherit"
                        >
                        </IconButton>
                    </div>}
                </Toolbar>
            </AppBar>
        </div>
    )
}