import mongoose from 'mongoose';



const CategorySchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  created_at: { type: Date, default: Date.now }

 });


export default mongoose.model('Category', CategorySchema);