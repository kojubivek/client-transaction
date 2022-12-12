import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import { postTrans } from "../../utils/axiosHelper";
import { toast } from "react-toastify";

const initialState = {
  type: "Choose..",
  name: "",
  amount: "",
};
export const TransForm = ({ getTrans }) => {
  const [form, setForm] = useState(initialState);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await postTrans(form);

    toast[status](message);

    setForm(initialState);
    getTrans();
  };
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Row className="justify-content-md-center mt-3 gap-2">
          <Col md="2" className="mb-2">
            <Form.Select
              name="type"
              required
              defaultValue="Choose..."
              onChange={handleOnChange}
              value={form.type}
            >
              <option>Choose...</option>
              <option value="expenses">Expense</option>
              <option value="income">Income</option>
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
