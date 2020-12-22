
import { InputAdornment, OutlinedInput } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) =>
createStyles({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            display: 'flex',
            flexWrap: 'wrap',
        },
    },
    margin: {
        margin: theme.spacing(2),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    textField: {
        width: '25ch',
    },
}),
)
export default function SearchBar(props) {
    const classes = useStyles();

    return (
        <div>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={9} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-amount"> Search </InputLabel>
                        <OutlinedInput id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                            labelWidth={40}
                            placeholder="Search by movie title"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">
                            Search
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-amount"
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <Search/>
                                           </InputAdornment>
                                       }
                                       labelWidth={20}
                                       placeholder="Search by year seen"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">
                            Search
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-amount"
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <Search/>
                                           </InputAdornment>
                                       }
                                       labelWidth={20}
                                       placeholder="Search by format seen"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <Button variant="contained" color="primary" onClick={props.searchMovies}> Submit</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}