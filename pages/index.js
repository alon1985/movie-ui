import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Box from "@material-ui/core/Box";

export default function Home() {
    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Alon's Movies
                </Typography>
                <Link href="/movies" color="secondary">
                    See the list
                </Link>
            </Box>
        </Container>
    );
}
