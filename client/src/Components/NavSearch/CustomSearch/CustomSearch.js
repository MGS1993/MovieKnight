import React, { useState, useContext } from 'react';
import styles from './CustomSearch.module.css';
import SearchBar from './SearchBar/SearchBar';
import ListContext from '../../context/listContext';
import expandedContext from '../../context/expandedNavContext';
import {  handleSearch  } from '../../../Util/apiCalls';

const CustomSearch = props => {
const [ searchData, setSearchData ] = useState('')
const listContext = useContext(ListContext)
const expanded = useContext(expandedContext)

  const clickedSearchHandler = async(e) => {
    e.preventDefault();
    if(searchData === '') {
      return null
    }
    
      if(expanded.renderedPage !== 1 ) {
        expanded.setRenderedPage(1)
        // let renderHelper = 1
        // const response = await fetch(`https://api.themoviedb.org/3/search/${props.searchType}?api_key=b88a57406d9a87698d307358f3e4f4ab&language=en-US&query=${searchData}&page=${renderHelper}&include_adult=false`)                                  
        // const data = await response.json()
        let funcData = await handleSearch(props.searchType, searchData, 1)
        //'expanded' is in FooterNavBar
        expanded.setMaxPages(funcData.maxPage)
        expanded.setCurrentApiCall(funcData.url)
        console.log('if')
        console.log(funcData)
        listContext.exportedData(funcData.results)
        expanded.setExpandedNav(false)
      } else {
        // const response = await fetch(`https://api.themoviedb.org/3/search/${props.searchType}?api_key=b88a57406d9a87698d307358f3e4f4ab&language=en-US&query=${searchData}&page=${expanded.renderedPage}&include_adult=false`)
        // const data = await response.json()
        let funcData = await handleSearch(props.searchType, searchData, expanded.renderedPage)
        console.log(funcData)
        expanded.setMaxPages(funcData.maxPage)
        expanded.setCurrentApiCall(funcData.url)
        console.log('else')
        listContext.exportedData(funcData.results)
        expanded.setExpandedNav(false)
      }
      expanded.setShowArrow(true);
    
  }
  return(
    <div className={styles.mainWrapper}>
      <SearchBar searchData={searchData} 
      setSearchData={setSearchData}
      clickedSearchHandler={clickedSearchHandler}  />
      {/* <button className={styles.submitBtn} 
      onClick={clickedSearchHandler}>Submit</button> */}
    </div>
  )
}

export default CustomSearch;