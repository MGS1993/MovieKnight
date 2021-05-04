import React from 'react';
import styles from './TrashCan.module.css';
import { BsTrash } from "react-icons/bs";


const TrashCan = props => {
  let toggledStyle
    props.deleteMode ? toggledStyle = {
      backgroundColor: '#d74d4d',
      transition: '.4s ease'
    } : toggledStyle = null
  return(
    <div className={styles.mainWrapper} style={toggledStyle}
      onClick={() => props.setDeleteMode(!props.deleteMode)}>
      <div className={styles.trashCanWrapper}>
        <BsTrash className={styles.trashCan} />
      </div>
    </div>
  )
    
}


export default TrashCan