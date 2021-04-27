const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvSchema = new Schema (
  {
  title: {type: String, required: true },
  id: {type: String, required: true },
  firstAirDate: {type: String, required: true },
  lastAirDate: {type: String, required: true },
  noEpisodes: {type: Number, required: true },
  noSeasons: {type: Number, required: true },
  }
)

module.exports = mongoose.model('TvShows', TvSchema);