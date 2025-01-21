import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/Axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get("/createaccounts/getAccount");
        setAccounts(response.data);
      } catch (error) {
        setErrorMessage("Failed to load accounts!");
        setSuccessMessage("");
      }
    };

    fetchAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = { name };

    try {
      const response = await axiosInstance.post("/createaccounts/", accountData);
      if (response.status === 201) {
        setSuccessMessage("Account created successfully!");
        setErrorMessage("");
        setName("");
      } else {
        setErrorMessage("Failed to create account!");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("An error occurred while creating the account!");
      setSuccessMessage("");
    }
  };

  const handleShowTransactions = (accountId) => {
    navigate(`/transactions/${accountId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Form Section */}
        <div className="col-md-6">
          <h2 className="text-center mb-4">Create Account</h2>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Account Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter account name"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Create Account
            </button>
          </form>
        </div>

        {/* Accounts Section */}
        <div className="col-md-8 mt-5">
          <h3 className="text-center mb-4">Available Accounts</h3>
          {accounts.length > 0 ? (
            <div className="row">
              {accounts.map((account) => (
                <div key={account._id} className="col-md-6 mb-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">{account.name}</h5>
                      <p className="card-text">
                        <strong>Balance:</strong> {account.balance}
                      </p>
                      <button
                        className="btn btn-secondary w-100"
                        onClick={() => handleShowTransactions(account._id)}
                      >
                        Show Transactions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No accounts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
