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
      let funcData = await handleSearch(props.searchType, searchData, 1)
      //'expanded' is in FooterNavBar
      expanded.setMaxPages(funcData.maxPage)
      expanded.setCurrentApiCall(funcData.url)
      listContext.exportedData(funcData.results)
      expanded.setExpandedNav(false)
    } else {

      let funcData = await handleSearch(props.searchType, searchData, expanded.renderedPage)
      expanded.setMaxPages(funcData.maxPage)
      expanded.setCurrentApiCall(funcData.url)
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