import React from 'react';
import styles from './TrashCan.module.css';
import { BsTrash } from "react-icons/bs";


const TrashCan = props => {



  return(
    <div className={styles.mainWrapper}>
      <div className={styles.trashCanWrapper}>
        <BsTrash className={styles.trashCan} />
      </div>
    </div>
  )
}


export default TrashCan