// posts will be populated at build time by getStaticProps()
import {Container} from "@material-ui/core";
import  MovieCard  from '../components/MovieCard.js';
import React from "react";

function Movies({ movies }) {
    return (
        <Container>
            {movies.map((movie) => (
               <MovieCard key={movie.id} movie={movie}/>
            ))}
        </Container>
    )
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://cinemafile2.api.jamotro.com/movies')
    const movies = await res.json()

    // By returning { props: movies }, the Movies component
    // will receive `movies` as a prop at build time
    return {
        props: {
            movies
        },
    }
}

export default Movies
