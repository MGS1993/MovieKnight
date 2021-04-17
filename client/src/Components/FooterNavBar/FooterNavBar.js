import React, { useState, useEffect, useContext } from 'react';
import styles from './FooterNavBar.module.css';
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import ListContext from '../context/listContext';
import NavArrow from '../NavSearch/NavArrow/NavArrow';
import NavSearch from '../NavSearch/NavSearch';
import expandedContext from '../context/expandedNavContext';
const FooterNavBar = React.memo(props => {
  const [ expandedNav, setExpandedNav ] = useState(false)
  const [ genreList, setGenreList ] = useState('');
  const listContext = useContext(ListContext)
  const [ mediaNav, setMediaNav ] = useState('root')
  const [ tvGenreList, setTvGenreList ] = useState('')
  const [ showArrow, setShowArrow ] = useState(false)
  const [ currentApiCall, setCurrentApiCall ] = useState('')
  const [ renderedPage, setRenderedPage] = useState(1)
  const [ maxPages, setMaxPages ] = useState(0);
  const [ mediaSearch, setMediaSearch ] = useState('');
  let expandedStyle = null;
  let expandedCounterStyle = null;
  let icon = <GoSearch color="orange" />
  let leftArr
  let rightArr
  if(expandedNav === true) {
    expandedStyle = {
      height: '500px',
      transition: '.5s ease-in-out'
    }
    icon = <IoIosArrowDown color="orange" />
    expandedCounterStyle = {
      position: 'absolute',
      opacity: '0',
    }
  }
 
  const queryMediaBySelectedGenre = async (e, mediaType, voteCount) => {
    listContext.setMediaSearch(mediaType)
    try {
      if(renderedPage !== 1) {
        setRenderedPage(1)
        let renderHelper = 1;
        const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${renderHelper}&watch_region=US`)
        const data = await response.json();
        
        

        console.log('MediaBySelectedGenre Ran')
        setMaxPages(data.total_pages)
        setCurrentApiCall(response.url)
        listContext.exportedData(data.results)
        // console.log('if func ran')
        // console.log(data.results)
        console.log(mediaType)
      } else {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${renderedPage}&watch_region=US`)
        const data = await response.json();
        setMaxPages(data.total_pages)
        setCurrentApiCall(response.url)
        console.log('MediaBySelectedGenre Ran')
        listContext.exportedData(data.results)
        // console.log('the else func ran')
        // console.log(data.results)
        console.log(mediaType)
      }
      setExpandedNav(!expandedNav)
      setMediaNav('root')
      setShowArrow(true)
    }catch(err) {
        console.log(err)
    }
}
const queryTrendingMedia = async (mediaType) => {
  listContext.setMediaSearch(mediaType)
  try{   
      const response = await fetch(` https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${props.apiKey}`)
      const data = await response.json();
      listContext.exportedData(data.results)
      setExpandedNav(!expandedNav)
      setMediaNav('root')
      setShowArrow(false)
  }catch(err) {
      console.log(err)
  }
}
const queryTopMediaAllGenres = async (mediaType, voteCount) => {
  listContext.setMediaSearch(mediaType)
  try {
    if(renderedPage !== 1) {
      setRenderedPage(1)
      let renderHelper = 1;
      const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&page=${renderHelper}&timezone=America%2FTexas&include_null_first_air_dates=false`)
      const data = await response.json();
      setCurrentApiCall(response.url)
      listContext.exportedData(data.results)
    } else {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&page=${renderedPage}&timezone=America%2FTexas&include_null_first_air_dates=false`)
      const data = await response.json();
      setCurrentApiCall(response.url)
      listContext.exportedData(data.results)
    }
      setExpandedNav(!expandedNav)
      setMediaNav('root')
      setShowArrow(true)
  }catch(err) {
      console.log(err)
  }
}
const callApiForTvGenre = async (e) => {
  setMediaNav('topTvShows')
  try{
      const responseGenre = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${props.apiKey}&language=en-US`)
      const dataGenre = await responseGenre.json();
      const genreListQuery = dataGenre.genres;
      setTvGenreList(genreListQuery);
  }catch(err) {
      console.log(err)
  }
}
  useEffect(() => {
    const queryData = async() => {
      try {
        const responseGenre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${props.apiKey}&language=en-US`)
        const dataGenre = await responseGenre.json(); 
        setGenreList(dataGenre.genres);
      }catch(err) {
        console.log(err)
      }
     }
     queryData()
  }, [props.apiKey])

  useEffect(() => {
     const nextPage = async () => {
        setCurrentApiCall(currentApiCall.replace(`page=1`, `page=${renderedPage}`))
        try {
          const response = await fetch(currentApiCall);
          const data = await response.json();
<<<<<<< HEAD
          data.results.forEach((el, index) => {
            el['media_type'] = props.mediaSearch
          })
          console.log(data)
=======
          data.results.forEach(item => {
            item['mediaType'] = listContext.mediaSearch
          })
          // console.log(data)
>>>>>>> old-state
          listContext.exportedData(data.results)
          // console.log(data.results)
       } catch(err) {
         console.log(err)
       }
     }
     if(currentApiCall !== '') {
      nextPage()
    }
     // eslint-disable-next-line
  }, [renderedPage, currentApiCall ])

  if(showArrow) {
    leftArr = (
    <NavArrow arrowDir='left' apiKey={props.apiKey} 
      renderedPage={renderedPage} setRenderedPage={setRenderedPage}
      currentApiCall={currentApiCall} setExpandedNav={setExpandedNav} 
      queryMediaBySelectedGenre={queryMediaBySelectedGenre}
      setCurrentApiCall={setCurrentApiCall} maxPages={maxPages}
      />
    )
    rightArr = (
      <NavArrow arrowDir='right' apiKey={props.apiKey} 
      renderedPage={renderedPage} setRenderedPage={setRenderedPage}
      currentApiCall={currentApiCall} setExpandedNav={setExpandedNav}
      setCurrentApiCall={setCurrentApiCall} maxPages={maxPages}
       />
    )
  }
  return(
    <div style={expandedStyle} className={styles.navBarWrapper}>
      {expandedNav ? null: leftArr}
      <expandedContext.Provider value={{setExpandedNav: setExpandedNav, 
        renderedPage: renderedPage, setRenderedPage: setRenderedPage,
        currentApiCall: currentApiCall, setCurrentApiCall: setCurrentApiCall,
        setShowArrow: setShowArrow, setMaxPages: setMaxPages}}>
        <NavSearch expandedNav={expandedNav} setExpandedNav={setExpandedNav} 
          genreList={genreList} apiKey={props.apiKey}
          mediaNav={mediaNav}
          setMediaNav={setMediaNav}
          mediaSearch={mediaSearch}
          setMediaSearch={setMediaSearch}
          queryMediaBySelectedGenre={queryMediaBySelectedGenre}
          queryTrendingMedia={queryTrendingMedia}
          queryTopMediaAllGenres={queryTopMediaAllGenres}
          callApiForTvGenre={callApiForTvGenre}
          renderedPage={renderedPage}
          setRenderedPage={setRenderedPage}
          tvGenreList={tvGenreList}
        />
      </expandedContext.Provider>
      <div onClick={() => setExpandedNav(!expandedNav)} 
        className={styles.searchWrapper}>
            {icon} 
      </div>
        <div className={styles.pageCounterWrapper} style={expandedCounterStyle}>
          { showArrow ? <p>Page: {renderedPage}</p> : null }
        </div>
        {expandedNav ? null: rightArr}
    </div>
  )
})


export default FooterNavBar