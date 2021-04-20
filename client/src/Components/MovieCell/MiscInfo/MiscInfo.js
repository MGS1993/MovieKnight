import React from 'react';
import styles from './MiscInfo.module.css';


const MiscInfo = (props) => {
  let results = props.streamingServices.results
  let masterLogo = {}
    if ( results === undefined || props.streamingServices.results.US === undefined || props.streamingServices.results.US.flatrate === undefined) {
      masterLogo.stream = null
    } else {
      masterLogo.stream = <img className={styles.streamLogos}
            src={'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.flatrate[0]?.logo_path} alt="logo" />
     
    }
    if ( results === undefined || props.streamingServices.results.US === undefined || props.streamingServices.results.US.buy === undefined  ) {
      masterLogo.buy = null
    } else {
      
      masterLogo.buy = 
      <img className={styles.streamLogos}
      src={'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.buy[0]?.logo_path} alt="logo" />
    }
    if ( results === undefined || props.streamingServices.results.US === undefined || props.streamingServices.results.US.rent === undefined  ) {
      masterLogo.rent = null
    } else {
      masterLogo.rent = 
      <img className={styles.streamLogos}
            src={'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.rent[0]?.logo_path} alt="logo" />
    }

  return (
    <div className={styles.mainWrapper}>
      {masterLogo.buy !== undefined ? <div>
        {masterLogo.buy !== null ? <h3>Buy</h3> : null}
        <div className={styles.iconWrapper}>
         {masterLogo.buy}
        </div>
      </div> : null}
      {masterLogo.rent !== undefined ? <div>
        {masterLogo.rent !== null ? <h3>Rent</h3> : null}
        <div className={styles.iconWrapper}>
          {masterLogo.rent}
        </div>
      </div> : null}

      {masterLogo.stream !== undefined ? <div>
        {masterLogo.stream !==null ? <h3>Stream</h3> : null}
        <div className={styles.iconWrapper}>
          {masterLogo.stream}
        </div>
      </div> : null}
    </div>
  );
};


export default MiscInfo