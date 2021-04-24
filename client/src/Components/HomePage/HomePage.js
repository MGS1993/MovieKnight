import React, { useEffect, useState } from 'react'
import styles from './HomePage.module.css';
import HomePageHeader from './HomePageHeader/HomePageHeader';
import MovieCell from '../MovieCell/MovieCell';
import FooterNavBar from '../FooterNavBar/FooterNavBar';
import listContext from '../context/listContext';
import { getAllTrendingData, mediaTypeAssigner } from '../../Util/apiCalls';
import Login from '../profile/Login/Login';
const HomePage = React.memo(() => {
  const [ movieData, setMovieData ] = useState(null)
  const [ mediaSearch, setMediaSearch ] = useState('');
  const [ showLogin, setShowLogin ] = useState(false);
 useEffect(()=> {
    getAllTrendingData(setMovieData)
 }, [])

if ( movieData !== null ) { mediaTypeAssigner(movieData, mediaSearch)} 

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

  return (
    <div className={styles.homePageLayout}>
      <HomePageHeader clicked={(e) => setShowLogin(!showLogin)} />
      <div className={styles.movieCellWrapper}>
      {showLogin ? <Login /> : null}
        {movieData?.map((item, index) => {
          return (
            <MovieCell
              key={index}
              title={item.title || item.name}
              image={imagePath(item.backdrop_path, item)}
              score={item.vote_average}
              bio={item.overview}
              yearReleased={item.release_date}
              mediaId={item.id}
              countryOrigin={item.origin_country}
              mediaType={item.media_type}
              pathType={pathType}
              movieData={movieData}
            />
          );
        })}
      </div>
      <listContext.Provider
        value={{ exportedData: setMovieData, setMediaSearch: setMediaSearch }}
      >
        <FooterNavBar
          mediaSearch={mediaSearch}
          setMediaSearch={setMediaSearch}
        />
      </listContext.Provider>
    </div>
  );
})

export default HomePage