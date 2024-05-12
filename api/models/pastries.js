const mongoose = require('mongoose');

const pastrySchema = new mongoose.Schema({
  name: String,
  image: String,
  stock: Number,
  won: Number
},
{ collection: 'pastries' }
)

const Pastry = mongoose.model('Pastry', pastrySchema);

module.exports = Pastry;