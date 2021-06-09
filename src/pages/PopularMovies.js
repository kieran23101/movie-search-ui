import React, { Component } from "react";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import MainContentRow from "../components/MainContentRow";
import ApiHelper from "../data/FetchData";
class PopularMovies extends Component {
  state = {
    popularMovies: [],
    tvShows: [],
    isLoading: true
  };
  componentDidMount() {
    var movieOptions = {
      page: 3
    };

    ApiHelper.getPopular(movieOptions, "movie").then(data =>
      this.setState({
        popularMovies: data.results,
        isLoading: data.isLoading
      })
    );
    var TvOptions = {
      page: 8
    };
    ApiHelper.getPopular(TvOptions, "tv").then(data =>
      this.setState({
        tvShows: data.results,
        isLoading: data.isLoading
      })
    );
  }
  render() {
    function CheckIsLoading(props) {
      const isLoading = props.isLoading;
      return (
        <div>
          {isLoading === false && props.children}
          {isLoading === true && (
            <div
              className="app-main-area"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
              }}
            >
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "5rem" }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer>
          <CheckIsLoading isLoading={this.state.isLoading}>
            <div className="app-main-area">
              <MainContentRow
                title="Popular Movies"
                list={this.state.popularMovies}
                type="movie"
              />
              <MainContentRow
                title="Popular TV Shows"
                list={this.state.tvShows}
                type="tv"
              />
            </div>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}
export default PopularMovies;
