import React from 'react';
import styles from './NavSearch.module.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const NavSearch = props => {
    let expandedStyle = null 
    let genreListNames = []
    let tvGenreListNames = []

    //props passed down from footer to get labels and values for dropdown
    if(props.genreList !== '') {
        props.genreList.forEach(el => {
            genreListNames.push({
                value: el.id,
                label: el.name
            })
        })
    }
    if(props.tvGenreList !== '') {
        props.tvGenreList.forEach(el => {
            tvGenreListNames.push({
                value: el.id,
                label: el.name
            })
        })
    }
    const options = genreListNames
    if(props.expandedNav === true) {
        expandedStyle = {
         opacity: '1',
         transition: '.5s ease-in-out'
        }
    }
   
    let rendered = null
        if(props.mediaNav === 'root') {
            rendered = (
                <div className={styles.navRouteWrapper}>
                <div>
                                {/*gets genreList as props from footer*/}
                    <button onClick={() => props.setMediaNav('topMovies')}>Top Movies</button>
                    <button onClick={() => props.queryTrendingMedia('movie')}>Trending Movies</button>
                </div>
                <div>
                    <button onClick={props.callApiForTvGenre}>Top TV Shows</button>
                    <button onClick={() => props.queryTrendingMedia('tv')}>Trending TV Shows</button>
                </div>
            </div>
            )
        } else if(props.mediaNav === 'topMovies') {
            rendered = (
            <div className={styles.movieNavWrapper}>
                <div>
                    <h3>Top movies by selected genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={options} label={options.label} value={options.value}
                    onChange={(e) => props.queryMediaBySelectedGenre(e, 'movie', '500')} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>Top movies all genres</h3>
                    <button onClick={() => props.queryTopMediaAllGenres( 'movie', '4000')}>Search All</button>
                </div>
           </div> 
            )
        } else if(props.mediaNav === 'topTvShows') {
            rendered = (
                <div className={styles.movieNavWrapper}>
                <div>
                    <h3>Top TV by selected genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={tvGenreListNames} label={tvGenreListNames.label} value={tvGenreListNames.value}
                    onChange={(e) => props.queryMediaBySelectedGenre(e, 'tv', '100', '1' )} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>Top TV all genres</h3>
                    <button onClick={() => props.queryTopMediaAllGenres('tv', '1000')}>Search All</button>
                </div>
            </div>
            )
        }

    return(
        <div style={expandedStyle} className={styles.mainWrapper}>
           {rendered}

        </div>
    )
}

export default NavSearch