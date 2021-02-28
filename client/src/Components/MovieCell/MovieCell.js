import React, { useState } from "react";
import styles from "./MovieCell.module.css";
const MovieCell = (props) => {
  let [clickedLarger, setClickedLarger] = useState(false);
  let appendedStyle;

  clickedLarger
    ? (appendedStyle = { height: "500px" })
    : (appendedStyle = null);

  return (
    <div
      style={appendedStyle}
      className={styles.movieCellWrapper}
      onClick={() => setClickedLarger(!clickedLarger)}
    >
      <div className={styles.movieImageWrapper}>
        <img
          className={styles.movieImage}
          src={props.image}
          alt={`Movie Poster for ${props.title}`}
        ></img>
      </div>
      <div className={styles.movieInfoWrapper}>
        <div className={styles.title}>
          <div>{props.title}</div>
          <div className={styles.titleScore}>{props.score}</div>
        </div>
        <div className={styles.bio}>{props.bio}</div>
      </div>
    </div>
  );
};

export default MovieCell;
