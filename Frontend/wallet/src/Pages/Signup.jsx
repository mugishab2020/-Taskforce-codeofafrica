import { useState } from "react";
import React from "react";
import { Form, Button, Container,  Card } from "react-bootstrap";

const SignUp = () => {
   
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        console.log('FORM DATA', formData);



    try {
      const response = await fetch("http://localhost:3002/api/users//signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message)
        console.log("Sign up successful:", data);
      } else {
        const errorData = await response.json();
        alert(errorData.message)
        setErrorMessage(errorData.message || "Failed to sign up.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Sign Up</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
              name="username"
               type="text"
               placeholder="Enter username" 
               value={formData.username}
               onChange={handleChange}
              
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
              type="text"
              name='firstName'
              placeholder="Enter first name"

               value={formData.firstName}
               onChange={handleChange}

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName} 
              onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" 
              value={formData.email}
              name="email"
               onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
              placeholder="Password" 
              value={formData.password}
              name="password"
               onChange={handleChange}
             
               />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit} className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          Already have an account? <a href="/login">Log in</a>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default SignUp;
