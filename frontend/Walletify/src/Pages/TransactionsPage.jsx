import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/Axios'; 

const TransactionsPage = () => {
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState({ credits: [], debits: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get(`/transactions/byAccountId/${accountId}`);
        console.log(response.data, accountId);
        const { credits, debits } = response.data;
        setTransactions({ credits, debits });
      } catch (error) {
        setError('Failed to load transactions!');
      }
    };

    fetchTransactions();
  }, [accountId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Transactions for Selected Account</h3>

        {error && (
          <div className="alert alert-danger bg-red-100 text-red-700 border border-red-300 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {accountId ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="p-4 bg-green-50 rounded-md shadow-md">
              <h4 className="font-medium text-green-600 text-xl mb-3">Credits</h4>
              {transactions.credits?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {transactions.credits.map((credit, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-semibold text-green-800">{credit.amount}</span>
                      <span className="text-sm text-gray-500">{credit.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No credits available.</p>
              )}
            </div>

            <div className="p-4 bg-red-50 rounded-md shadow-md">
              <h4 className="font-medium text-red-600 text-xl mb-3">Debits</h4>
              {transactions.debits?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {transactions.debits.map((debit, index) => (
                    <li key={index} className="flex justify-between">
                      <span className="font-semibold text-red-800">{debit.amount}</span>
                      <span className="text-sm text-gray-500">{debit.date}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No debits available.</p>
              )}
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-600">Select a wallet to view transactions.</p>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
