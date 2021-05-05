import React from 'react';
import styles from './ProfileIcon.module.css';
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

const ProfileIcon = () => (
 
    <div className={styles.mainWrapper}>
      <Link to={'/profile'} style={{zIndex: '2'}}>
        <CgProfile className={styles.icon} color="orange" />
      </Link>
    </div> 
  
)


export default ProfileIcon;