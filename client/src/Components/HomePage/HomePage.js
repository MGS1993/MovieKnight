import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader/HomePageHeader';
import MovieCell from '../MovieCell/MovieCell';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import listContext from '../context/listContext';
import { getAllTrendingData } from '../../Util/apiCalls';
// import { getMediaType } from '../../Util/apiCalls';
const HomePage = React.memo(() => {
  const [movieData, setMovieData] = useState(null)
  const [ mediaSearch, setMediaSearch ] = useState('');
  const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';
 useEffect(()=> {
    getAllTrendingData(setMovieData)
 }, [])

 let pathType
 let imagePath = (path, item) => {
   if (path === null) {
      pathType = 'poster'
      return item.poster_path
   } else {
     pathType = 'backDrop'
     return item.backdrop_path
   }
 }
console.log('homepage rendered...')
  return(
    <div className={styles.homePageLayout}>
      <HomePageHeader />
      <div className={styles.movieCellWrapper}>
        {/*optional chaining */}
        {movieData?.map((item, index) => {
          return <MovieCell
          key={index}
          title={item.title || item.name}
          image={imagePath(item.backdrop_path, item)}
          score={item.vote_average}
          bio={item.overview}
          yearReleased={item.release_date}
          mediaId={item.id}
          countryOrigin={item.origin_country}
          apiKey={apiKey}
          mediaType={item.mediaType}
          mediaSearch={mediaSearch}
          pathType={pathType} />
        })}
      </div>
      <listContext.Provider value={{exportedData: setMovieData,
         mediaSearch: mediaSearch, setMediaSearch: setMediaSearch}}>
      <FooterNavBar apiKey={apiKey} mediaSearch={mediaSearch} setMediaSearch={setMediaSearch} />
      </listContext.Provider>
    </div>
  )
})

export default HomePage