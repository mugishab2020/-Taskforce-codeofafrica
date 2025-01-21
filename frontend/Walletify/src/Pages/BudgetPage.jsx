import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/Axios';

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
    try {
      const response = await axiosInstance.get('/transactions/getTransactionbydates/', {
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mr-5">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Account Transactions</h2>

      {errorMessage && (
        <div className="alert bg-red-100 text-red-700 border border-red-300 p-3 rounded-md mb-4">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="alert bg-green-100 text-green-700 border border-green-300 p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="account" className="block text-gray-700 font-medium mb-2">Select Account:</label>
            <select
              id="account"
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">--Select an Account--</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Get Transaction Report
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h3>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto bg-white border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created At</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.Type}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{transaction.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(transaction.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No transactions found for the selected account and date range.</p>
        )}
      </div>
    </div>
  );
};

export default Report;