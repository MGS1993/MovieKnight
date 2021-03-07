import React, { useState, useContext } from 'react';
import styles from './NavSearch.module.css';
import ListContext from '../context/listContext';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const NavSearch = props => {
    const listContext = useContext(ListContext)
    const [ mediaNav, setMediaNav ] = useState('root')
    const [ tvGenreList, setTvGenreList ] = useState('')
    let expandedStyle = null
    let genreList = props.genreList
    let genreListNames = []
    let tvGenreListNames = []

    /*Optimize this code later*/
    if(genreList !== '') {
        genreList.forEach(el => {
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
    const queryTopMovieByGenre = async (e) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=500&with_genres=${e.value}&include_adult=false&include_video=false&page=1&watch_region=US`)
            const data = await response.json();
            const list = data.results
            listContext.exportedData(list)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryTrendingMovies = async (e) => {
        try{   
            const response = await fetch(` https://api.themoviedb.org/3/trending/movie/week?api_key=${props.apiKey}`)
            const data = await response.json();
            const list = data.results;
            listContext.exportedData(list)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryTopAllGenres = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(` https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=4000&page=1&timezone=America%2FTexas&include_null_first_air_dates=false`)
            const data = await response.json();
            // const list = data.results;
            // console.log(list)
            listContext.exportedData(data.results)
            props.setExpandedNav(!props.expandedNav)
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryTopTvGenre = async (e) => {
        try {
            const response = await fetch(` https://api.themoviedb.org/3/discover/tv?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=300&page=1&timezone=America%2FTexas&with_genres=${e.value}&include_null_first_air_dates=false`)
            const data = await response.json()
            const list = data.results;
            // console.log(list)
            listContext.exportedData(list);
            props.setExpandedNav(!props.expandedNav);
            setMediaNav('root')
        }catch(err) {
            console.log(err)
        }
    }
    const queryTrendingTv = async (e) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${props.apiKey}`)
            const data = await response.json();
            const list = data.results;
            // console.log(list)
            listContext.exportedData(list)
            props.setExpandedNav(!props.expandedNav);
            setMediaNav('root');
        }catch(err) {
            console.log(err)
        }
    }
    const queryTopAllTvGenres = async (e) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${props.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=5000&page=1&timezone=America%2FTexas&include_null_first_air_dates=false`);
            const data = await response.json()
            const list = data.results;
            // console.log(list)
            listContext.exportedData(list);
            props.setExpandedNav(!props.expandedNav);
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
                    <button onClick={() => setMediaNav('topMovies')}>Top Movies</button>
                    <button onClick={queryTrendingMovies}>Trending Movies</button>
                </div>
                <div>
                    <button onClick={callApiForTvGenre}>Top TV Shows</button>
                    <button onClick={queryTrendingTv}>Trending TV Shows</button>
                </div>
            </div>
            )
        } else if(mediaNav === 'topMovies') {
            rendered = (
            <div className={styles.movieNavWrapper}>
                <div>
                    <h3>Movies by genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={options} label={options.label} value={options.value}
                    onChange={queryTopMovieByGenre} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>or...</h3>
                    <button onClick={queryTopAllGenres}>Search All</button>
                </div>
           </div> 
            )
        } else if(mediaNav === 'topTvShows') {
            rendered = (
                <div className={styles.movieNavWrapper}>
                <div>
                    <h3>TV by genre</h3>
                    <Dropdown
                    className={styles.dropDownMain} 
                    controlClassName={styles.dropDownControl}
                    options={tvGenreListNames} label={tvGenreListNames.label} value={tvGenreListNames.value}
                    onChange={queryTopTvGenre} 
                    placeholder='Select a genre' />  
               </div>
                <div>
                    <h3>or...</h3>
                    <button onClick={queryTopAllTvGenres}>Search All</button>
                </div>
            </div>
            )
        }
    
        /*TODO: FIND A WAY TO DECLUTTER ALL OF THESE FUNCTIONS. THERE HAS
            TO BE A WAY TO REDUCE THE AMOUNT OF CODE. START BY REMOVING THE 
            DECLERATION OF LIST IN EACH QUERY FUNCTION. THAT WAS ONLY NEEDED
            FOR WHEN THE STATE WAS CHANGED IN USEEFFECT IT SEEMS. PREVENTED 
            INFINITE LOOPS.*/ 

    return(
        <div style={expandedStyle} className={styles.mainWrapper}>
           {rendered}
        </div>
    )
}

export default NavSearch