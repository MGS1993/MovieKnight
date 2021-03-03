import React, { useState } from "react";
import styles from "./MovieCell.module.css";
import { AiOutlineStar } from "react-icons/ai";
const MovieCell = (props) => {
  let [clickedLarger, setClickedLarger] = useState(false);
  // let [movieDetail, setMovieDetail] = useState(null);
  // const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';

  // useEffect(() => {
  //   async function getMovieDetail() {
  //     try {
  //       const response = await fetch(` https://api.themoviedb.org/3/movie/${props.movieId}?api_key=${apiKey}&language=en-US`)
  //       const data = await response.json()
  //       const item = data
  //       setMovieDetail(item)
  //       console.log(item)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   }
  //   getMovieDetail()
  // }, [props.movieId])
  let mainWrapperAppendedStyle
  let renderedCell 

  if(clickedLarger === true) {
    renderedCell = 
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
    mainWrapperAppendedStyle = {
      height: '600px',
      flexDirection: 'column',
      transition: '.9s ease-out',
      color: 'white',
      textAlign: 'center'
    }
  } else {
    renderedCell = <React.Fragment>
    <div className={styles.movieImageWrapper}>
      <img
        className={styles.movieImage}
        src={'https://image.tmdb.org/t/p/w300/'+ props.image}
        alt={`Movie Poster for ${props.title}`}
      ></img>
    </div>
    <div className={styles.movieInfoWrapper}>
      <div className={styles.title}>
        <div>{props.title}</div>
        <div className={styles.titleScore}>
          <AiOutlineStar/>{props.score}</div>
      </div>
      <div className={styles.bio}>{props.bio}</div>
    </div>
  </React.Fragment>
  mainWrapperAppendedStyle = null
  }


  return (
    <div
    style={mainWrapperAppendedStyle}
      className={styles.movieCellWrapper}
      onClick={() => setClickedLarger(!clickedLarger)}
    >
      {renderedCell}
    </div>
  );
};

export default MovieCell;
