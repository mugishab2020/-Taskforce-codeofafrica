import React, { useState } from "react";
import { Container, Form, Button, Table } from "react-bootstrap";

const ReportGenerator = ({ transactions }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate >= new Date(startDate) &&
        transactionDate <= new Date(endDate)
      );
    });

    setFilteredTransactions(filtered);
  };

  return (
    <Container>
      <h2 className="mt-4">Generate Report</h2>
      <Form>
        <Form.Group className="mb-3" controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleGenerateReport}>
          Generate Report
        </Button>
      </Form>

      {filteredTransactions.length > 0 ? (
        <>
          <h3 className="mt-4">Transaction Report</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="mt-4">No transactions found for the selected dates.</p>
      )}
    </Container>
  );
};

export default ReportGenerator
