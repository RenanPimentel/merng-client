import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { LIKE_POST } from "../graphql/mutations";
import MyPopup from "./MyPopup";

function LikeButton({ likeCount: defaultLikeCount, postId, likes }) {
  const { user } = useContext(AuthContext);
  const [likeCount, setLikeCount] = useState(defaultLikeCount);
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST, { variables: { postId } });

  const handleClick = async () => {
    if (!user) return;

    await likePost();
    setLikeCount(likeCount + (liked ? -1 : 1));
    setLiked(!liked);
  };

  useEffect(() => {
    setLiked(Boolean(likes?.find(like => user?.username === like.username)));
  }, [likes, user]);

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} color="teal" basic to="/">
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup content={`${liked ? "Unlike" : "Like"} post`}>
      <Button as="div" labelPosition="right" onClick={handleClick}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

export default LikeButton;
