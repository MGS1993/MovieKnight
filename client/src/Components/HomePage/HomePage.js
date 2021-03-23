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
    } catch(err) {
      console.log(err)
    }
  }
     getTrendingData()
 }, [])

 const config = async() => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/configuration?api_key=${apiKey}`)
    const data = await response.json()
    console.log(data)
  }catch(err) {
    console.log(err)
  }
 }
 config()
  return(
    <div className={styles.homePageLayout}>
      <HomePageHeader />
      <div className={styles.movieCellWrapper}>
        {/*optional chaining */}
        {movieData?.map((item, index) => {
          return <MovieCell
          key={index}
          title={item.title || item.name}
          image={item.backdrop_path}
          score={item.vote_average}
          bio={item.overview}
          yearReleased={item.release_date}
          mediaId={item.id}
          countryOrigin={item.origin_country}
          apiKey={apiKey}
          mediaType={item.media_type} />
        })}
      </div>
      <listContext.Provider value={{exportedData: setMovieData}}>
      <FooterNavBar apiKey={apiKey} />
      </listContext.Provider>
    </div>
  )
}

export default HomePage