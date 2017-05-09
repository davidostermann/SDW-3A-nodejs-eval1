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
  'amount': Int,
  'dateCreated': Date,
  'dateModified': Date
});

module.exports = mongoose.model('Note', NoteSchema);
