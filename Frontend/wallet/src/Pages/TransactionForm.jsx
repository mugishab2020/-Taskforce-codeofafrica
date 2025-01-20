import React from 'react'

const TransactionForm = () => {
  return (
    <Form>
      <Form.Select aria-label="">
      <option>Open selection menu</option>
      <option value="credit">Credit</option>
      <option value="debit">Debit</option>
    </Form.Select>

      <Form.Group className="mb-3" controlId="amount">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" placeholder="Amount" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default TransactionForm
