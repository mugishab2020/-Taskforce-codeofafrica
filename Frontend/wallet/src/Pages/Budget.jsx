import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Budget = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!name || !description || !amount) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Amount must be a valid positive number.");
      setSuccess("");
      return;
    }
     try {
      const response = await fetch("http://localhost:3002/api/createbudget/?account_id=$(acccount_id)", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': "Bearer " + localStorage.getItem('x-auth-token') || '',

        },
        body: JSON.stringify({
         budgetData
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(data.message)
        console.log("Budget created Successfully:", data);
      } else {
        const errorData = await response.json();
        alert(errorData.message)
        setError(errorData.message || "Failed to create budget.");
      }
    }
      catch (error) {
        console.error("Error during budget creation:", error);
        setError("An error occurred. Please try again.");
      }

    const budgetData = {
      name: name,
      description: description,
      amount: parseFloat(amount),
    };

    onSubmit(handleSubmit);
    setName("");
    setDescription("");
    setAmount("");
    setError("");
    setSuccess("Budget created successfully!");
  };

  return (
    <Container className="mt-4">
      <h2>Create Budget</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter budget name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter budget description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="amount">
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
    </Container>
  );
};

export default Budget;
