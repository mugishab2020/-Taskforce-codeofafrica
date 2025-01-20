import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./Config/Dbconnect.js";

import usersRouter from "./Routes/UserRouter.js";
import transactionRouter from "./Routes/TransactionRoutes.js";
import {
  Accountroutes,
  BudgetRoutes,
} from "./Routes/BudgetAndAccountRoutes.js";
import categoryRoutes from "./Routes/CategoryRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
dbConnection();

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/createaccounts", Accountroutes);
app.use("/api/createbudgets", BudgetRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(process.env.PORT, "0.0.0.0");

app.on("listening", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
