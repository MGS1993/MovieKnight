import React, { useState, useEffect } from "react";
import styles from "./MovieCell.module.css";
import { AiOutlineStar } from "react-icons/ai";
import MiscInfo from './MiscInfo/MiscInfo';
const MovieCell = (props) => {
  let [clickedLarger, setClickedLarger] = useState(false);
  const [ streamingServices, setStreamingServices ] = useState('')
  let mainWrapperAppendedStyle;
  let renderedCell;
  let releaseRender;
  const mq = window.matchMedia("(min-width: 768px)");
  let largeMovieImageStyle = null
  props.yearReleased === undefined
    ? (releaseRender = null)
    : (releaseRender = <div>Release Date {props.yearReleased}</div>);

    useEffect(() => {
      const getStreamingData = async() => {
        if (props.mediaType === 'movie') {
          try {
            const response = await fetch(` https://api.themoviedb.org/3/movie/${props.mediaId}/watch/providers?api_key=${props.apiKey}`)
            const data = await response.json();
            const item = data
            setStreamingServices(item)
          }catch(err) {
            console.log(err)
          } } 
        if (props.mediaType === 'tv') {
          const response = await fetch(` https://api.themoviedb.org/3/tv/${props.mediaId}/watch/providers?api_key=${props.apiKey}`)
            const data = await response.json();
            const item = data
            setStreamingServices(item)
        }
      }
      getStreamingData()
    }, [props.apiKey, props.mediaId, props.mediaType])
    
  if (clickedLarger === true && mq.matches) {
    renderedCell = (
      <React.Fragment>
        <div className={styles.largeMovieImageWrapper}>
          <img
            className={styles.largeMovieImage}
            src={"https://image.tmdb.org/t/p/w780/" + props.image}
            alt={`Poster for ${props.title}`}
          ></img>
        </div>
        <div className={styles.movieInfoWrapper}>
          <div className={styles.largeTitle}>
            <div>{props.title}</div>
            <div className={styles.titleScore}>
              <AiOutlineStar />
              {props.score}
            </div>
          </div>
          {releaseRender}
          <div className={styles.largeBio}>{props.bio}</div>
        </div>
      </React.Fragment>
    );
    mainWrapperAppendedStyle = {
      height: "700px",
      backgroundColor: "rgb(77, 64, 42)",
      flexDirection: "column",
      transition: ".9s ease-out",
      color: "white",
      textAlign: "center",
    };
  } else if (clickedLarger === true) {
    renderedCell = (
      <React.Fragment>
        <div className={styles.largeMovieImageWrapper}>
          <img
            style={largeMovieImageStyle}
            className={styles.largeMovieImage}
            src={"https://image.tmdb.org/t/p/w500/" + props.image}
            alt={`Movie Poster for ${props.title}`}
          ></img>
        </div>
        <div className={styles.movieInfoWrapper}>
          <div className={styles.largeTitle}>
            <div>{props.title}</div>
            
            <div className={styles.titleScore}>
              <AiOutlineStar />
              {props.score}
            </div>
          </div>
          {releaseRender}
          <div className={styles.largeBio}>{props.bio}</div>
          <MiscInfo streamingServices={streamingServices}
            mediaType={props.mediaType} />
        </div>
      </React.Fragment>
    );
    mainWrapperAppendedStyle = {
      minHeight: "600px",
      flexDirection: "column",
      transition: ".9s ease-out",
      color: "white",
      textAlign: "center",
      height: "auto"
    };
  } else {
    renderedCell = (
      <React.Fragment>
        <div className={styles.movieImageWrapper}>
          <img
            className={styles.movieImage}
            src={"https://image.tmdb.org/t/p/w300/" + props.image}
            alt={`Movie Poster for ${props.title}`}
          ></img>
        </div>
        <div className={styles.movieInfoWrapper}>
          <div className={styles.title}>
            <div>{props.title}</div>
            <div className={styles.titleScore}>
              <AiOutlineStar />
              {props.score}
            </div>
          </div>
          <div className={styles.bio}>{props.bio}</div>
        </div>
      </React.Fragment>
    );
    mainWrapperAppendedStyle = null;
  }
  return ( 
    <div
      style={mainWrapperAppendedStyle}
      className={styles.movieCellWrapper}
      onClick={() => setClickedLarger(!clickedLarger)}>
      {renderedCell}
    </div>
  );
};

export default MovieCell;
