import React, { Component } from "react";
import ApiHelper from "../data/FetchData";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import MainContentRow from "../components/MainContentRow";
import CheckIsLoading from "../components/CheckIsLoading";
import firebase from "firebase";
class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recommendedList: [],
      tellyList: [],
      isLoading: true
    };
  }

  componentDidMount() {
    let options1 = {
      page: 2,
      primary_release_year: 2010,
      include_adult: false,
      include_video: true
    };
    ApiHelper.getMovies(options1).then(data =>
      this.setState({
        recommendedList: data.results,
        isLoading: data.isLoading
      })
    );

    let options2 = {
      page: 1,
      include_adult: false,
      include_video: true,
      primary_release_year: 2008
    };

    ApiHelper.getMovies(options2).then(data =>
      this.setState({
        tellyList: data.results,
        isLoading: data.isLoading
      })
    );
  }

  render() {
    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer>
          <CheckIsLoading isLoading={this.state.isLoading}>
            <div className="app-main-area">
              <MainContentRow
                title="Great films from 2010"
                list={this.state.recommendedList || null}
                type="movie"
              />
              <MainContentRow
                title="Movies from 2008"
                list={this.state.tellyList}
                type="movie"
              />
            </div>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}
export default Discover;
