import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../src/Pages/LoginPage";
import SignupPage from "../src/Pages/SignupPage";
import Dashboard from "./Pages/Home";
import CreateAccount from "./Pages/CreateAccount";
import TransactionsPage from "./Pages/TransactionsPage";
import Report from "../src/Pages/BudgetPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./Pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/transactions/:accountId" element={<TransactionsPage />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App;