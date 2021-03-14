import React from "react";
import styles from "./NavArrow.module.css";
import { IoMdPlay } from "react-icons/io";
const NavArrow = (props) => {
  let rendered;
  let rotateLeftStyle = { transform: "rotate(180deg" };
    
  const nextPage = () => {
    //Infinite loop on 10th page.
    if (props.renderedPage <= 8 && props.renderedPage < props.maxPages) {
        //second argument prevents loading a page that isn't there.
      props.setRenderedPage(props.renderedPage + 1);
      props.setCurrentApiCall(
        props.currentApiCall.replace(
          `page=${props.renderedPage}`,
          `page=${props.renderedPage + 1}`
        )
      );
      console.log(props.currentApiCall);
    } else {
      return null;
    }
  };
  //Add a prevention from going to a blank page
  const prevPage = () => {
    if (props.renderedPage <= 1) {
      return null;
    } else {
      props.setRenderedPage(props.renderedPage - 1);
      props.setCurrentApiCall(
        props.currentApiCall.replace(
          `page=${props.renderedPage}`,
          `page=${props.renderedPage - 1}`
        )
      );
      console.log(props.currentApiCall);
    }
  };

  if (props.arrowDir === "left") {
    rendered = (
      <IoMdPlay
        className={styles.pageSelArrow}
        color="orange"
        style={rotateLeftStyle}
        onClick={prevPage}
      />
    );
  } else {
    rendered = (
      <IoMdPlay className={styles.pageSelArrow} color="orange"
        onClick={nextPage}
      />
    );
  }

  return <div>{rendered}</div>;
};

export default NavArrow;
