

const handleTvTrack = async (title, id, tvData, userId ) => {
  try {
    let dataBody = {
      title: title,
      id: id,
      firstAirDate: tvData.firstAirDate,
      lastAirDate: tvData.lastAirDate,
      noEpisodes: tvData.noEpisodes,
      noSeasons: tvData.noSeasons,
      trackedBy: userId
    }
    const response = await fetch('api/track_tv_show', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data)
  } catch(err) {
    console.log(err)
  }
}

const handleGetTracked = async (userId, setState ) => {
  try {
    const response = await fetch(`api/get_tracked_shows/${userId}`)
    const data = await response.json();
    
    // data.forEach(async el => {
    //   const response2 = await fetch(` https://api.themoviedb.org/3/tv/${el.id}?api_key=${apiKey}&language=en-US`);
    //   const data2 = await response2.json();
    //   secondState(data2) 
    // });



    setState(data)
  } catch(err) {
    console.log(err)
  }
}

export { handleTvTrack, handleGetTracked }