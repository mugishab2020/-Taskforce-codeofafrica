import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const CreateAccountForm = ({ onSubmit }) => {
   const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [ErrorMessage, setErrorMessage] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3002/api/createaccounts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'x-auth-token': "Bearer " + localStorage.getItem('x-auth-token') || '',
        },
        body: JSON.stringify({
            name: name
        }),
      });
       
      if (response.ok) {

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('x-auth-token', token);

      console.log("Auth token: " + token);

        alert(data.message)
        console.log("Account created Successfully:", data);
      } else {
        const errorData = await response.json();
        alert(errorData.message)
        setErrorMessage(errorData.message || "Failed to Login up.");
      }
     } catch (error) {
      console.error("Error during Login up:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
    if (!name) {
      setError("Account name is required.");
      setSuccess("");
      return;
    }

    const accountData = { name};
    onSubmit(accountData);
    setSuccess("Account created successfully!");
   };
  return (
    <Container className="mt-4">
      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter account name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default CreateAccountForm;