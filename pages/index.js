import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Box from "@material-ui/core/Box";

export default function Home() {
    return (
        <Container maxWidth="sm">
            <br/><br/>
            <Box my={4}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Welcome to Cinemafile - Alon's Movies
                </Typography>
                <Link href="/movies" color="secondary">
                    See the movie list
                </Link>
                <Link href="/stats" color="secondary">
                    See the stats
                </Link>
            </Box>
        </Container>
    );
}
