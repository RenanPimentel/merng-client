import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Container, Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { FETCH_POSTS } from "../graphql/queries";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS);

  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          <Container className="page-title">
            <h1>Recent Posts</h1>
          </Container>
        </Grid.Row>
        <Grid.Row>
          {Boolean(user) && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h1>loading posts...</h1>
          ) : (
            <Transition.Group>
              {data.getPosts.map(post => (
                <Grid.Column
                  key={post.id}
                  style={{ marginBottom: "20px", boxShadow: "none" }}
                >
                  <PostCard {...post} />
                </Grid.Column>
              ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Home;
