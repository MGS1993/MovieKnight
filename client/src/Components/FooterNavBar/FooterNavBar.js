import React, { useState, useEffect, useContext } from 'react';
import styles from './FooterNavBar.module.css';
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import ListContext from '../context/listContext';
import NavArrow from '../NavSearch/NavArrow/NavArrow';
import NavSearch from '../NavSearch/NavSearch';
import expandedContext from '../context/expandedNavContext';
import {
  getTrendingByType, getTopMediaAllGenres, getMediaByGenre,
  callApiGenreByMediaType, nextPageHandler
} from "../../Util/apiCalls";
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
  const [ showSearchBar, setShowSearchBar ] = useState(false);
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
      if(renderedPage !== 1) {
        setRenderedPage(1)
        let funcData = await getMediaByGenre(e, mediaType, voteCount, 1); 
        setMaxPages(funcData.data.total_pages)
        setCurrentApiCall(funcData.url)
        listContext.exportedData(funcData.data.results)
      } else {
        let funcData = await getMediaByGenre(e, mediaType, voteCount, renderedPage);
        setMaxPages(funcData.data.total_pages)
        setCurrentApiCall(funcData.url)
        listContext.exportedData(funcData.data.results)
      }
      setExpandedNav(!expandedNav)
      setMediaNav('root')
      setShowArrow(true)
}
const queryTrendingMedia = async(mediaType) => {
  listContext.setMediaSearch(mediaType)
  let data = await getTrendingByType(mediaType)
  listContext.exportedData(data.results)
  setExpandedNav(!expandedNav)
  setMediaNav('root')
  setShowArrow(false)

}
const queryTopMediaAllGenres = async (mediaType, voteCount) => {
  listContext.setMediaSearch(mediaType)
    if(renderedPage !== 1) {
      setRenderedPage(1)
      let funcData = await getTopMediaAllGenres(mediaType, voteCount, 1);
      setMaxPages(funcData.data.total_pages)
      setCurrentApiCall(funcData.url)
      listContext.exportedData(funcData.data.results)
    } else {
      let funcData = await getTopMediaAllGenres(mediaType, voteCount, renderedPage);
      setMaxPages(funcData.data.total_pages)
      setCurrentApiCall(funcData.url)
      listContext.exportedData(funcData.data.results)
    }
    setExpandedNav(!expandedNav)
    setMediaNav('root')
    setShowArrow(true)
}

  useEffect(() => {
    callApiGenreByMediaType('movie', setGenreList)
    callApiGenreByMediaType('tv', setTvGenreList)
    if(currentApiCall !== '') {
      nextPageHandler(setCurrentApiCall, currentApiCall, renderedPage, 
        listContext.mediaSearch, listContext.exportedData)
    }
  },[renderedPage, currentApiCall, listContext.exportedData, listContext.mediaSearch])

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
          mediaSearch={props.mediaSearch}
          setMediaSearch={props.setMediaSearch}
          queryMediaBySelectedGenre={queryMediaBySelectedGenre}
          queryTrendingMedia={queryTrendingMedia}
          queryTopMediaAllGenres={queryTopMediaAllGenres}
          // callApiForTvGenre={callApiForTvGenre}
          renderedPage={renderedPage}
          setRenderedPage={setRenderedPage}
          tvGenreList={tvGenreList}
          showSearchBar={showSearchBar}
          setShowSearchBar={setShowSearchBar}
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