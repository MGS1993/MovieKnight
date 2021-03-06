const TvModel = require('../models/TvModel');


exports.trackTvShow = async (req, res, next) => {
  try {
    const { title, id, firstAirDate, 
      lastAirDate, noEpisodes, noSeasons, trackedBy } = req.body;

    let tvShow = new TvModel (
      {
        title,
        id,
        firstAirDate,
        lastAirDate,
        noEpisodes,
        noSeasons,
        trackedBy
      }
    )
    const existingTvShows = await TvModel.find({id:id})
    let trackedArr = existingTvShows.map((item) => {
      return item.trackedBy.toString()
    })
      if(existingTvShows !== null && trackedArr.includes(tvShow.trackedBy[0].toString())) {
        return res
        .status(500)
        .json({msg: "Tv show already being tracked."})
        
      }

    tvShow.save( await function(err) {
      if(err) {
        res
        .status(500)
        .json({ msg: 'Error in tvController save function' })
      } else {
        res
        .json({ msg: 'TV Show Saved' })
        .status(200)
      }
    })
  } catch(err) {
    console.log(err)
  }
}

exports.getTrackedShows = async (req, res) => {
  TvModel.find({trackedBy: req.params.id})
  .then(tvList => res.json(tvList))
  .catch(err => res.status(400).json({'Error': + err}))
}

exports.deleteShow = async (req, res) => {
  TvModel.findByIdAndDelete(req.params.id)
  .then(() => res.json('Show no longer being tracked'))
  .catch(err => res.status(400).json('Error: ' + err))
}