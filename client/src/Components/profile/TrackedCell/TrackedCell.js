import React, { useState, useEffect } from 'react';
import styles from './TrackedCell.module.css';
import { getTvImages } from '../../../Util/apiCalls'

const TrackedCell =  props => {
  const [ backdrop, setBackDrop ] = useState('');
  let fullPath 
    backdrop !== undefined ? fullPath = backdrop[0]?.file_path : fullPath = null

    useEffect(() => {
      getTvImages(parseInt(props.id), setBackDrop) 
    }, [props.id])
         
     if (localStorage.getItem(props.title, props.lastAirDate) === null) {
        localStorage.setItem(props.title, props.lastAirDate)
     }
     const lastAirDate = localStorage.getItem(props.title);
     
     if ( props.lastAirDate !== lastAirDate ) {
       console.log(`dates have been updated for ${props.title}`)
     }

  return(
    <div className={styles.mainWrapper}>
        <div className={styles.titleWrapper}>
          <div>{props.title}</div>
        </div>
        <div>
          <div className={styles.miscInfoWrapper} >
            <div className={styles.background} style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${fullPath})`,
            backgroundPosition: 'center',
          }}></div>
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
    </div>
  )
}


export default TrackedCell