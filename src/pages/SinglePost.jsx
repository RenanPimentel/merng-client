import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import React, { useContext, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, Form, Grid } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import MyPopup from "../components/MyPopup";
import { AuthContext } from "../context/auth";
import { CREATE_COMMENT } from "../graphql/mutations";
import { FETCH_POST } from "../graphql/queries";

function SinglePost() {
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const history = useHistory();
  const commentInpRef = useRef(null);
  const [comment, setComment] = useState("");
  const { data, loading } = useQuery(FETCH_POST, { variables: { postId } });
  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: { postId, body: comment },

    update() {
      setComment("");
      commentInpRef.current?.blur();
    },
  });
  const post = data?.getPost;

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : post ? (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Card fluid style={{ marginTop: "1rem" }}>
                <Card.Content>
                  <Card.Header>
                    <MyPopup content="User">
                      <span>{post.username}</span>
                    </MyPopup>
                  </Card.Header>
                  <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{post.body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton
                    postId={post.id}
                    likes={post.likes}
                    likeCount={post.likeCount}
                  />
                  {user?.username === post.username && (
                    <DeleteButton
                      postId={postId}
                      callback={() => history.push("/")}
                    />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>
                    <Form onSubmit={submitComment}>
                      <div className="ui action input fluid">
                        <input
                          type="text"
                          placeholder="Comment..."
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                          ref={commentInpRef}
                        />
                        <button
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ""}
                        >
                          Comment
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}
              {post.comments.map(comment => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user?.username === comment.username && (
                      <DeleteButton postId={post.id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>
                      {moment(comment.createdAt).fromNow(false)}
                    </Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <h1>This post doesn't exist</h1>
      )}
    </div>
  );
}

export default SinglePost;
