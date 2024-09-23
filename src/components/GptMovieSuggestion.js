import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  const {movieResults, movieNames} = useSelector((state) => state.gpt);
  console.log(movieResults,"movieResults");
  
  if(!movieNames) return null;


  return (
    <div className='bg-black p-4 m-4 text-white bg-opacity-80'> 
    {
      movieNames.map((movieName,index) => <MovieList key = {movieName} title = {movieName} movies = {movieResults[index]} />)
    }
    </div>
  )
}

export default GptMovieSuggestion