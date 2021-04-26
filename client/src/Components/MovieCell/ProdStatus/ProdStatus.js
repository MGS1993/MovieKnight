import React from 'react';
import styles from './ProdStatus.module.css';


const ProdStatus = props => {
  let background  
    props.prodStatus === 'Ended' ? 
    background = {backgroundColor: '#bf2c2c'} 
    : 
    background = {backgroundColor: '#377b37'} 


  return (
    <div className={styles.mainWrapper}>
      <div style={background} className={styles.textWrapper}>

        
        <p className={styles.prodStatusText}>{props.prodStatus}</p>
      </div>
    </div>
  )
}


export default ProdStatus;