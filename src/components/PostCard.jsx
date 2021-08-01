import moment from "moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import MyPopup from "./MyPopup";

function PostCard(post) {
  const { user } = useContext(AuthContext);
  const { body, username, createdAt, id, commentCount, likeCount, likes } =
    post;

  return (
    <Card style={{ overflow: "hidden" }} fluid>
      <Card.Content>
        <Card.Header>
          <MyPopup content="User">
            <span>{username}</span>
          </MyPopup>
        </Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton postId={id} likeCount={likeCount} likes={likes} />
        <MyPopup content="comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button basic color="blue">
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {user?.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
