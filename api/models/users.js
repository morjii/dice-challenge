import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  chancesLeft: { type: Number, required: true, default: 3 }, // Définir une valeur par défaut
  pastriesWon: [{ type: Schema.Types.ObjectId, ref: 'Pastry' }] // Référence à des pâtisseries
});

const User = model('User', userSchema);

export default User;

