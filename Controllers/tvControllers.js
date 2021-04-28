const TvModel = require('../models/TvModel');


exports.trackTvShow = async (req, res, next) => {
  try {
    const { title, id, firstAirDate, 
      lastAirDate, noEpisodes, noSeasons, savedBy } = req.body;

    let tvShow = new TvModel (
      {
        title,
        id,
        firstAirDate,
        lastAirDate,
        noEpisodes,
        noSeasons,
        savedBy
      }
    )
    /* WE GOT BASIC BACKEND WORKING. NEXT WE WORK ON MAKING THE EYE TRACK
    STATE STAY ON IT'S STATE DEPENDING ON WEATHER ITS BEING TRACKED OR NOT
    BUT MORE IMPORTANTLY! WE HAVE TO GET TRACKING ON YOUR OWN ACCOUNT INSTEAD 
    OF GLOBALLY LIKE IT CURRENTLY IS. LOOK AT YOUR OLD PROJECTS FOR CODE 
    THAT WILL HELP*/
    const existingTvShow = await TvModel.findOne({ id:id })
      if(existingTvShow) {
        return res
        .status(400)
        .json({msg: 'Tv show already tracked' })
      }


    tvShow.save( await function(err) {
      if(err) {
        res
        .status(500)
        .json({ msg: 'Error in tvController save function' })
      } else {
        res
        .json({ msg: 'tv Show Saved' })
        .status(200)
      }
    })
  } catch(err) {
    console.log(err)
  }
}