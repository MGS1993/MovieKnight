


const getMediaType = async(id) => {
  const apiKey = 'b88a57406d9a87698d307358f3e4f4ab';
  try {
    const response = await fetch(` https://api.themoviedb.org/3/find/${id}?api_key=${apiKey}&language=en-US&external_source=imdb_id`)
    const data = await response.json();
    console.log(data)
  }catch(err) {
    console.log(err)
  }
}

export { getMediaType }