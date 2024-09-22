import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies)
  return (
    <div className='bg-black '>
        <div className='-mt-50 relative z-20 bg-black  '>
            <MovieList title={"Now Playing"} movies = {movies.nowPlayingMovies}/>
            <MovieList title={"Trending"} movies = {movies.nowPlayingMovies}/>
            <MovieList title={"Popular"} movies = {movies.popularMovies}/>
            <MovieList title={"Upcoming Movies"} movies = {movies.nowPlayingMovies}/>
            <MovieList title={"Horror"} movies = {movies.nowPlayingMovies}/>
        </div>
    </div>
  )
}

export default SecondaryContainer



// movieList - popular 
    // MovieCard*n 
// movielist - Now playing 
// movielist - trending 