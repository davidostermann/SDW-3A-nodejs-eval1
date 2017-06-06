const mongoose = require('mongoose');
const {Schema} = mongoose;

const GradeSchema = new Schema({
  '_project' : {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  'note': {
    type: Number,
    min: 1,
    max: 10
  },
  'created_at': Date,
  'updated_at': Date
});

module.exports = mongoose.model('Grade', GradeSchema);
