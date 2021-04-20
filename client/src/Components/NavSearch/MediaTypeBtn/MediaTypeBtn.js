import React from 'react';
import styles from './MediaTypeBtn.module.css';

const MediaTypeBtn = props => (
    <div >
      <h3>Search for...</h3>
      <button className={styles.mediaBtn} 
      onClick={props.clickedBtn} value='movie'>Movies</button>
      <button className={styles.mediaBtn} 
      onClick={props.clickedBtn} value='tv'>TV</button>
    </div>
  
)

export default MediaTypeBtn