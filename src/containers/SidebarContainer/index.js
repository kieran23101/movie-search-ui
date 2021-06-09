import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ApiHelper from "../../data/FetchData";
class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Genres: {},
      isLoading: true
    };
  }
  componentDidMount() {
    let options = {};
    if (!localStorage.getItem("movieNavItems")) {
      ApiHelper.getGenres(options, "movie", true).then(data =>
        this.setState({
          Genres: data.results,
          isLoading: data.isLoading
        })
      );
    } else {
      this.setState({
        Genres: JSON.parse(localStorage.getItem("movieNavItems"))
      });
      console.log(
        "Navigation Categories have been previously load via the api. Loaded from local storage to reduce API calls"
      );
    }
  }
  render() {
    return (
      <div className="app-nav-wrapper">
        <div className="app-logo">
          <NavLink to={"/"} className="logo">
            <h1>Telly</h1>
          </NavLink>
        </div>
        <div className="app-nav-items-wrapper">
          <ul className="top-nav">
            <li className="nav-title">Browse</li>
            <li>
              <NavLink to={"/discover"} activeClassName="active">
                Discover
              </NavLink>
            </li>
            <li>
              <NavLink to={"/your-list"} activeClassName="active">
                Your List
              </NavLink>
            </li>
            <li>
              <NavLink to={"/popular"} activeClassName="active">
                Popular Movies
              </NavLink>
            </li>
            <li>
              <NavLink to={"/watch-later"} activeClassName="active">
                Watch Later
              </NavLink>
            </li>
          </ul>
          <ul className="categories">
            <li className="nav-title">Categories</li>
            {Object.keys(this.state.Genres).map((item, i) => (
              <li key={item}>
                <NavLink
                  key={item}
                  to={`/${this.state.Genres[item].name.replace(" ", "-")}`}
                  activeClassName="active"
                >
                  {this.state.Genres[item].name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SidebarContainer;
