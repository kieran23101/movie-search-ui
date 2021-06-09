import React, { Component } from "react";
import fire from "../data/Firebase";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: "",
      password: "",
      displayName: "",
      photoURL: "" || "http://via.placeholder.com/40",
      error: ""
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  registerPasswordUser(email, password, displayName, photoURL) {
    var user = null;
    //nullify empty arguments
    for (var i = 0; i < arguments.length; i++) {
      arguments[i] = arguments[i] ? arguments[i] : null;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        user = fire.auth().currentUser;
      })
      .then(function() {
        user.updateProfile({
          displayName: displayName,
          photoURL: photoURL
        });
      })
      .catch(function(error) {
        console.log(error.message, 7000);
      });
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
                  value={this.state.displayName}
                  onChange={this.handleChange}
                  type="displayName"
                  name="displayName"
                  className="form-control"
                  id="displayName"
                  required
                />
                <label>Username</label>
              </div>
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
                className="form_button btn btn-outline-secondary"
                onClick={() => {
                  this.registerPasswordUser(
                    this.state.email,
                    this.state.password,
                    this.state.displayName,
                    this.state.photoURL
                  );
                }}
              >
                Signup
              </button>
            </form>
            <div className="form_other">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
            <div className="form_other">
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
