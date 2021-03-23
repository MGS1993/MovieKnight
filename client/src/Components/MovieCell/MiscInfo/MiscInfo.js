import React from 'react';
import styles from './MiscInfo.module.css';


const MiscInfo = (props) => {
  let results = props.streamingServices.results
  let serviceLogo 
  let buyLogo
  let rentLogo
  let masterLogo = {}
  //pretty sure search multi fetch in custom search is whats messing things up. loking for people and movies.
  //only crashes with undefined when i used the search feature. maybe it wipes the props somehow?
  //worst case scenario defailt masterlogo to null so it wont crash on undefined
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.flatrate === undefined  ) {
      serviceLogo = <div>Media not found</div>
    } else {
      masterLogo.stream = 'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.flatrate[0]?.logo_path
    }
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.buy === undefined  ) {
      buyLogo = <div>Media not found</div>
    } else {
      masterLogo.buy = 'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.buy[0]?.logo_path
    }
    if ( Object.keys(results).length === 0 || props.streamingServices.results.US.rent === undefined  ) {
      rentLogo = <div>Media not found</div>
    } else {
      masterLogo.rent = 'https://image.tmdb.org/t/p/w92/' + props.streamingServices.results?.US?.rent[0]?.logo_path
    }
// console.log(serviceLogo)
console.log(props.streamingServices.results?.US)
  return (
    <div className={styles.mainWrapper}>
      {masterLogo.buy !== undefined ? <div>
        {/* <h3>Buy</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={masterLogo.buy} alt="logo" />
        </div> */}
      </div> : null}

      {masterLogo.rent !== undefined ? <div>
        {/* <h3>Rent</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={masterLogo.rent} alt="logo" />
        </div> */}
      </div> : null}

      {masterLogo.stream !== undefined ? <div>
        <h3>Stream</h3>
        <div className={styles.iconWrapper}>
          <img className={styles.streamLogos}
            src={masterLogo.stream} alt="logo" />
        </div>
      </div> : null}
    </div>
  );
  
};


export default MiscInfo