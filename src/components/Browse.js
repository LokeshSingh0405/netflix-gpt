import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useNowPopularMovies from '../hooks/usePopularMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  useNowPlayingMovies();
  useNowPopularMovies();

  const showGptSearch = useSelector(store => store.gpt.showGptSearch)
  
  return (
    <div>
      <Header />
      {
        showGptSearch ? <GptSearch/> :  <><MainContainer /><SecondaryContainer /></>  
      }
      
     
    </div>
  )
}

export default Browse;  