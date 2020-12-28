// posts will be populated at build time by getStaticProps()
import  MovieCard  from '../components/MovieCard.js';
import SearchBox from "../components/SearchBox.js";
import React, {useState} from "react";
import {Typography} from "@material-ui/core";
const apiRoute = 'https://cinemafile2.api.jamotro.com/movies';
const limit = '50';
export default function Movies(props) {
    const [ movies, setMovies] = useState(props.movies)

    async function searchMovies(query) {
        const urlQuery = `?limit=${limit}&${query}`;
        const data = await fetch(`${apiRoute}${urlQuery}`)
        const results = await data.json()
        setMovies(results);
    }

    return (
        <div>
            <main>
                <Typography variant="h2" align="center">Movie List</Typography>
                <SearchBox onSearchClick={searchMovies}/>

                    {movies.map((movie, index) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}

            </main>
        </div>
    )
}

export const getStaticProps = async () => {

    let movies = null
    // Fetch data from external API
    try {
        const res = await fetch(`${apiRoute}?limit=50`);
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

