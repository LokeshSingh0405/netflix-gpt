import React, { useRef } from 'react'
import { lang } from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'

import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'
import openai from '../utils/openai'

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.lang)
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
    const json = await data.json();
    return json.results;
  }

  const handleGptSearchClick = async () => {

    const gptQuery = "Act as a movie recommendation system and sugges some movies for the query" + searchText.current.value + ". Only give me name of 5 movies, comma seprated lie the example given ahead. Example Result : Movie name 1, Movie name 2, Movie name 3, Movie name 4, Movie name 5"

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){
      //Show error page 
    }
    
    const gptMovies = gptResults.choices[0]?.message?.content.split(",")
    console.log(gptMovies,"Ads")
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie))
    const tmdbResult = await Promise.all(promiseArray);
    
    dispatch(addGptMovieResult({movieNames : gptMovies, movieResults : tmdbResult}))
  }

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='bg-black w-1/2 grid grid-cols-12 rounded-lg' onSubmit={(e) => e.preventDefault()}>
        <input type='text' ref={searchText} className='p-4 m-4 col-span-9 ' placeholder={lang[langKey].gptSearchPlaceholder} />
        <button className='py-2 col-span-3 px-4 m-4 text-white rounded-lg bg-red-700' onClick={handleGptSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar