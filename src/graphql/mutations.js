const { gql } = require("@apollo/client");

module.exports = {
  REGISTER_USER: gql`
    mutation registerUser(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        token
        createdAt
      }
    }
  `,

  LOGIN_USER: gql`
    mutation loginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        token
        createdAt
      }
    }
  `,

  CREATE_POST: gql`
    mutation createUserPost($body: String!) {
      createPost(body: $body) {
        id
        body
        username
        createdAt
        likes {
          id
          createdAt
          username
        }
        comments {
          id
          createdAt
          username
          body
        }
      }
    }
  `,

  LIKE_POST: gql`
    mutation toggleLikePost($postId: ID!) {
      likePost(postId: $postId) {
        likeCount
        likes {
          id
          username
        }
      }
    }
  `,

  DELETE_POST: gql`
    mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
    }
  `,

  DELETE_COMMENT: gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
      deleteComment(postId: $postId, commentId: $commentId) {
        id
        comments {
          id
          username
          body
          createdAt
        }
        commentCount
      }
    }
  `,

  CREATE_COMMENT: gql`
    mutation createComment($postId: ID!, $body: String!) {
      createComment(postId: $postId, body: $body) {
        id
        comments {
          id
          username
          body
          createdAt
        }
        commentCount
      }
    }
  `,
};
