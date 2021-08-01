import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST } from "../graphql/mutations";
import { FETCH_POSTS } from "../graphql/queries";

function PostForm() {
  const [values, setValues] = useState({ body: "" });
  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,

    update(cache, result) {
      const data = { ...cache.readQuery({ query: FETCH_POSTS }) };
      data.getPosts = [result.data.createPost, ...data.getPosts];
      cache.writeQuery({ query: FETCH_POSTS, data });

      setValues({ body: "" });
    },

    onError(err) {
      return err;
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    createPost();
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi world!"
            name="body"
            value={values.body}
            onChange={handleChange}
            error={Boolean(error)}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: "20px" }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default PostForm;
