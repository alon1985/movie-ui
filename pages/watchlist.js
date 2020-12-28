// posts will be populated at build time by getStaticProps()
import  MovieCard  from '../components/MovieCard.js';
import SearchBox from "../components/SearchBox.js";
import React from "react";
import { useRouter } from 'next/router'
import {Typography} from "@material-ui/core";

export default function Watchlist(props) {
    const router = useRouter();

    function searchMovies(query) {
        router.push(`/movies?${query}`)
    }
    return (
        <div>
            <main>
                <Typography align="center" variant="h2">
                    Watchlist
                </Typography>
                <br/><br/>
                {props.movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}

            </main>
        </div>
    )


}

export const getServerSideProps = async ({ query }) => {
    // Fetch the first page as default
    let movies = null
    // Fetch data from external API
    try {
        const res = await fetch(`https://cinemafile2.api.jamotro.com/watchlist`);
        if (res.status !== 200) {
            throw new Error('Failed to fetch')
        }
        movies = await res.json()
    } catch (err) {
        movies = { error: { message: err.message } }
    }
    // Pass data to the page via props
    return { props: {movies} }
}

