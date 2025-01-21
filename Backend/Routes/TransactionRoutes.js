import express from "express";
import {
  createTransaction,
  getTransactionsByAccountId,
  getBalance,
  getTransactions,
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
transactionRouter.get(
  "/byAccountId/:accountId",
  verifyJWT,
  getTransactionsByAccountId
);
transactionRouter.get(
  "/getTransactionbydates/",
  verifyJWT,
  ownership,
  getTransactions
);

export default transactionRouter;
