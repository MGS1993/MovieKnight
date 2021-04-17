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
      console.log(data)
      setMovieData(item)
    } catch(err) {
      console.log(err)
    }
  }
     getTrendingData()
 }, [])

/* So we can probably fix the issue by taking into account the lack of state
in MiscInfo exceptions. That's just a bandaid though. Unless HomePage 
renders from getTrendingData() it doesn't seem that LargeMovie cells get thier
state and therefore cause an error. 

Could be lack of mediaType
Could be an issue with state rendering and fixed by useRef
Could be an issue with different types of api calls. search, discover etc.
I THINK I FOUND IT!!!! 
IT'S FOR SURE MEDIATYPE. WHEN WE LOOK FOR MOVIES THE MEDIATYPES FROM 
THE PREVIOUS ARRAY DON'T CHANGE. WE MADE AN ERROR WHEN BUILDING THAT
PART OF THE APP. WE CAN FIX THIS. */


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
          mediaType={item.media_type}
          pathType={pathType} />
        })}
      </div>
      <listContext.Provider value={{exportedData: setMovieData, mediaType: movieData?.mediaType}}>
      <FooterNavBar apiKey={apiKey} />
      </listContext.Provider>
    </div>
  )
}

export default HomePage