import React from 'react';
import styles from './DelBtn.module.css';



const DelBtn = props => {
  let toggledStyle;
  
  props.deleteMode ? toggledStyle = {
    left: '0',
    opacity: '1',
    transition: 'opacity .5s ease, left .4s ease'

  } : toggledStyle = null

  return(
    <div className={styles.mainWrapper} style={toggledStyle}
    onClick={() => console.log('test')}>
      Stop tracking
    </div>
  )
}


export default DelBtn