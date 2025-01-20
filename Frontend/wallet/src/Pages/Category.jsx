import React from "react";
import { Form, Button, Container, Card } from "react-bootstrap";

const Category = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Log In</h3>
          <Form>
            <Form.Group className="mb-3" controlId="formCategoryname">
              <Form.Label>Name of Category</Form.Label>
              <Form.Control type="text" placeholder="Enter name of Category" />
            </Form.Group>        
            <Button variant="primary" type="submit" className="w-100">
              Create a new Category
            </Button>
          </Form>
        
    </Card.Body>
      </Card>
    </Container>
  );
};

export default Category;
