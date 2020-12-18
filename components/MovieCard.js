import {CardMedia, Container, Grid} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import React from "react";
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
    }),
)

export default function MovieCard({ movie }) {
    const classes = useStyles();
    return (
        <div className={ classes.root }>
            <Paper className={ classes.paper }>
                <Grid
                    container
                    spacing={ 1 }
                >
                    <Grid item>
                        <CardMedia
                            className={ classes.image }
                            component="img"
                            alt={movie.title}
                            src={movie.poster}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={ 12 }
                        sm
                        container
                    >
                        <Grid
                            item
                            xs
                            container
                            direction="column"
                            justify="space-between"
                        >
                            <Grid
                                container
                                spacing={ 1 }
                            >
                                <Grid
                                    container
                                    item
                                    xs={ 12 }
                                    spacing={ 3 }
                                >
                                    <Grid
                                        item
                                        xs={ 3 }
                                    >
                                        <Typography color={"primary"}
                                            noWrap={false}
                                        >
                                            {movie.title}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 3 }
                                    >
                                        <Typography>
                                            Paywall/protection
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 2 }
                                    >
                                        <Typography>
                                            Site/source
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 4 }
                                    >
                                        <Typography>
                                            Asset type / status / ID
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    xs={ 12 }
                                    spacing={ 3 }
                                >
                                    <Grid
                                        item
                                        xs={ 3 }
                                    >
                                        <Typography variant="caption">
                                            {movie.plot}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 3 }
                                    >
                                        <Typography>
                                            Characters/asset meta
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 2 }
                                    >
                                        <Typography>
                                            SSTS
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={ 4 }
                                    >
                                        <Typography>
                                            Pub/embargo time / Updated time
                                        </Typography>
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
