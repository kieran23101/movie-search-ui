import React, { Component } from "react";
import SidebarContainer from "../containers/SidebarContainer";
class PageNotFound extends Component {
  state = {};
  render() {
    return (
      <div className="app-wrapper">
        <SidebarContainer />
        <div className="error-wrapper">
          <h1>
            There was an error when trying to find the page that you wanted
          </h1>
          <p>
            The page that you were looking has been removed or does no longer
            exist <br />
            We recommend that you return to the homepage and use the navigation
            to warp around the site
          </p>
          <a href="/" className="button-btn">Home</a>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
