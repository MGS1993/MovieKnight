import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader/HomePageHeader';
import MovieCell from '../MovieCell/MovieCell';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import listContext from '../context/listContext';
const HomePage = () => {
  const [movieData, setMovieData] = useState(null)
  const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';

 useEffect(()=> {
  async function getTrendingData() {
    try {
      const response = await fetch(` https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
      const data = await response.json()
      const item = data.results
      setMovieData(item)
      // console.log(item)
    } catch(err) {
      console.log(err)
    }
  }
     getTrendingData()
     
 }, [])

  return(
    <div className={styles.homePageLayout}>
      <HomePageHeader />
      
      {movieData && movieData.map((item, index) => {
        return <MovieCell
        key={index}
        title={item.title || item.name}
        image={item.backdrop_path}
        score={item.vote_average}
        bio={item.overview}
        yearReleased={item.release_date}
        movieId={item.id}
        countryOrigin={item.origin_country} />
      })}
      <listContext.Provider value={{exportedData: setMovieData}}>
      <FooterNavBar apiKey={apiKey} />
      </listContext.Provider>
    </div>
  )
}

export default HomePage