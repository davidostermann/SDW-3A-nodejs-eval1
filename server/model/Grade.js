const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  'title': String,
  'description': String
});

module.exports = mongoose.model('Project', ProjectSchema);
