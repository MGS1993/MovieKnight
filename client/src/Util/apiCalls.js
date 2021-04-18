const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';


const getMediaType = async(id) => {
  
  try {
    const response = await fetch(` https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}&language=en-US&external_source=imdb_id`)
    const data = await response.json();
    console.log(data)
  }catch(err) {
    console.log(err)
  }
}
//HOMEPAGE
const getAllTrendingData = async(setState) => {
  try {
    const response = await fetch(` https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
    const data = await response.json()
    const item = data.results
    console.log(data)
    setState(item)
  } catch(err) {
    console.log(err)
  }
}
///////////

//FOOTERNAVBAR  
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
    console.log(data)
    return setState(data.genres)
  }catch(err) {

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
///////////
export { getMediaType, getAllTrendingData, callApiGenreByMediaType, 
  getTrendingByType, getTopMediaAllGenres, getMediaByGenre, nextPageHandler  }