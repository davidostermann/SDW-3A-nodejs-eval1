const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  'project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  'grade': String,
  'date' : String,
  'updateDate' : String,
  'grader': {
    'ref': 'User', 
    'type': Schema.Types.ObjectId,
    index: { unique: true }
  },
});

module.exports = mongoose.model('Grade', UserSchema);
