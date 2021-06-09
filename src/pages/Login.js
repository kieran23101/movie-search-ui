import React, { Component } from "react";
import fire from "../data/Firebase";
import Action from "../actions/Authentication";
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    fire.auth().onAuthStateChanged(function(currentUser) {
      if (currentUser) {
        window.location = "/Discover";
      }
    });
    return (
      <div className="app-login-wrapper">
        <div className="app-main-area">
          <div className="form">
            <div className="form_logo">
              <h2>Telly</h2>
              {this.state.error ? <p>{this.state.error}</p> : ""}
            </div>
            <form className="form_items">
              <div className="form_inputs">
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  className="form-control"
                  id="EmailAddress"
                  aria-describedby="emailHelp"
                  required
                />
                <label>Email Address</label>
              </div>
              <div className="form_inputs">
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                  name="password"
                  className="form-control"
                  id="Password"
                  required
                />
                <label>Password</label>
              </div>
              <button
                className="form_button btn btn-primary"
                onClick={e => {
                  e.preventDefault();
                  Action.Login(this.state.email, this.state.password);
                }}
              >
                Log In
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  window.location = "/signup";
                }}
                className="form_button btn btn-outline-secondary"
              >
                Signup
              </button>
            </form>
            <div className="form_other">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
