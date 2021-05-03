


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

const handleGetTracked = async (userId, setState) => {
  try {
    const response = await fetch(`api/get_tracked_shows/${userId}`)
    const data = await response.json();
    setState(data)
  } catch(err) {
    console.log(err)
  }
}

export { handleTvTrack, handleGetTracked }