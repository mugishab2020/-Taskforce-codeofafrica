import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true},
  balance: { type: Number,  defaultValue: 0 },
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
 });


export default mongoose.model('Account', accountSchema);