import React, { useState, useEffect, useContext } from 'react';
import styles from './FooterNavBar.module.css';
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import ListContext from '../context/listContext';
import NavArrow from '../NavSearch/NavArrow/NavArrow';
import NavSearch from '../NavSearch/NavSearch';
const FooterNavBar = props => {
  const [expandedNav, setExpandedNav] = useState(false)
  const [genreList, setGenreList] = useState('');
  const listContext = useContext(ListContext)
  const [ mediaNav, setMediaNav ] = useState('root')
  const [ tvGenreList, setTvGenreList ] = useState('')
  let expandedStyle = null;
  let icon = <GoSearch color="orange" />
  
     
  if(expandedNav === true) {
    expandedStyle = {
      height: '500px',
      transition: '.5s ease-in-out'
    }
    icon = <IoIosArrowDown color="orange" />
  }
  const queryMediaBySelectedGenre = async (e, mediaType, voteCount, page) => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${page}&watch_region=US`)
        const data = await response.json();
        console.log(data)
        listContext.exportedData(data.results)
        setExpandedNav(!expandedNav)
        setMediaNav('root')
    }catch(err) {
        console.log(err)
    }
}
const queryTrendingMedia = async (mediaType) => {
  try{   
      const response = await fetch(` https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${props.apiKey}`)
      const data = await response.json();
      listContext.exportedData(data.results)
      setExpandedNav(!expandedNav)
      setMediaNav('root')
  }catch(err) {
      console.log(err)
  }
}
const queryTopMediaAllGenres = async (mediaType, voteCount) => {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&page=1&timezone=America%2FTexas&include_null_first_air_dates=false`)
      const data = await response.json();
      listContext.exportedData(data.results)
      setExpandedNav(!expandedNav)
      setMediaNav('root')
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

  return(
    <div style={expandedStyle} className={styles.navBarWrapper}>

      <NavArrow arrowDir='left' apiKey={props.apiKey} setExpandedNav={setExpandedNav} />

      <NavSearch expandedNav={expandedNav} setExpandedNav={setExpandedNav} 
        genreList={genreList} apiKey={props.apiKey}
        mediaNav={mediaNav}
        setMediaNav={setMediaNav}
        queryMediaBySelectedGenre={queryMediaBySelectedGenre}
        queryTrendingMedia={queryTrendingMedia}
        queryTopMediaAllGenres={queryTopMediaAllGenres}
        callApiForTvGenre={callApiForTvGenre}
        tvGenreList={tvGenreList} />

      <div onClick={() => setExpandedNav(!expandedNav)} 
        className={styles.searchWrapper}> {icon} </div>
        <NavArrow arrowDir='right' apiKey={props.apiKey} setExpandedNav={setExpandedNav} />
      
    </div>
  )
}


export default FooterNavBar