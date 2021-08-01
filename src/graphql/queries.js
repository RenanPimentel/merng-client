const { gql } = require("@apollo/client");

module.exports = {
  FETCH_POSTS: gql`
    query {
      getPosts {
        id
        body
        username
        createdAt
        likeCount
        commentCount
        likes {
          username
        }
      }
    }
  `,

  FETCH_POST: gql`
    query getSinglePost($postId: ID!) {
      getPost(postId: $postId) {
        id
        body
        username
        createdAt
        likeCount
        commentCount
        comments {
          id
          body
          username
          createdAt
        }
        likes {
          id
          username
          createdAt
        }
      }
    }
  `,

  FETCH_USER: gql`
    query getUser($username: String!) {
      getUser(username: $username) {
        id
        username
        createdAt
      }
    }
  `,
};
