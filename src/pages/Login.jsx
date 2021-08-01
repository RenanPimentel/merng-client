import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../graphql/mutations";

function Login() {
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
      label: "Password",
      placeholder: "Password...",
      name: "password",
      value: "",
      type: "password",
    },
  ]);
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    variables: values.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    ),

    update(_, result) {
      context.login(result.data.login);
      history.push("/");
    },

    onError(err) {
      setFormErrors(err.graphQLErrors[0]?.extensions.exception.errors);
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    loginUser();
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
          <h1>Login</h1>
        </Container>
        {values.map(value => (
          <Form.Input
            {...value}
            onChange={handleChange}
            error={Boolean(formErrors[value.name])}
            key={value.name}
          />
        ))}
        <Button type="submit" primary>
          Login
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

export default Login;
