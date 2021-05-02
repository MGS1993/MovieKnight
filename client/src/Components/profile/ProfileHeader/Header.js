import React from 'react';
import styles from './Header.module.css';



const Header = props => {

  return (
    <div className={styles.mainWrapper}>
      
        <p className={styles.headerGreeting}>Welcome, {props.user}</p> 
 
    </div>
  )
}


export default Header;