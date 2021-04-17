import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = props => {
  
  const handleKeyPress = event => {
    if(event.key === 'Enter') {
      props.clickedSearchHandler(event);
    }
  }
  return(
    <div className={styles.mainWrapper}>
      <form>
        <input type="search" 
        value={props.searchData} 
        onChange={e => props.setSearchData(e.target.value)}
        onKeyPress={handleKeyPress} />
      </form>
    </div>
  )
}

export default SearchBar;