const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId
  },
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId
  },
  'note': {
    type: Number,
    min: 1,
    max: 10
  },
  'dateCreated': Date,
  'dateModified': Date
});

module.exports = mongoose.model('Note', NoteSchema);
