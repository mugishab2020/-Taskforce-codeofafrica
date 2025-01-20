import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import TransactionTracker from "./Pages/TransactionTracker";
import ReportGenerator from "./Pages/ReportGenerator";
import CreateAccountForm from "./Pages/CreateAccountForm";
import Budget from "./Pages/Budget";
import Category from "./Pages/Category";
import Accounts from "./Pages/Accounts";

function App() {
  const incomingTransactions = [
    { id: "1", date: "2025-01-15", amount: 200000, category: "Salary" },
    { id: "2", date: "2025-01-16", amount: 150000, category: "Freelance" },
  ];

  const outgoingTransactions = [
    { id: "3", date: "2025-01-17", amount: 8000, category: "Groceries" },
    { id: "4", date: "2025-01-18", amount: 60000, category: "Rent" },
  ];
  const transactions = [
    {
      id: "1",
      date: "2025-01-15",
      amount: 200,
      category: "Salary",
      type: "credit",
    },
    {
      id: "2",
      date: "2025-01-17",
      amount: 50,
      category: "Groceries",
      type: "debit",
    },
    {
      id: "3",
      date: "2025-01-18",
      amount: 100,
      category: "Rent",
      type: "debit",
    },
    {
      id: "4",
      date: "2025-01-20",
      amount: 300,
      category: "Freelance",
      type: "credit",
    },
  ];

  const handleCreateAccount = async (accountData) => {
    // Send account data to the server
    console.log("Account created:", accountData);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/transactions"
          element={
            <TransactionTracker
              incomingTransactions={incomingTransactions}
              outgoingTransactions={outgoingTransactions}
            />
          }
        />
        <Route
          path="/generate-report"
          element={<ReportGenerator transactions={transactions} />}
        />
        <Route
          path="/create-budget"
          element={
            <Budget
              onSubmit={() => {
                console.log("Account created");
              }}
            />
          }
        />
        <Route path="/create-category" element={<Category />} />
        <Route
          path="/create-account"
          element={<CreateAccountForm onSubmit={handleCreateAccount} />}
        />
        <Route path="/get-accounts" element={<Accounts />} />
      </Routes>
    </Router>
  );
}

export default App;
