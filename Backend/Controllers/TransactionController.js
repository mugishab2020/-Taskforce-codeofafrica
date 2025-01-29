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

export const getTransactionsByAccountId = async (req, res) => {
  try {
    const { account_id } = req.params;

    const transactions = await Transaction.find({
      account_id,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transactions.",
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

export const getTransactions = async (req, res) => {
  const { accountId, endDate, startDate } = req.query;
  console.log(req.query);
  try {
    const transactions = await Transaction.find({
      created_at: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      account_id: accountId,
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all transactions.",
      error: error.message,
    });
  }
};
