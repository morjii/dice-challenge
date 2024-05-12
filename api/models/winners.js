const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  userName: { type: String, required: true},
  pastry: { type: Array, required: true },
  date : { type: Date, required: true },
  number: { type: Number, required: true },
}, 
{ collection:'winners' }
)

const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;