import { BrowserRouter, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </Switch>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
