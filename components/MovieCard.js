import {CardMedia, Container, Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
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
            height: 80
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
                                        <Typography noWrap={false}>
                                            Title
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography>
                                            Description
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography>
                                            Viewed
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography>
                                            Actions
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container item xs={ 10 } spacing={ 3 }>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="caption">
                                            {movie.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <div className="plot">
                                        <Typography variant="caption" className="plot">
                                            {movie.plot}
                                        </Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={ 3 }>
                                        <Typography variant="caption">
                                            {movie.seen.map((viewing) => (
                                                <li>{viewing.year} - {viewing.format}</li>
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
