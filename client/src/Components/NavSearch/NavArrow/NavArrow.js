import React /*,{ useContext }*/ from 'react';
import styles from './NavArrow.module.css';
import { IoMdPlay } from "react-icons/io";
// import ListContext from '../../context/listContext';
const NavArrow = props => {
    let rendered
    let rotateLeftStyle = {transform: "rotate(180deg"}
    // const listContext = useContext(ListContext)
    // const test = () => {
    //     console.log('test')
    // };

    
    // const queryMediaBySelectedGenre = async (e, mediaType, voteCount, page) => {
    //     // setPageNavIO(!pageNavIO)
    //     let test = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${page}&watch_region=US`
    //     try {
    //         //undefined parameters for this function is causing it to not fetch data properly and therefore going blank when clicking for next page.
    //         //try to find a way to make the search modifiable for this component. maybe get a way to get the search string as a prop from the original 
    //         //component and use it here so that you ONLY modify the page render
    //         const response = await fetch(test)
    //         const data = await response.json();
    //         console.log(data)
    //         console.log(test)
    //         listContext.exportedData(data.results)
    //         props.setExpandedNav(!props.expandedNav)
    //         // setMediaNav('root')
    //         console.log(test)
    //     }catch(err) {
    //         console.log(err)
    //     }
    // }
    if(props.arrowDir === 'left') {
        rendered = <IoMdPlay className={styles.pageSelArrow} 
        color="orange" style={rotateLeftStyle} /*onClick={test}*/ />
    }else {
        rendered = <IoMdPlay className={styles.pageSelArrow} color="orange"
        // onClick={(e) => queryMediaBySelectedGenre(e, 'tv', '100', '1')} 
        />
    }
    return(
        <div>
            {rendered}
        </div>
    )
}

export default NavArrow;