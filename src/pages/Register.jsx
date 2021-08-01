import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../graphql/mutations";

function Register() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [formErrors, setFormErrors] = useState({});
  const [values, setValues] = useState([
    {
      label: "Username",
      placeholder: "Username...",
      name: "username",
      value: "",
      type: "text",
    },
    {
      label: "Email",
      placeholder: "Email...",
      name: "email",
      value: "",
      type: "email",
    },
    {
      label: "Password",
      placeholder: "Password...",
      name: "password",
      value: "",
      type: "password",
    },
    {
      label: "Confirm password",
      placeholder: "Confirm password...",
      name: "confirmPassword",
      value: "",
      type: "password",
    },
  ]);
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    variables: values.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    ),

    update(_, result) {
      context.login(result.data.register);
      history.push("/");
    },

    onError(err) {
      setFormErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    registerUser();
  };

  const handleChange = e => {
    setValues(
      values.map(value =>
        value.name === e.target.name
          ? { ...value, value: e.target.value }
          : value
      )
    );
  };

  return (
    <main className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <Container className="page-title">
          <h1>Register</h1>
        </Container>
        {values.map(value => (
          <Form.Input
            {...value}
            onChange={handleChange}
            key={value.name}
            error={Boolean(formErrors[value.name])}
          />
        ))}
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.values(formErrors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(formErrors).map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default Register;
