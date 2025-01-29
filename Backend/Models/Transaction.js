import mongoose from "mongoose";

//import Account from "./Account.js";

const Transactionschema = new mongoose.Schema({
  Type: {
    type: String,
    required: true,
    enum: ["credit", "debit"],
  },
  amount: { type: Number, required: true },
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", Transactionschema);
