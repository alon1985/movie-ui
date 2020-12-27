// posts will be populated at build time by getStaticProps()
import  MovieCard  from '../components/MovieCard.js';
import SearchBox from "../components/SearchBox.js";
import React from "react";
import { useRouter } from 'next/router'

export default function Movies(props) {
    const router = useRouter();

    function searchMovies(query) {
        router.push(`/movies?${query}`)
    }
        return (
            <div>
                <main>
                    <SearchBox onSearchClick={searchMovies} />
                    {props.movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}

                </main>
            </div>
        )


}

export const getServerSideProps = async ({ query }) => {
    // Fetch the first page as default
    let urlQuery = '';
    if(query.limit) {
        urlQuery = `?limit=${query.limit}`;
        if(query.offset) {
            urlQuery += `&offset=${query.offset}`
        }
    } else if(query.offset) {
        urlQuery = `?offset=${query.offset}&limit=50`;
    } else {
        urlQuery = '?limit=50'
    }
    urlQuery += `&title=${query.title || ''}&year=${query.year || ''}&format=${query.format || ''}`;
    let movies = null
    // Fetch data from external API
    try {
        const res = await fetch(`https://cinemafile2.api.jamotro.com/movies${urlQuery}`);
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

