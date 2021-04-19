import React, { useState } from "react";
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
    } else {
      return null;
    }
  };
  let prevPage = () => {
    setTimePause(true)
    if (props.renderedPage <= 1) {
      return null;
    } else {
      ////WE ALMOST HAVE THIS IN THE BAG. FOCUS ON NAVARROW AND API CALLS. 
      //LOOKS LIKE NEXTPAGE HANDLER AND THE FUNCTIONS HERE ARE DOING THE SAME THING.
      //MIGHT BE CASUING CONFLICTS BUT THIS IS DEFINITELY THE RIGHT THING TO FOCUS ON
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
