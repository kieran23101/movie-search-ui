import React, { Component } from "react";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import CheckIsLoading from "../components/CheckIsLoading";

class Home extends Component {
  state = {
    isLoading: false
  };
  render() {
    var headingStyle = {
      color: "#fff",
      fontSize: "5rem"
    };
    var wrapperStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    };
    return (
      <div className="app-wrapper">
        <CheckIsLoading
          isLoading={this.state.isLoading}
        >
          <SidebarContainer />
          <MainContentContainer>
            <div style={wrapperStyle}>
              <h1 style={headingStyle}>Welcome to Telly</h1>
            </div>
          </MainContentContainer>
        </CheckIsLoading>
      </div>
    );
  }
}

export default Home;
