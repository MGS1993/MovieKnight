import React from 'react';
import styles from './HomePageHeader.module.css';
const HomePageHeader = props => {
 
  return(
    <div className={styles.headerWrapper}>
      <div onClick={props.clicked} 
      className={styles.loginText}>Login</div>
      <div>
        <h2>MovieKnight</h2>
      </div>      
    </div>
  )
}

export default HomePageHeader