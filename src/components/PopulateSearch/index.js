import React, { Component } from "react";

class PopulateSearch extends Component {
  state = {};
  render() {
    return (
      <li className={this.props.title === "" ? "d-none" : ""}>
        <a href={this.props.link}>{this.props.title}</a>
      </li>
    );
  }
}

export default PopulateSearch;
