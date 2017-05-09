const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  'grades': [{ type: Schema.Types.ObjectId, ref: 'Grade' }],
  'age': Number,
  'name': String,
  'type': String
});

module.exports = mongoose.model('User', UserSchema);
