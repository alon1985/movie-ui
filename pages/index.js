import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";

export default function Home() {
    return (
        <Container maxWidth="sm">
            <br/><br/>
            <Box my={4}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Welcome to Cinemafile - Alon's Movies
                </Typography>
                <Typography variant="body1">
                    This list was started on January 1, 2000.
                    The list documents each time a movie was watched and in what format - either In Theaters or Video.
                </Typography>
            </Box>
        </Container>
    );
}
