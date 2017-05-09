const mongoose = require('mongoose');
const {Schema} = mongoose;

const RateSchema = new Schema({
  'rate': Number,
  'fk_te_project': String,
  'fk_te_user': String,
  'creation_date': String,
  'edit_date':String
});

module.exports = mongoose.model('Rate',RateSchema);
