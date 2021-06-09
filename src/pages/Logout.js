import React, { Component } from "react";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import fire from "../data/Firebase";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {};
  }
  logout() {
    fire.auth().signOut();
    window.location = "/Discover";
  }
  render() {
    return (
      <div className="app-wrapper">
        <SidebarContainer />
        <MainContentContainer>
          <div className="app-main-wrapper">
            <button class="btn btn-primary" onClick={this.logout}>
              Logout!
            </button>
          </div>
        </MainContentContainer>
      </div>
    );
  }
}

export default Logout;
