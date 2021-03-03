import React, { useState } from 'react';
import styles from './FooterNavBar.module.css';
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
const FooterNavBar = props => {
  const [expandedNav, setExpandedNav] = useState(false)
  let expandedStyle = null;
  let icon = <GoSearch color="orange" />
  if(expandedNav === true) {
    expandedStyle = {
      height: '500px',
      transition: '.5s ease-in-out'
    }
    icon = <IoIosArrowDown color="orange" />
  }

  return(
    <div style={expandedStyle} className={styles.navBarWrapper}>
      <div onClick={() => setExpandedNav(!expandedNav)}
        className={styles.searchWrapper}>
        {icon}
      </div>
    </div>
  )
}


export default FooterNavBar