import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = props => (
  
    <div className={styles.mainWrapper}>
      <form>
        <input type="search" 
        value={props.searchData} 
        onChange={e => props.setSearchData(e.target.value)} />
      </form>
    </div>
  )

export default SearchBar;