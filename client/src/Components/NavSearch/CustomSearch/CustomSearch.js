import React, { useState, useContext } from 'react';
import styles from './CustomSearch.module.css';
import SearchBar from './SearchBar/SearchBar';
// import ListContext from '../../context/listContext';
import expandedContext from '../../context/expandedNavContext';
const CustomSearch = props => {
const [ searchData, setSearchData ] = useState('')
// const listContext = useContext(ListContext)
const expanded = useContext(expandedContext)

  const clickedSearchHandler = async(e) => {
    e.preventDefault();
    if(searchData === '') {
      return null
    }
    try {
      if(expanded.renderedPage !== 1 ) {
        expanded.setRenderedPage(1)
        let renderHelper = 1
        const response = await fetch(`https://api.themoviedb.org/3/search/${props.searchType}?api_key=b88a57406d9a87698d307358f3e4f4ab&language=en-US&query=${searchData}&page=${renderHelper}&include_adult=false`)                                  
        const data = await response.json()
        expanded.setMaxPages(data.total_pages)
        expanded.setCurrentApiCall(response.url)
        // listContext.exportedData(data.results)
        expanded.setExpandedNav(false)
      } else {
        const response = await fetch(`https://api.themoviedb.org/3/search/${props.searchType}?api_key=b88a57406d9a87698d307358f3e4f4ab&language=en-US&query=${searchData}&page=${expanded.renderedPage}&include_adult=false`)
        const data = await response.json()
        expanded.setMaxPages(data.total_pages)
        expanded.setCurrentApiCall(response.url)
        // listContext.exportedData(data.results)
        expanded.setExpandedNav(false)
      }
      expanded.setShowArrow(true);
    }catch(err) {
      console.log(err)
    }
  }
  return(
    <div className={styles.mainWrapper}>
      <SearchBar searchData={searchData} 
      setSearchData={setSearchData}  />
      <button className={styles.submitBtn} 
      onClick={clickedSearchHandler}>Submit</button>
    </div>
  )
}

export default CustomSearch;