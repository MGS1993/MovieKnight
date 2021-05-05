import React from 'react';
import styles from './BackIcon.module.css';
import { IoMdPlay } from "react-icons/io";
import { Link } from 'react-router-dom';


const BackIcon = () => (

  
    <div className={styles.mainWrapper}>
      <Link to={'/'} style={{zIndex: '2'}}>
        <IoMdPlay className={styles.icon} color="orange" />
      </Link>
    </div>
  
)


export default BackIcon;