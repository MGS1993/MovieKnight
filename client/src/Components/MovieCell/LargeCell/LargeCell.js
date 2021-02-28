import React from 'react';
import styles from './LargeCell.module.css';


const LargeCell = props => {


  return(
    <div>
  <React.Fragment>
      <div className={styles.largeMovieImageWrapper}>
        <img
          className={styles.largeMovieImage}
          
          src={'https://image.tmdb.org/t/p/w500/'+ props.image}
          alt={`Movie Poster for ${props.title}`}
        ></img>
      </div>
      <div className={styles.movieInfoWrapper}>
        <div className={styles.largeTitle}>
          <div>{props.title}</div>
          
          <div className={styles.titleScore}>
            <AiOutlineStar/>{props.score}</div>
        </div>
        <div>Release Date {props.yearReleased}</div>
        <div className={styles.largeBio}>{props.bio}</div>

      </div>
    </React.Fragment>
    </div>
  )
}


export default LargeCell