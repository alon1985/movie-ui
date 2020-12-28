// posts will be populated at build time by getStaticProps()
import  MovieCard  from '../components/MovieCard.js';
import SearchBox from "../components/SearchBox.js";
import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
const apiRoute = 'https://cinemafile2.api.jamotro.com/movies';
const limit = '50';
export default function Movies(props) {
    const [ movies, setMovies] = useState(props.movies)
    const [ hasMore, setHasMore] = useState(true)
    const [ searchTitle, setTitle ] = useState('')
    const [ searchYear, setYear ] = useState('')
    const [ searchFormat, setFormat ] = useState('')

    async function searchMovies(query) {
        let urlQuery = `?limit=${limit}`;
            if (query.title !== searchTitle) {
                setTitle(query.title);
            }
            if (query.year !== searchYear) {
                setYear(query.year);
            }
            if (query.format !== searchFormat) {
                setFormat(query.format);
            }
            urlQuery += `&title=${query.title}&year=${query.year}&format=${query.format}`;
        const data = await fetch(`${apiRoute}${urlQuery}`)
        const results = await data.json()
        setMovies(results);
    }

    async function fetchMoreMovies() {
        let urlQuery = `?limit=${limit}`;
        if(movies.length>0) {
            let offset = movies[movies.length - 1].id;
            urlQuery += `&title=${searchTitle}&year=${searchYear}&format=${searchFormat}&offset=${offset}`;
            const data = await fetch(`${apiRoute}${urlQuery}`)
            const results = await data.json();
            if(results.length === 0) {
                setHasMore(false);
            }
            const newSet = movies.concat(results);
            setMovies(newSet);
        } else {
            const data = await fetch(`${apiRoute}${urlQuery}`)
            const results = await data.json()
            setMovies(results);
        }
    }

    return (
        <div>
            <main>
                <Typography variant="h2" align="center">Movie List</Typography>
                <SearchBox onSearchClick={searchMovies}/>
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMoreMovies}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </InfiniteScroll>
            </main>
        </div>
    )
}

export const getStaticProps = async () => {

    let movies = null
    // Fetch data from external API
    try {
        const res = await fetch(`${apiRoute}?limit=${limit}`);
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

