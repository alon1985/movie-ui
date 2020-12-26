import {CardMedia, Container, Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from "react";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            margin: 'auto',
            marginTop: 10,
        },
        image: {
            width: 80,
            height: 80
        },
        plot: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            height: 80,
            width: 100
        }
    }),
)

export default function MovieCard({ movie }) {
    const classes = useStyles();
    return (
        <div className={ classes.root }>
            <Paper className={ classes.paper }>
                <Grid container spacing={ 1 } >
                    <Grid item>
                        <CardMedia
                            className={ classes.image }
                            component="img"
                            alt={movie.title}
                            src={movie.poster}
                        />
                    </Grid>
                    <Grid item xs={ 12 } sm container>
                        <Grid item xs container direction="column" justify="space-between">
                            <Grid container spacing={ 1 }>
                                <Grid container item xs={ 10 } spacing={ 3 }>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="h5">
                                            Title
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="h5">
                                            Description
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="h5">
                                            Viewed
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="h5">
                                            Actions
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={ 10 } spacing={ 3 }>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="subtitle1">
                                            {movie.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>

                                        <Typography display="block" variant="caption" className="plot">
                                            {movie.plot}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="caption">
                                            {movie.seen.map((viewing, index) => (
                                                <li key={index}>{viewing.year} - {viewing.format}</li>
                                            ))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs = { 3 }>
                                        <Button variant="contained" color="primary">Add Viewing</Button>
                                        <br/><br/>
                                        <Button variant="contained" color="secondary">Delete Movie</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
            );
};
