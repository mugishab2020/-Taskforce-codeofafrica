import React, { useState} from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const Login = () => {
      
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
      const response = await fetch("http://localhost:3002/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),
      });
       
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const userId = data.user._id;
        localStorage.setItem('userId', userId);
      localStorage.setItem('x-auth-token', token);
      console.log("UserId", userId)
      console.log("Auth token: " + token);

        alert(data.message)
        console.log("login up successful:", data);
      } else {
        const errorData = await response.json();
        alert(errorData.message)
        setErrorMessage(errorData.message || "Failed to Login up.");
      }
    } catch (error) {
      console.error("Error during Login up:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
};
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Log In</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email"
              value={formData.email}
              name="email"
              placeholder="Enter email" 
              onChange={handleChange}/>
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
              name="password"
              placeholder="Password"
              value={formData.password}

              onChange={handleChange} 
              />
            </Form.Group>

            <Button variant="primary" type="submit"  onClick = {handleSubmit} className="w-100">
              Log In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          Don't have an account? <a href="/signup">Sign Up</a>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
