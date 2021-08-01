import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_COMMENT, DELETE_POST } from "../graphql/mutations";
import { FETCH_POSTS } from "../graphql/queries";
import MyPopup from "./MyPopup";

function DeleteButton({ postId, callback, commentId }) {
  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId, commentId },
    update(cache) {
      if (!commentId) {
        const data = { ...cache.readQuery({ query: FETCH_POSTS }) };
        data.getPosts = data.getPosts.filter(({ id }) => id !== postId);
        cache.writeQuery({ query: FETCH_POSTS, data });
      }

      setConfirmOpen(false);
      if (callback) callback();
    },

    onError(err) {
      console.log({ err });
    },
  });

  return (
    <>
      <MyPopup content={`Delete ${commentId ? "comment" : "post"}`} inverted>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: "0" }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;
