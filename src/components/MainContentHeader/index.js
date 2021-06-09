import React, { Component } from "react";
import DropdownButton from "../DropdownButton";
import ListItems from "../../data/AccountInfoMenuList";
import NotificationList from "../../data/NotificationsList";
import ApiHelper from "../../data/FetchData";
import PopulateSeach from "../PopulateSearch";
class MainContentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchResults: {},
      isLoading: true
    };
    this.toggleSearch = this.toggleSearch.bind(this);
  }
  toggleSearch(e) {
    e.stopPropagation();
    this.setState({ isSearching: !this.state.isSearching });
  }
  onSeriesInputChange = e => {
    this.setState({
      seriesName: e.target.value
    });
    let options = {
      query: e.target.value
    };
    ApiHelper.search(options).then(data =>
      this.setState({
        searchResults: data.results,
        isLoading: data.isLoading,
        searchTerm: ""
      })
    );
  };
  render() {
    return (
      <div className="app-main-header">
        <div className="app-main-header-arrows">
          <div className="left">
            <i className="fa fa-angle-left" aria-hidden="true" />
          </div>
          <div className="right">
            <i className="fa fa-angle-right" aria-hidden="true" />
          </div>
        </div>
        {this.state.isSearching ? (
          <div className="app-main-search">
            <input
              type="text"
              className="app-main-input"
              placeholder="Your search term..."
              onChange={this.onSeriesInputChange}
            />
            <div className="app-main-search-output">
              <ul>
                {Object.keys(this.state.searchResults).map((item, i) => (
                  <PopulateSeach
                    key={item}
                    link={`/${this.state.searchResults[item].media_type}/${
                      this.state.searchResults[item].id
                    }`}
                    title={
                      this.state.searchResults[item].name ||
                      this.state.searchResults[item].title
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="app-main-account">
          <i
            className="fa fa-search"
            onClick={this.toggleSearch}
            aria-hidden="true"
          />
          <DropdownButton
            name="notificationIcon"
            list={NotificationList}
            content
            right
          >
            <i className="fa fa-bell notification-btn" aria-hidden="true" />
          </DropdownButton>
          <DropdownButton name="accountInfoBtn" list={ListItems}>
            <div className="app-main-account-info">
              <img src={this.props.userImage} alt={this.props.username} />
              <div className="account-info">
                <h4>{this.props.username}</h4>
                <p>Manage Account</p>
              </div>
            </div>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default MainContentHeader;
