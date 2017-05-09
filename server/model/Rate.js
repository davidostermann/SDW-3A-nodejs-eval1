const mongoose = require('mongoose');
const {Schema} = mongoose;
const RateSchema = new Schema({
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  'number': Number,
  'created_at': Date,
  'updated_at': Date
});
module.exports = mongoose.model('Rate', RateSchema);
