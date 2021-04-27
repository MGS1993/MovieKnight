import React, { useState, useEffect } from "react";
import styles from "./MovieCell.module.css";
import { AiOutlineStar } from "react-icons/ai";
import MiscInfo from './MiscInfo/MiscInfo';
import { getStreamingData, getProdStatus, getTvData } from '../../Util/apiCalls';
import ProdStatus from './ProdStatus/ProdStatus';
import TrackIcon from './TrackIcon/TrackIcon';
import { handleTvTrack } from '../../Util/backendCalls';
const MovieCell = React.memo( function MemoCell(props) {
  let [clickedLarger, setClickedLarger] = useState(false);
  const [ streamingServices, setStreamingServices ] = useState('');
  const [ ongoingStatus, setOngoingStatus ] = useState('');
  const [ trackedStatus, setTrackedStatus ] = useState(false);
  const [ tvData, setTvData ] = useState({
    firstAirDate: '',
    lastAirDate: '',
    noEpisodes: 0,
    noSeasons: 0,
    //get title from props
    //get id from props
  })
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
      getStreamingData(props.mediaType, props.mediaId, setStreamingServices);
      getProdStatus(props.mediaId, props.mediaType, setOngoingStatus);
      getTvData(props.mediaId, props.mediaType, setTvData )
    }, [props.mediaType, props.mediaId ]);

    useEffect(() => {
      setClickedLarger(false)
    },[ props.movieData ])

    useEffect(() => {
      if (trackedStatus) {
        handleTvTrack(props.title, props.mediaId, tvData)
      }
    }, [ trackedStatus, props.title, props.mediaId, tvData ])

    const handleTrackedStatus = e => {
      e.stopPropagation();
      setTrackedStatus(!trackedStatus)
    }
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
            <div data-testid="titleTest">{props.title}</div>

            <div className={styles.titleScore}>
              <AiOutlineStar />
              {props.score}
            </div>
          </div>
          {releaseRender}
          
            {props.mediaType === "tv" ? (
              <div className={styles.trackedWrapper}>
                <TrackIcon
                  trackedStatus={trackedStatus}
                  setTrackedStatus={setTrackedStatus}
                  handleTrackedStatus={handleTrackedStatus}
                />
              </div>
            ) : null}
          
          <ProdStatus prodStatus={ongoingStatus} />
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
      height: "auto",
      overflow: 'hidden'
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
