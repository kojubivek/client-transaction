import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { CustomeInput } from "../components/custom-input/CustomInput";
import { Layout } from "../components/layout/Layout";
import { postUser } from "../utils/axiosHelper";

export const Register = () => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState({});

  const inputFields = [
    {
      label: "Name",
      placeholder: "Same Smith",
      required: true,
      name: "name",
      type: "text",
    },
    {
      label: "Email",
      placeholder: "your@gmail.com",
      required: true,
      name: "email",
      type: "email",
    },
    {
      label: "pin",
      placeholder: "1234",
      required: true,
      name: "pin",
      type: "number",
      min: 1000,
      max: 9999,
    },
  ];
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { data } = await postUser(form);
    setResponse(data);
  };
  return (
    <Layout>
      <Form className="login-page" onSubmit={handleOnSubmit}>
        <h2>Register</h2>
        <hr />

        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        {inputFields.map((item) => (
          <CustomeInput {...item} onChange={handleOnChange} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
        <div className="text-end">
          Already have an accopunt? <Link to="/"> Login now </Link>
        </div>
      </Form>
    </Layout>
  );
};
