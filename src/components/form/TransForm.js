import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";

const initialState = {
  type: "",
  name: "",
  amount: "",
};
export const TransForm = () => {
  const [form, setForm] = useState(initialState);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setForm(initialState);
  };
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Row className="justify-content-md-center mt-3 gap-2">
          <Col md="2" className="mb-2">
            <Form.Select
              name="type"
              defaultValue="Choose..."
              required
              onChange={handleOnChange}
              value={form.type}
            >
              Choose...
              <option>Expense</option>
              <option>Income</option>
            </Form.Select>
          </Col>
          <Col md="5" className="mb-2">
            <Form.Control
              name="name"
              placeholder="Transaction Name"
              onChange={handleOnChange}
              required
              value={form.name}
            ></Form.Control>
          </Col>
          <Col md="2" className="mb-2">
            <Form.Control
              name="amount"
              type="number"
              placeholder="amount"
              onChange={handleOnChange}
              required
              value={form.amount}
            ></Form.Control>
          </Col>
          <Col md="2" className="mb-2">
            <div className="d-grid gap-2">
              <Button type="submit">Add</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
