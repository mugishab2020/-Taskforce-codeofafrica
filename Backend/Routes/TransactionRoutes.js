import express from "express";
import {
  createTransaction,
  getTransactionsByType,
  getBalance,
} from "../Controllers/TransactionController.js";
import verifyJWT from "../Midlleware/userAthentication.js";
import ownership from "../Midlleware/ownership.js";

const transactionRouter = express.Router();

transactionRouter.post(
  "/create-transaction",
  verifyJWT,
  ownership,
  createTransaction
);
transactionRouter.get("/getBalance", verifyJWT, ownership, getBalance);
transactionRouter.get("/by-type/:type", verifyJWT, getTransactionsByType);

export default transactionRouter;
