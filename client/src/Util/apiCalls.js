const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';

//HOMEPAGE/////////////////////////////
const getAllTrendingData = async(setState) => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
    const data = await response.json()
    const item = data.results
    setState(item)
  } catch(err) {
    console.log(err)
    
  }
}
///////////////////////////////////////

//FOOTERNAVBAR/////////////////////////
const getTrendingByType = async (mediaType) => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${apiKey}`)
    const data = await response.json();
    return data
  } catch(err) {
    console.log(err)
    
  }
}

const getTopMediaAllGenres = async (mediaType, voteCount, renderHelper) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&page=${renderHelper}&timezone=America%2FTexas&include_null_first_air_dates=false`)
    const data = await response.json(); 
    console.log(data)
    return { data: data, url: response.url};
  }catch(err) {
    console.log(err)
    
  }
}

const getMediaByGenre = async (e, mediaType, voteCount, renderHelper) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/${mediaType}?api_key=${apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=${voteCount}&with_genres=${e.value}&include_adult=false&include_video=false&page=${renderHelper}&watch_region=US`)
    const data = await response.json();
    return {data: data, url: response.url}
  }catch(err) {
    console.log(err)
    
  }
}

const callApiGenreByMediaType = async(mediaType, setState, e) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}&language=en-US`)
    const data = await response.json();
    return setState(data.genres)
  }catch(err) {
    console.log(err)
    
  }
}

const nextPageStateHandler = async ( currentApiCall, exportedData ) => {
  try {
    const response = await fetch(currentApiCall);
    const data = await response.json();
    exportedData(data.results)
   }catch(err){
    console.log(err)
   }
};
/////////////////////////

//MOVIECELL//////////////
const getStreamingData = async(mediaType, mediaId, setState) => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/${mediaType}/${mediaId}/watch/providers?api_key=${apiKey}`)
    const data = await response.json();
    setState(data)
  } catch(err) {
    console.log(err)
  }
}

const mediaTypeAssigner = (movieData, mediaSearch) => {
  let modData = [...movieData]
   modData.forEach(async(item, array) => {
     if(item.media_type === undefined) {
      //  console.log('item does not contain media_type. Modifying state...')
       item['media_type'] = mediaSearch
     } else {
      //  console.log('does contain media_type')
     }
   })
}

const getProdStatus = async (tvId, mediaType, setState) => {
  if (mediaType === "tv") {
    try {
      const response = await fetch(` https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US`);
      const data = await response.json();
      console.log(data);
      setState(data.status);
    } catch(err) {
      console.log(err)
    }
  } else {
    return 
  }
}
/////////////////////////
//CUSTOMSEARCH//////////
const handleSearch = async(
  searchType, searchData, renderedPage ) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&language=en-US&query=${searchData}&page=${renderedPage}&include_adult=false`)                                  
    const data = await response.json()
    return { 
      results: data.results,
      url: response.url,
      maxPage: data.total_pages }
  }

////////////////////////
export { getAllTrendingData, callApiGenreByMediaType, getStreamingData,
  getTrendingByType, getTopMediaAllGenres, getMediaByGenre, nextPageStateHandler,
  mediaTypeAssigner, handleSearch, getProdStatus  }