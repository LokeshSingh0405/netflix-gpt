import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_IMAGE_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute -z-10'>
            <img src={BG_IMAGE_URL} alt="" srcset="" />
        </div>
        <GptSearchBar/>
        <GptMovieSuggestion/>       
    </div>
  )
}

export default GptSearch
