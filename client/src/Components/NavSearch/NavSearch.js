import React, {useState, useContext} from 'react';
import styles from './NavSearch.module.css';
import ListContext from '../context/listContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const NavSearch = props => {
    // const [exportedData, setExportedData] = useState(null)
    const listContext = useContext(ListContext)
    let expandedStyle = null
    let genreList = props.genreList
    let genreListNames = []
    if(genreList !== '') {
        genreList.forEach(el => {
            genreListNames.push({
                value: el.id,
                label: el.name
            })
        })
    }
    // console.log(genreList)
    const options = genreListNames
    // const defaultOption = options[0];
    if(props.expandedNav === true) {
        expandedStyle = {
         opacity: '1',
         transition: '.5s ease-in-out'
        }
    }
    const queryTopInGenre = async (e) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&with_genres=${e.value}&include_adult=false&include_video=false&page=1`)
            const data = await response.json();
            const list = data.results
            listContext.exportedData(list)
        }catch(err) {
            console.log(err)
        }
            // console.log(e)
    }
    // console.log(exportedData)
    // console.log(listContext)
    return(
        <div style={expandedStyle} className={styles.mainWrapper}>
        <h3>I want the top movies in...</h3>
            <Dropdown
            className={styles.dropDownMain} 
            controlClassName={styles.dropDownControl}
            options={options} label={options.label} value={options.value}
            onChange={queryTopInGenre} 
            placeholder='Select a genre' />
        </div>
    )
}

/*WE WORKED OUT HOW TO CHANGE THE DISPLAY BASED ON ONE PARAMETER, GENRE
NEXT MAKE IT SMOOTH, IMPORT BY EITHER PROPS OR CONTEXT API SO THAT THE
FOOTER WILL CLOSE BACK DOWN AFTER YOU CLICK ON THE GENRE. THEN ADD NAVIGATION
OF MORE PAGES AND FIX THAT UGLY CSS WHITESPACE AT THE BOTTOM OF THE PAGE.*/
export default NavSearch