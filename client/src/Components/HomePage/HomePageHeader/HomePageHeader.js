import React from 'react';
import styles from './HomePageHeader.module.css';

const HomePageHeader = props => {

  return(
    <div className={styles.headerWrapper}>
      <div>
        <h2>MovieKnight</h2>
      </div>
      <div>
      This week's top 20
      </div>
      
    </div>
  )
}

export default HomePageHeader