import React from 'react';
import styles from './MediaTypeBtn.module.css';

const MediaTypeBtn = props => (
    <div>
      <h3>Search for...</h3>
      <button className={styles.mediaBtn} onClick={props.clickedBtn}>Movie</button>
      <button className={styles.mediaBtn} onClick={props.clickedBtn}>TV</button>
    </div>
  
)

export default MediaTypeBtn