const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  'note': Number,
  'created_at': Date
});

module.exports = mongoose.model('Project', ProjectSchema);
