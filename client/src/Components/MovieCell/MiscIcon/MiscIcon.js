import React, { useState, useEffect } from 'react';
import styles from './MiscIcon.module.css';
import { HiPlus } from "react-icons/hi";
const MiscIcon = props => {
  const [ icon, setIcon ] = useState(null)
  let expanded
  icon?.length > 1 ? 
  expanded = {
    display: 'grid',
    gridTemplateRows: '1fr 1fr',
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: '5px',
    columnGap: '5px',
    transition: '.8s ease',
  } : expanded = null

  useEffect(() => {
    let darkened = {
      filter: 'brightness(15%)'
    }

    const handleIconExpand = (e) => {
      e.stopPropagation();
      setIcon (
      props.logo?.slice(0, 6).map((item, index) => {
      return <img className={styles.streamLogos} 
        onClick={(event) => handleIconMinimize(event)}
        key={index}  
        src={'https://image.tmdb.org/t/p/w92/' + item.logo_path} 
        alt={`logo for ${item.provider_name}`} />
      })
    )
    }
    const handleIconMinimize = (event) => {
      event.stopPropagation();
      setIcon (
        <div onClick={(e) => handleIconExpand(e)} 
          style={{ position: "relative", width: "60px" }}>
          <HiPlus
            color="#c8c4c4"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: "1",
              left: "0px",
              right: "0px",
              margin: "0 auto",
            }}
          />
          <img
            style={darkened}
            className={styles.streamLogos}
            src={"https://image.tmdb.org/t/p/w92/" + props.logo[0].logo_path}
            alt={`logo for ${props.logo[0].provider_name}`}
          />
        </div>
      )
    }
    if (props.logo?.length <= 1) {
      setIcon (
        <img className={styles.streamLogos} 
        src={'https://image.tmdb.org/t/p/w92/' + props.logo[0].logo_path} 
        alt={`logo for ${props.logo[0].provider_name}`} />
      )
    } else if (props.logo?.length >= 2) {
      
      setIcon (
        <div onClick={(e) => handleIconExpand(e)} 
          style={{ position: "relative", width: "60px" }}>
          <HiPlus
            color="#c8c4c4"
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              zIndex: "1",
              left: "0px",
              right: "0px",
              margin: "0 auto",
            }}
          />
          <img
            style={darkened}
            className={styles.streamLogos}
            src={"https://image.tmdb.org/t/p/w92/" + props.logo[0].logo_path}
            alt={`logo for ${props.logo[0].provider_name}`}
          />
        </div>
      );
    }
  }, [ props.logo ])
  
  return(
    <div style={expanded} className={styles.iconWrapper}>
      {icon}
    </div>
  )
}

export default MiscIcon