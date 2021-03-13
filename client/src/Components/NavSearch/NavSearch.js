import React, { useState, useContext } from 'react';
import styles from './NavSearch.module.css';
import ListContext from '../context/listContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const NavSearch = props => {
    const listContext = useContext(ListContext)
    const [ mediaNav, setMediaNav ] = useState('root')
    const [ tvGenreList, setTvGenreList ] = useState('')
    // const [pageNavIO, setPageNavIO] = useState(false);
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
    if(tvGenreList !== '') {
        tvGenreList.forEach(el => {
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
    const queryTrendingMedia = async (mediaType) => {
        try{   
            const response = await fetch(` https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${props.apiKey}`)
            const data = await response.json();
            listContext.exportedData(data.results)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryMediaBySelectedGenre = async (e, mediaType, voteCount, page) => {
        // setPageNavIO(!pageNavIO)
        let test = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${page}&watch_region=US`
        try {
            const response = await fetch(test)
            const data = await response.json();
            console.log(data)
            console.log(test)
            listContext.exportedData(data.results)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryTopMediaAllGenres = async (mediaType, voteCount) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&page=1&timezone=America%2FTexas&include_null_first_air_dates=false`)
            const data = await response.json();
            listContext.exportedData(data.results)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }

    const callApiForTvGenre = async (e) => {
        setMediaNav('topTvShows')
        try{
            const responseGenre = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${props.apiKey}&language=en-US`)
            const dataGenre = await responseGenre.json();
            const genreListQuery = dataGenre.genres;
            setTvGenreList(genreListQuery);
        }catch(err) {
            console.log(err)
        }
    }
    let rendered = null
        if(mediaNav === 'root') {
            rendered = (
                <div className={styles.navRouteWrapper}>
                <div>
                                {/*gets genreList as props from footer*/}
                    <button onClick={() => setMediaNav('topMovies')}>Top Movies</button>
                    <button onClick={() => queryTrendingMedia('movie')}>Trending Movies</button>
                </div>
                <div>
                    <button onClick={callApiForTvGenre}>Top TV Shows</button>
                    <button onClick={() => queryTrendingMedia('tv')}>Trending TV Shows</button>
                </div>
            </div>
            )
        } else if(mediaNav === 'topMovies') {
            rendered = (
            <div className={styles.movieNavWrapper}>
                <div>
                    <h3>Top movies by selected genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={options} label={options.label} value={options.value}
                    onChange={(e) => queryMediaBySelectedGenre(e, 'movie', '500')} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>Top movies all genres</h3>
                    <button onClick={() => queryTopMediaAllGenres( 'movie', '4000')}>Search All</button>
                </div>
           </div> 
            )
        } else if(mediaNav === 'topTvShows') {
            rendered = (
                <div className={styles.movieNavWrapper}>
                <div>
                    <h3>Top TV by selected genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={tvGenreListNames} label={tvGenreListNames.label} value={tvGenreListNames.value}
                    onChange={(e) => queryMediaBySelectedGenre(e, 'tv', '100', '1' )} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>Top TV all genres</h3>
                    <button onClick={() => queryTopMediaAllGenres('tv', '5000')}>Search All</button>
                </div>
            </div>
            )
        }

    return(
        <div style={expandedStyle} className={styles.mainWrapper}>
            <div></div>
           {rendered}
           <div></div>
        </div>
    )
}

export default NavSearch