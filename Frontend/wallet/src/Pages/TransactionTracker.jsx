import React from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";

const TransactionTracker = ({ incomingTransactions, outgoingTransactions }) => {
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Incoming Transactions</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{new Date(tx.date).toLocaleDateString()}</td>
                      <td>{tx.amount} Rwf</td>
                      <td>{tx.category}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h4>Outgoing Transactions</h4>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {outgoingTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{new Date(tx.date).toLocaleDateString()}</td>
                      <td>{tx.amount} Rwf</td>
                      <td>{tx.category}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionTracker;
