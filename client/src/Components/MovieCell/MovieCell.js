import React, { useState, useEffect } from "react";
import styles from "./MovieCell.module.css";
import { AiOutlineStar } from "react-icons/ai";
import MiscInfo from './MiscInfo/MiscInfo';
import { getStreamingData } from '../../Util/apiCalls';
const MovieCell = React.memo( function MemoCell(props) {
  let [clickedLarger, setClickedLarger] = useState(false);
  const [ streamingServices, setStreamingServices ] = useState('')
  let mainWrapperAppendedStyle;
  let renderedCell;
  let releaseRender;
  let movieImageAppendedStyle
  const mq = window.matchMedia("(min-width: 768px)");
  let largeMovieImageStyle = null
  props.yearReleased === undefined
    ? (releaseRender = null)
    : (releaseRender = <div>Release Date {props.yearReleased}</div>);

    useEffect(() => {
      getStreamingData(
        props.mediaSearch === "" ? props.mediaType : props.mediaSearch,
        props.mediaId,
        setStreamingServices
      );
    }, [props.mediaId, props.mediaSearch, props.mediaType]);

    if (props.pathType === 'poster') {
      movieImageAppendedStyle = {
        width: 'auto',
        height: '100%',
        margin: '0 auto'
      }
    }
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
          <MiscInfo streamingServices={streamingServices}
            mediaType={props.mediaType } 
            />
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
            <div data-testid='titleTest' >{props.title}</div>
            
            <div className={styles.titleScore}>
              <AiOutlineStar />
              {props.score}
            </div>
          </div>
          {releaseRender}
          <div className={styles.largeBio}>{props.bio}</div>
          <MiscInfo streamingServices={streamingServices} />
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
            style={movieImageAppendedStyle}
            src={"https://image.tmdb.org/t/p/w300/" + props.image}
            alt={`Movie Poster for ${props.title}`}
          ></img>
        </div>
        <div className={styles.movieInfoWrapper}>
          <div className={styles.title}>
            <div data-testid='titleTest'>{props.title}</div>
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
});

export default MovieCell;
