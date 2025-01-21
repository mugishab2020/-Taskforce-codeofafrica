import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; 
import '../../public/styles/report.css';

const Report = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axiosInstance.get('/createaccounts/getAccount');
        setAccounts(response.data);
      } catch (error) {
        setErrorMessage('Failed to load accounts!');
      }
    };

    fetchAccounts();
  }, []);

  const fetchTransactions = async () => {
    console.log("Selected ID", selectedAccountId);
    try {
        console.log('Fetching transactions');
      const response = await axiosInstance.get(`/transactions`, {
        params: {
          accountId: selectedAccountId,
          startDate: startDate,
          endDate: endDate,
        },
      });
      
      setTransactions(response.data);
      setSuccessMessage('Transactions loaded successfully!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to load transactions!');
      setSuccessMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAccountId && startDate && endDate) {
      fetchTransactions();
    } else {
      setErrorMessage('Please select an account and provide both start and end dates.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow">
      <h2 className="text-center mb-4">Account Transactions</h2>

      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row mb-3">
          {/* Account Selection */}
          <div className="col-md-4">
            <label htmlFor="account" className="form-label">Select an Account:</label>
            <select
              id="account"
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="form-select"
            >
              <option value="">--Select an Account--</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div className="col-md-4">
            <label htmlFor="startDate" className="form-label">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="form-control"
            />
          </div>

          {/* End Date */}
          <div className="col-md-4">
            <label htmlFor="endDate" className="form-label">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Get Transaction Report
        </button>
      </form>

      {/* Transactions Table */}
      <div>
        <h3 className="mb-3">Transactions</h3>
        {transactions.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td>{transaction._id}</td>
                    <td>{transaction.Type}</td>
                    <td>{transaction.amount}</td>
                    <td>{new Date(transaction.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted">No transactions found for the selected account and date range.</p>
        )}
      </div>
    </div>
  );
};

export default Report;
