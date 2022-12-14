import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CustomeInput } from "../components/custom-input/CustomInput";

import { Layout } from "../components/layout/Layout";
import { loginUser } from "../utils/axiosHelper";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [logInDetails, setLogInDetails] = useState({});
  const [response, setReponse] = useState({});
  const inputFields = [
    {
      label: "Email",
      placeholder: "your@gmail.com",
      required: true,
      name: "email",
      type: "email",
      value: logInDetails.email,
    },
    {
      label: "pin",
      placeholder: "1234",
      required: true,
      name: "pin",
      type: "number",
      min: 1000,
      max: 9999,
      value: logInDetails.pin,
    },
  ];
  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setLogInDetails({ ...logInDetails, [name]: value });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { data } = await loginUser(logInDetails);
    data.status === "success" && setReponse(data);

    setReponse(data);
    if (data.status === "success") {
      navigate("/dashboard");
      sessionStorage.setItem("user", JSON.stringify(data));
    }
  };

  return (
    <Layout>
      <Form className="login-page" onSubmit={handleOnSubmit}>
        <h2>Welcome Back! Login</h2>
        <hr />
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        {inputFields.map((item) => (
          <CustomeInput {...item} onChange={onChangeHandle} />
        ))}

        <Button variant="primary" type="submit">
          Login
        </Button>

        <div className="text-end">
          New here? <Link to="/register"> register </Link>
        </div>
      </Form>
    </Layout>
  );
};
