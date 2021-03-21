import React from 'react';
import styles from './MiscInfo.module.css';


const MiscInfo = (props) => {
  ///GET PROPS FROM MOVIE CELL THEN MAP IT TO A RENDER VARIABLE AND PUT IT UNDER STREAM
  // let streamProviders = (
  //   props.streamingServices.map((item, index) => {

  //   })
  // )
  console.log(props.streamingServices)
  return (
    <div className={styles.mainWrapper}>
      <div>
        <h3>Buy</h3>
      </div>
      <div>
        <h3>Rent</h3>
      </div>
      <div>
        <h3>Stream</h3>
        <div className={styles.iconWrapper}>
          {props.streamingServices?.flatrate[0]?.provider_name}
        {/*also find out why optional chaining isn't working with
        flaterate[0] */}
        </div>
      </div>
    </div>
  );
  
};


export default MiscInfo