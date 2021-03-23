import React from 'react';
import styles from './MiscInfo.module.css';


const MiscInfo = (props) => {
  let results = props.streamingServices.results
  let serviceLogo 
  let buyLogo
  let rentLogo
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.flatrate === undefined  ) {
      serviceLogo = <div>Media not found</div>
    } else {
      serviceLogo = props.streamingServices.results?.US?.flatrate[0]?.logo_path
    }
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.buy === undefined  ) {
      buyLogo = <div>Media not found</div>
    } else {
      buyLogo = props.streamingServices.results?.US?.buy[0]?.logo_path
    }
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.rent === undefined  ) {
      rentLogo = <div>Media not found</div>
    } else {
      rentLogo = props.streamingServices.results?.US?.rent[0]?.logo_path
    }
console.log(serviceLogo)
  return (
    <div className={styles.mainWrapper}>
      <div>
        <h3>Buy</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={'https://image.tmdb.org/t/p/w92'+ buyLogo} alt="logo" />
        </div>
      </div>
      <div>
        <h3>Rent</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={'https://image.tmdb.org/t/p/w92'+ rentLogo} alt="logo" />
        </div>
      </div>
      <div>
        <h3>Stream</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={'https://image.tmdb.org/t/p/w92'+ serviceLogo} alt="logo" />
        </div>
      </div>
    </div>
  );
  
};


export default MiscInfo