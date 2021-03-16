import React, { useState, useEffect } from "react";
import styles from "./NavArrow.module.css";
import { IoMdPlay } from "react-icons/io";
const NavArrow = props => {
 const [ timePause, setTimePause ] = useState(false); 
 let rendered;
 let rotateLeftStyle = { transform: "rotate(180deg" };
    //'let' instead of 'const' to modify content based on timePause
  let nextPage = () => {
    //Infinite loop on 10th page.
    setTimePause(true);
    if (props.renderedPage <= 8 && props.renderedPage < props.maxPages) {
        //second argument prevents loading a page that isn't there.
      props.setRenderedPage(currPage => currPage + 1);
      props.setCurrentApiCall(
        props.currentApiCall.replace(
          `page=${props.renderedPage}`,
          `page=${props.renderedPage + 1}`
        )
      );
    //   console.log(props.currentApiCall);
    } else {
      return null;
    }
    
  };
    // useEffect(() => {
    //     setTimeout(setTimePause(false), 3000);
    // }, [nextPage])
    
  let prevPage = () => {
    setTimePause(true)
    if (props.renderedPage <= 1) {
      return null;
    } else {
      props.setRenderedPage(currPage => currPage -1);
      props.setCurrentApiCall(
        props.currentApiCall.replace(
          `page=${props.renderedPage}`,
          `page=${props.renderedPage - 1}`
        )
      );
    }
  };
  if(timePause === true) {
    nextPage = null;
    prevPage = null;
}
    useEffect(() => {
        console.log('NavArrow rendered...')
    })
    const shiftNext = () => {
        //optional chaining('?.') skips nextPage() if it's undefined or null
        nextPage?.();
        setTimeout(() => {
            setTimePause(false)
        }, 500)
    }
    const unShiftNext = () => {
        prevPage?.();
        setTimeout(() => {
            setTimePause(false)
        }, 500)
    }
    
  //IF CLICKED TOO FAST PAGES SKIP. FIX LATER
  if (props.arrowDir === "left") {
    rendered = (
      <IoMdPlay
        className={styles.pageSelArrow}
        color="orange"
        style={rotateLeftStyle}
        onClick={unShiftNext}
      />
    );
  } else {
    rendered = (
      <IoMdPlay className={styles.pageSelArrow} color="orange"
        onClick={shiftNext}
      />
    );
  }

  return <div>{rendered}</div>;
};

export default NavArrow;
