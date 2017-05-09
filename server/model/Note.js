const mongoose = require('mongoose');
const {Schema} = mongoose;

const NoteSchema = new Schema({
  '_creator': {
    'ref': 'User',
    'type': Schema.Types.ObjectId,
  },
  '_project': {
    'ref': 'Project',
    'type': Schema.Types.ObjectId,
  },
  'note': {
    'type': Number,
    'min': 0,
    'max': 10,
  },
  'lastModificationDate': {
    'type': Date,
    'default': Date.now
  },
  'creationDate': Date
});

module.exports = mongoose.model('Note', NoteSchema);
