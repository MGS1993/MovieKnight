import React from 'react';
import styles from './MovieCell.module.css'

const MovieCell = props => {

  return(
    <div className={styles.movieCellWrapper}>
      <div className={styles.movieImageWrapper}>
        <img className={styles.movieImage} src={props.image} alt={`Movie Poster for ${props.title}`}></img>
      </div>
      <div className={styles.movieInfoWrapper}>
        <div className={styles.title}>
          <div>{props.title}</div>
          <div className={styles.titleScore}>{props.score}</div>
        </div>
        <div className={styles.bio}>
          {props.bio}
        </div>
      </div>
    </div>
  )
}


export default MovieCell