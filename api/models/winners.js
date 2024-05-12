import { Schema, model } from 'mongoose';

const winnerSchema = new Schema({
  userName: { type: String, required: true},
  pastry: { type: Array, required: true },
  date : { type: Date, required: true },
  number: { type: Number, required: true },
}, 
{ collection:'winners' }
)

const Winner = model('Winner', winnerSchema);

export default Winner;