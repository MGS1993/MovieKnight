import React, { useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = props => {
  const inputRef = useRef();
  const handleKeyPress = event => {
    if(event.key === 'Enter') {
      props.clickedSearchHandler(event);
    }
  }
  useEffect(() => {
    inputRef.current.focus()
  })
  return(
    <div className={styles.mainWrapper}>
      <form>
        <input type="search" ref={inputRef}
        value={props.searchData} 
        onChange={e => props.setSearchData(e.target.value)}
        onKeyPress={handleKeyPress} />
      </form>
    </div>
  )
}

export default SearchBar;