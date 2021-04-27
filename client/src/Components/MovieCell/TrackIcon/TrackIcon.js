import React from 'react';
import styles from './TrackIcon.module.css';
import { AiOutlineEye, AiFillEye } from "react-icons/ai";

const TrackIcon = props => {
  const trackStyle = {
    height: '25px',
    width: '25px',
    color: 'orange'
  }
  
  return (
    <div
      className={styles.mainWrapper}
      onClick={(e) => props.handleTrackedStatus(e)}
    >
      {props.trackedStatus ? (
        <AiFillEye style={trackStyle} />
      ) : (
        <AiOutlineEye style={trackStyle} />
      )}
    </div>
  );
}


export default TrackIcon;