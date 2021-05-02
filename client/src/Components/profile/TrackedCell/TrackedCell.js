import React from 'react';
import styles from './TrackedCell.module.css';
// import { getTvImages } from '../../../Util/apiCalls'

const TrackedCell = props => {

//  props !== undefined ? getTvImages(parseInt(props.id)) : console.log('fail')
//TODO: add stylized backdrop to tracked cell background
  return(
    <div className={styles.mainWrapper}>
        <div className={styles.titleWrapper}>
          <div>{props.title}</div>
        </div>
      <div className={styles.miscInfoWrapper}>
        <div>
          <div className={styles.headerText}>Last Air date</div>
          <div>{props.lastAirDate}</div>
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
  )
}


export default TrackedCell