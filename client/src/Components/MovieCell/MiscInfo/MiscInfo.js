import React from 'react';
import MiscIcon from '../MiscIcon/MiscIcon';
import styles from './MiscInfo.module.css';


const MiscInfo = (props) => {
  let results = props.streamingServices.results
  let masterLogo = {}
    if ( results === undefined || 
      results.US === undefined || results.US.flatrate === undefined) {
      masterLogo.stream = null
    } else {
      masterLogo.stream = results.US.flatrate;
    }

    if ( results === undefined || 
      results.US === undefined || results.US.buy === undefined  ) {
      masterLogo.buy = null
    } else {

      masterLogo.buy = results.US.buy;
    }
    if ( results === undefined || 
      results.US === undefined || results.US.rent === undefined  ) {
      masterLogo.rent = null
    } else {
      masterLogo.rent = results.US.rent
    }

  return (
    <div className={styles.mainWrapper}>
      {masterLogo.buy !== null ? (
        <div>
           <h3>Buy</h3>
          <div className={styles.iconWrapper}><MiscIcon logo={masterLogo.buy} /></div>
        </div>
      ) : null}
      {masterLogo.rent !== null ? (
        <div>
          <h3>Rent</h3>
          <div className={styles.iconWrapper}><MiscIcon logo={masterLogo.rent} /></div>
        </div>
      ) : null}

      {masterLogo.stream !== null ? (
        <div>
           <h3>Stream</h3>
          <div className={styles.iconWrapper}><MiscIcon logo={masterLogo.stream} /></div>
        </div>
      ) : null}
    </div>
  );
};


export default MiscInfo