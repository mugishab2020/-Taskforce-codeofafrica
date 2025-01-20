import express from "express";
import {
  createAccount,
  createBudget,
  getAccount,
} from "../Controllers/budgetController.js";
import checkAccountOwnership from "../Midlleware/ownership.js";
import verifyJWT from "../Midlleware/userAthentication.js";

const Accountroutes = express.Router();
const BudgetRoutes = express.Router();
Accountroutes.post("/", verifyJWT, createAccount);
Accountroutes.get("/getAccount", verifyJWT, getAccount);
BudgetRoutes.post("/", verifyJWT, checkAccountOwnership, createBudget);

export { Accountroutes, BudgetRoutes };
