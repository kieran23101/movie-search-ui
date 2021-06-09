import React, { Component } from "react";
import "./App.css";
//Importing Components
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Discover from "./pages/Discover";
import MovieItem from "./pages/MovieItem";
import PersonItem from "./pages/PersonItem";
import TvItem from "./pages/TvItem";
import PageNotFound from "./pages/PageNotFound";
import PopularMovies from "./pages/PopularMovies";
import YourList from "./pages/YourList";
import MyAccount from "./pages/MyAccount";
import fire from "./data/Firebase";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import { ConfigProvider } from "./data/ConfigContext";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: true
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, isLoggedIn: true });
      } else {
        this.setState({ user: null, isLoggedIn: false });
      }
    });
  }
  render() {
    const { user, isLoggedIn } = this.state;
    return (
      <ConfigProvider userData={user}>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <PrivateRoute
              authed={isLoggedIn}
              path="/logout"
              component={Logout}
              userData={user}
            />
            <PrivateRoute
              userData={user}
              authed={isLoggedIn}
              path="/"
              component={Home}
              exact
            />
            <PrivateRoute
              userData={user}
              authed={isLoggedIn}
              path="/account"
              component={MyAccount}
              exact
            />
            <PrivateRoute
              authed={isLoggedIn}
              path="/discover"
              component={Discover}
              userData={user}
            />
            <PrivateRoute
              authed={isLoggedIn}
              path="/person/:id"
              component={PersonItem}
              userData={user}
            />
            <PrivateRoute
              authed={isLoggedIn}
              userData={user}
              path="/movie/:id"
              component={MovieItem}
            />
            <PrivateRoute
              authed={isLoggedIn}
              userData={user}
              path="/tv/:id"
              component={TvItem}
            />
            <PrivateRoute
              authed={isLoggedIn}
              userData={user}
              path="/popular"
              component={PopularMovies}
            />
            <PrivateRoute
              authed={isLoggedIn}
              userData={user}
              path="/your-list"
              component={YourList}
            />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    );
  }
}

export default App;
