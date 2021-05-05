import React, { useState, useEffect } from 'react';
import styles from './TrackedCell.module.css';
import UpdatedTag from './UpdatedTag';
import { getTvImages, handleGetUpdatedAirDate } from '../../../Util/apiCalls'
import { deleteHandler } from '../../../Util/backendCalls';
import DelBtn from './DelBtn';

const TrackedCell = props => {
  const [ backdrop, setBackDrop ] = useState('');
  const [ newEpisode, setNewEpisode ] = useState(false);
  const [ updatedAirDate, setUpdatedAirDate ] = useState('')

  let fullPath 
    backdrop !== undefined ? fullPath = backdrop[0]?.file_path : fullPath = null
  let newEpisodeStyle 
    newEpisode ? newEpisodeStyle = {height: '226px'}
    : newEpisodeStyle = null
    const lastAirDate = localStorage.getItem(props.title);


    useEffect(() => {
      getTvImages(parseInt(props.id), setBackDrop);
      handleGetUpdatedAirDate(props.id, setUpdatedAirDate);
    }, [props.id]);

    useEffect(() => {
      if (
        updatedAirDate.length > 0 &&
        lastAirDate.length > 0 &&
        updatedAirDate !== lastAirDate
      ) {
        console.log(`dates have been updated for ${props.title}`);
        localStorage.setItem(props.title, updatedAirDate);
        setNewEpisode(true);
      }
    }, [lastAirDate, updatedAirDate, props]);

    if (localStorage.getItem(props.title, props.lastAirDate) === null) {
      localStorage.setItem(props.title, updatedAirDate);
    }
     
  return (
    <div className={styles.mainWrapper} style={newEpisodeStyle}>
      <DelBtn
        deleteMode={props.deleteMode}
        clicked={() =>
          deleteHandler(props.documentId, props.userId, props.setTrackedShows)
        }
      />
      <div className={styles.titleWrapper}>
        {newEpisode ? <UpdatedTag /> : null}
        <div>{props.title}</div>
      </div>
      <div>
        <div
          className={styles.miscInfoWrapper}
          style={newEpisode ? { height: "113px" } : null}
        >
          <div
            className={styles.background}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w300${fullPath})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <div className={styles.headerText}>Last Air date</div>
            <div>{updatedAirDate}</div>
          </div>
          <div>
            <div className={styles.headerText}>Episodes</div>
            <div>{props.noEpisodes}</div>
          </div>
          <div>
            <div className={styles.headerText}>Seasons</div>
            <div>{props.noSeasons}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default TrackedCell