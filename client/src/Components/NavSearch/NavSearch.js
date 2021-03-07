import React, { useState, useContext} from 'react';
import styles from './NavSearch.module.css';
import ListContext from '../context/listContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import CheckBox from '../UI/CheckBox/CheckBox';
const NavSearch = props => {
    // const [exportedData, setExportedData] = useState(null)
    // const [ clickedAll, setClickedAll ] = useState(false)
    // const [netFlixCheck, setNetFlixCheck] = useState(false)
    // const [ primeVideoChecked, setPrimeVideoChecked ] = useState(false)
    // const [ appleTvChecked, setAppleTvChecked ] = useState(false)
    // const [ huluChecked, setHuluCheck ] = useState(false)
    // const [ hboMaxCheck, setHboMaxCheck ] = useState(false)
    // const [ peacockChecked, setPeacockCheck ] = useState(false)
    // const [ discoveryChecked, setDiscoveryCheck ] = useState(false)
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
    // const checkAllHandler = () => {
    //     if(clickedAll === false) {
    //       setNetFlixCheck(true)
    //       setPrimeVideoChecked(true)
    //       setAppleTvChecked(true)
    //       setHuluCheck(true)
    //       setHboMaxCheck(true)
    //       setPeacockCheck(true)
    //       setDiscoveryCheck(true)
    //     } else if(clickedAll === true) {
    //       setNetFlixCheck(false)
    //       setPrimeVideoChecked(false)
    //       setAppleTvChecked(false)
    //       setHuluCheck(false)
    //       setHboMaxCheck(false)
    //       setPeacockCheck(false)
    //       setDiscoveryCheck(false)
    //     }
    //   }
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
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&with_genres=${e.value}&include_adult=false&include_video=false&page=1&with_watch_providers=10&watch_region=US`)
            // const secondRepsonse = await fetch(` https://api.themoviedb.org/3/movie/681887/watch/providers?api_key=${props.apiKey}`)
            // const secondData = await secondRepsonse.json()
            const data = await response.json();
            // console.log(secondData)
            const list = data.results
            listContext.exportedData(list)
        }catch(err) {
            console.log(err)
        }
            // console.log(e)
    }
    // console.log(exportedData)
    // console.log(listContext)
    const rendered = (
        <React.Fragment>
             <div>
                    <h3>I want the top movies in...</h3>
                <Dropdown
                className={styles.dropDownMain} 
                controlClassName={styles.dropDownControl}
                options={options} label={options.label} value={options.value}
                onChange={queryTopInGenre} 
                placeholder='Select a genre' />
            </div>
            <div>
                <h3>Available in...</h3>
                <div className={styles.checkBoxWrapper}>
                    {/* <CheckBox 
                    allCheck={()=>  setClickedAll(!clickedAll)}
                        checked={clickedAll}
                        changed={checkAllHandler}
                    clickedNetflix={()=> setNetFlixCheck(!netFlixCheck)}
                        netFlixCheck={netFlixCheck}
                    clickedPrimeVideo={()=> setPrimeVideoChecked(!primeVideoChecked)}
                        primeVideoChecked={primeVideoChecked}
                    clickedAppleTv={()=> setAppleTvChecked(!appleTvChecked)}
                        appleTvChecked={appleTvChecked}
                    clickedHuluCheck={()=> setHuluCheck(!huluChecked)}
                        huluChecked={huluChecked}
                    clickedHboMaxCheck={()=> setHboMaxCheck(!hboMaxCheck)}
                        hboMaxChecked={hboMaxCheck}
                    clickedPeacockCheck={()=> setPeacockCheck(!peacockChecked)}
                        peacockChecked={peacockChecked}
                    clickedDiscoveryCheck={()=> setDiscoveryCheck(!discoveryChecked)}
                        discoveryChecked={discoveryChecked}/> */}
                </div>
            </div>
        </React.Fragment>
    )
    return(
        <div style={expandedStyle} className={styles.mainWrapper}>
           {rendered}
        </div>
    )
}

export default NavSearch