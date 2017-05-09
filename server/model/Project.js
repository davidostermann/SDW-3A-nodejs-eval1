const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProjectSchema = new Schema({
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  'grades': [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
  'title': String,
  'description': String
});

module.exports = mongoose.model('Project', ProjectSchema);
