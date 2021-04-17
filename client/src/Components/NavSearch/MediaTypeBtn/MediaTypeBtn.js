import React from 'react';
// eslint-disable-next-line
import styles from './MediaTypeBtn.module.css';

const MediaTypeBtn = props => (
    <div>
      <h3>Search for...</h3>
      <button onClick={props.clickedBtn} value='movie'>Movie</button>
      <button onClick={props.clickedBtn} value='tv'>TV</button>
    </div>
  
)

export default MediaTypeBtn