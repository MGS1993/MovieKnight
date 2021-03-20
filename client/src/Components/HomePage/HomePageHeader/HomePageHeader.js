import React from 'react';
import styles from './HomePageHeader.module.css';

const HomePageHeader = props => {
  const mq = window.matchMedia("(min-width: 768px)");
  let subHeader = null
  if(mq.matches) {
    subHeader = 'Top 20 this week'
  }
  return(
    <div className={styles.headerWrapper}>
      <div>
        <h2>MovieKnight</h2>
      </div>
      <div>
      {subHeader}
      </div>
      
    </div>
  )
}

export default HomePageHeader