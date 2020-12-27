
import { InputAdornment, OutlinedInput } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Search } from '@material-ui/icons'
import Button from "@material-ui/core/Button";
import {useState} from "react";
import { useRouter } from 'next/router'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
    const router = useRouter();
    const [ title, setTitle] = useState('')
    const [ year, setYear ] = useState('');
    const [ format, setFormat ] = useState('');
    const classes = useStyles();


    const handleTitleChange = e => {
        setTitle(e.target.value);
    }
    const handleYearChange = e => {
        setYear(e.target.value);
    }
    const handleFormatChange = e => {
        setFormat(e.target.value);
    }
    const handleSubmit = e => {
        e.preventDefault();
        const query = `title=${title || ''}&year=${year || ''}&format=${format || ''}`;
        props.onSearchClick(query);
    }
    const handleClear = e => {
        if(title) {
            setTitle('')
        }
        if(year) {
            setYear('');
        }
        if(format) {
            setFormat('')
        }
        router.push('/movies')
    }

    return (
        <div>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={9} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-amount"> Title </InputLabel>
                        <OutlinedInput id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            }
                            labelWidth={40} onChange={handleTitleChange} value={title}
                            placeholder="Search by movie title"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">
                            Year
                        </InputLabel>
                        <OutlinedInput id="outlined-adornment-amount"
                                       startAdornment={
                                           <InputAdornment position="start">
                                               <Search/>
                                           </InputAdornment>
                                       }
                                       labelWidth={20} onChange={handleYearChange} value={year}
                                       placeholder="Search by year seen"
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={5} sm={3}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-amount">
                            Format
                        </InputLabel>
                        <Select
                            defaultValue={''}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={format}
                            onChange={handleFormatChange}
                        >
                            <MenuItem value={''}> <em>Any</em></MenuItem>
                            <MenuItem value={'In Theaters'}>In Theaters</MenuItem>
                            <MenuItem value={'Video'}>Video</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <Button variant="contained" color="primary" onClick={handleClear}> Clear</Button>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl fullWidth className={classes.margin} variant="outlined">
                        <Button variant="contained" color="primary" onClick={handleSubmit}> Submit</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}