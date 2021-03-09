import React, { useState, useEffect } from 'react';
import styles from './FooterNavBar.module.css';
import { GoSearch } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import NavSearch from '../NavSearch/NavSearch';
const FooterNavBar = props => {
  const [expandedNav, setExpandedNav] = useState(false)
  const [genreList, setGenreList] = useState('');
 
  let expandedStyle = null;
  let icon = <GoSearch color="orange" />
  if(expandedNav === true) {
    expandedStyle = {
      height: '500px',
      transition: '.5s ease-in-out'
    }
    icon = <IoIosArrowDown color="orange" />
  }

  useEffect(() => {
    const queryData = async() => {
      try {
        const responseGenre = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${props.apiKey}&language=en-US`)
        const dataGenre = await responseGenre.json();        
        setGenreList(dataGenre.genres);
      }catch(err) {
        console.log(err)
      }
     }
     queryData()
  }, [props.apiKey])
  
   
  return(
    <div style={expandedStyle} className={styles.navBarWrapper}>
      <NavSearch expandedNav={expandedNav} setExpandedNav={setExpandedNav} 
      genreList={genreList} apiKey={props.apiKey} />
      <div onClick={() => setExpandedNav(!expandedNav)} 
        className={styles.searchWrapper}> {icon} </div>
    </div>
  )
}


export default FooterNavBar