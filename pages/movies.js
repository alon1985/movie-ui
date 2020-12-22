// posts will be populated at build time by getStaticProps()
import  MovieCard  from '../components/MovieCard.js';
import SearchBox from "../components/SearchBox.js";
import React from "react";

export default class Movies extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <main>
                    <SearchBox searchMovies={query => this.searchMovies(query)} />
                    {this.props.movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}

                </main>
            </div>
        )
    }
    searchMovies(query) {
        console.log('here')
        alert(query);
    }
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

