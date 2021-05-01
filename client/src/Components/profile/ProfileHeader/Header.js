import React from 'react';
import styles from './Header.module.css';



const Header = props => {

  return (
    <div className={styles.mainWrapper}>
      
        <h2>Welcome, {props.user}</h2> 
 
    </div>
  )
}


export default Header;