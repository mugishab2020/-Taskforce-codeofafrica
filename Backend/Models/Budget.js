import mongoose from 'mongoose';



const BudgetSchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  description: { type: 'string', required: true},
  amount: { type: Number, required: true},
  account_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  created_at: { type: Date, default: Date.now }

 });


export default mongoose.model('Budget', BudgetSchema);