import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import './styles.scss'

const MovieList = (  ) => {
    const [movies, setMovies] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    // Set up user data
    useEffect(() => {
        if (movies) {
            // Error check
            if (movies.error) {
                // Handle error
            } else {
                setMovies(movies)
            }
        }
    }, [movies])

    // Router event handler
    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading)
        Router.events.on('routeChangeComplete', stopLoading)
        return () => {
            Router.events.off('routeChangeStart', startLoading)
            Router.events.off('routeChangeComplete', stopLoading)
        }
    }, [])

    // Listen to scroll positions for loading more data on scroll
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    const handleScroll = () => {
        // To get page offset of last user
        const lastMovieLoaded = document.querySelector(
            '.user-list > .user:last-child'
        )
        if (lastMovieLoaded) {
            const lastMovieLoadedOffset = lastMovieLoaded.offsetTop + lastMovieLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            if (pageOffset > lastMovieLoadedOffset) {
                // Stops loading
                /* IMPORTANT: Add !loading  */
                if (movies.id < 50 && !loading) {
                    // Trigger fetch
                    const query = router.query
                    query.offset = parseInt(movies.id) + 1
                    router.push({
                        pathname: router.pathname,
                        query: query,
                    })
                }
            }
        }
    }
    return (
        <>
            <ul className="user-list">
                {movies.length > 0 &&
                movies.map((movie, i) => {
                    return (
                        <li className="movie" key={i}>
                            <span>{movie.title}</span>
                        </li>
                    )
                })}
            </ul>
            {loading && <h1>Loading ...</h1>}
        </>
    )
}
export default MovieList