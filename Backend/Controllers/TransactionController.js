import Transaction from "../Models/Transaction.js";
import Account from "../Models/Account.js";
import mongoose from "mongoose";

export const createTransaction = async (req, res) => {
  const { account } = req;
  try {
    const { Type, amount, category_id } = req.body;

    if (!Type || !amount || !category_id) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["credit", "debit"].includes(Type)) {
      return res
        .status(400)
        .json({ message: "Type must be either credit or debit." });
    }

    const newAmount =
      Type === "credit"
        ? parseFloat(amount + account.balance)
        : parseFloat(account.balance - amount);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      account.balance = newAmount;
      await account.save();
      const updatedAccount = await Account.findById(account._id);

      const newTransaction = new Transaction({
        Type,
        amount,
        account_id: account._id,
        category_id,
      });

      newTransaction.save();

      await session.commitTransaction();
      return res.status(201).json({
        message: "Transaction created successfully.",
        transaction: newTransaction,
      });
    } catch (err) {
      session.abortTransaction();
      return res
        .status(500)
        .json({ message: "Error creating transaction.", error: error.message });
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.log("Error: " + error);
    res
      .status(500)
      .json({ message: "Error creating transaction.", error: error.message });
  }
};

export const getTransactionsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!["credit", "debit"].includes(type)) {
      return res
        .status(400)
        .json({ message: 'Type must be either "credit" or "debit".' });
    }

    const transactions = await Transaction.find({ Type: type });

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .json({ message: `No ${type} transactions found.` });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transactions by type.",
      error: error.message,
    });
  }
};
export const getBalance = async (req, res) => {
  try {
    const { account } = req;

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching account balance.",
      error: error.message,
    });
  }
};
