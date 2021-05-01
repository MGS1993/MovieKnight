import React, { useContext, useEffect, useState } from 'react';
import styles from './Profile.module.css';
import routerContext from '../context/routerContext';
import Header from './ProfileHeader/Header';
import { handleGetTracked } from '../../Util/backendCalls';

const Profile = () => {
  const  routerState = useContext(routerContext);
  const [ trackedShows, setTrackedShows ] = useState({})

  useEffect(() => {
    routerState.currentUserId
      ? handleGetTracked(routerState.currentUserId, setTrackedShows)
      : console.log("Loading data...");
  }, [routerState.currentUserId]);
  return(
    <div className={styles.mainWrapper}>
      <Header user={routerState.currentUser} />
      <div className={styles.trackedContainer}>

      </div>
    </div>
  )
}


export default Profile;