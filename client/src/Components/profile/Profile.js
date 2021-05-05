import React, { useContext, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import routerContext from '../context/routerContext';
import Header from './ProfileHeader/Header';
import { handleGetTracked } from '../../Util/backendCalls';
import TrackedCell from './TrackedCell/TrackedCell';
import TrashCan from './TrackedCell/TrashCan';
import BackIcon from './BackIcon/BackIcon';

const Profile = () => {
  const  routerState = useContext(routerContext);
  const [ trackedShows, setTrackedShows ] = useState({})
  const [ deleteMode, setDeleteMode ] = useState(false);
  //^passed to DelBtn to trigger delete
  useEffect(() => {
    routerState.currentUserId
      ? handleGetTracked(
          routerState.currentUserId,
          setTrackedShows,
        )
      : console.log("Loading data...");
  }, [routerState.currentUserId]);

  return (
    <div className={styles.mainWrapper}>
      <Header user={routerState.currentUser} />
      <h2>Tracked Shows</h2>
      <div className={styles.trackedContainer}>
        {trackedShows.length > 0
          ? trackedShows.map((item, index) => {
              return (
                <TrackedCell
                  key={index}
                  id={item.id}
                  title={item.title}
                  lastAirDate={item.lastAirDate}
                  noEpisodes={item.noEpisodes}
                  noSeasons={item.noSeasons}
                  deleteMode={deleteMode}
                  documentId={item._id}
                  setTrackedShows={setTrackedShows}
                  userId={routerState.currentUserId}
                />
              );
            })
          : null}
      </div>
      <footer className={styles.footer}>
        <BackIcon />
        <TrashCan setDeleteMode={setDeleteMode} deleteMode={deleteMode} />
      </footer>
    </div>
  );
}


export default Profile;