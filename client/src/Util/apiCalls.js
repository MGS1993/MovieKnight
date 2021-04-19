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

// const mediaTypeAssigner = (movieData) => {

// }
///////////

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
    console.log('test -- this is called twice to get genres state for dropdown')
    return setState(data.genres)
  }catch(err) {
    console.log(err)
    
  }
}

const nextPageHandler = async(setCurrentApiCall,currentApiCall, renderedPage,
   mediaSearch, exportedData) => {
    setCurrentApiCall(currentApiCall.replace(`page=1`, `page=${renderedPage}`))
     try {
      const response = await fetch(currentApiCall);
      const data = await response.json();
      data.results.forEach(item => {
        item['mediaType'] = mediaSearch
      })
      exportedData(data.results)
      
     }catch(err){
      console.log(err)
      
     }
   }
/////////////////////////

//MOVIECELL//////////////
const getStreamingData = async(mediaSearch, mediaId, setState) => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/${mediaSearch}/${mediaId}/watch/providers?api_key=${apiKey}`)
    const data = await response.json();
    setState(data)
  } catch(err) {
    console.log(err)
    console.log('test')
  }
}
/////////////////////////
export { getAllTrendingData, callApiGenreByMediaType, getStreamingData,
  getTrendingByType, getTopMediaAllGenres, getMediaByGenre, nextPageHandler  }