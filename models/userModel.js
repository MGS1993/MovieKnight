const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema (
  {
  userName: {type: String, required: true },
  passWord: {type: String, required: true },
  tracking: [{type: Schema.Types.ObjectId, ref: 'TvShows' }],
  subscription: {type: Object, required: false }
  }
)

module.exports = mongoose.model('Users', UserSchema)