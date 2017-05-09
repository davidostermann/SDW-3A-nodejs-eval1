const mongoose = require('mongoose');
const {Schema} = mongoose;

const GradeSchema = new Schema({
  '_user': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  'creation_date': { type: Date, default: Date.now },
  'modification_date': { type: Date, default: Date.now },
  'grade': { type: Number, min: 1, max: 10 }
});

module.exports = mongoose.model('Grade', GradeSchema);
