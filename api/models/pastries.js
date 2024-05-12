import { Schema, model } from 'mongoose';

const pastrySchema = new Schema({
  name: String,
  image: String,
  stock: Number,
  won: Number
},
{ collection: 'pastries' }
)

const Pastry = model('Pastry', pastrySchema);

export default Pastry;