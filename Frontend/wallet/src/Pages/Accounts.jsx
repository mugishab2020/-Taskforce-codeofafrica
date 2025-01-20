import React, { useEffect, useState } from "react";
import { Container, Table, Alert, Spinner, Form, Button } from "react-bootstrap";

const Accounts = () => {
  const [accounts, setaccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/createaccounts/getAccount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": "Bearer " + localStorage.getItem("x-auth-token") || "",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setaccounts(data.accounts);
          setError("");
        } else {
          const errorData = await response.json();
          console.log(errorData)
          setError(errorData.message || "Failed to fetch accounts.");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setError("An error occurred while fetching accounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleBudgetSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAccount || !budgetName || !amount) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/budgets/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": "Bearer " + localStorage.getItem("x-auth-token") || "",
        },
        body: JSON.stringify({
          account_id: selectedAccount,
          name: budgetName,
          amount,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Budget created successfully!");
        setError("");
        setBudgetName("");
        setAmount("");
        setSelectedAccount("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create budget.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Error creating budget:", error);
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Container className="mt-4">
      <h2>All Accounts</h2>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Loading accounts...</p>
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {!loading && !error && accounts.length === 0 && (
        <Alert variant="info">No accounts found.</Alert>
      )}
      {!loading && accounts.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Name</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={account._id}>
                  <td>{index + 1}</td>
                  <td>{account.name}</td>
                  <td>{account.balance}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h3>Create Budget</h3>
          <Form onSubmit={handleBudgetSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Account</Form.Label>
              <Form.Select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                <option value="">-- Select an Account --</option>
                {accounts.map((account) => (
                  <option key={account._id} value={account._id}>
                    {account.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Budget Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter budget name"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter budget amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create Budget
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Accounts;
