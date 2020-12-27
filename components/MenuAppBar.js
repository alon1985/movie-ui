import {
    AppBar,
    createStyles,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import {  useState } from 'react'
import { useRouter } from 'next/router'
import Link from "@material-ui/core/Link";


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
            align: "center"
        },
    }),
)

export const MenuAppBar = () => {
    const classes = useStyles()
    const router = useRouter();
    const [ anchorEl, setAnchorEl ] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (event, index) => {
        if(index===1) {
            router.push('/movies')
        } else if(index===2) {
            router.push('/watchlist')
        } else {
            router.push('/stats')
        }
    }


    return (
        <div className={ classes.root }>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleClick}
                        edge="start"
                        className={ classes.menuButton }
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                        <Menu
                            id="simple-menu"
                            keepMounted
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={(event) => handleMenuItemClick(event, 1)}>Movie List</MenuItem>
                            <MenuItem onClick={(event) => handleMenuItemClick(event, 2)}>Watch List</MenuItem>
                            <MenuItem onClick={(event) => handleMenuItemClick(event, 3)}>Statistics</MenuItem>

                        </Menu>
                    </IconButton>
                    <Typography
                        variant="h2"
                        className={ classes.title }
                    >
                        <Link href='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Cinemafile</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}