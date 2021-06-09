import React, { Component } from "react";
import firebase from "firebase";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import ProductionCompanies from "../components/ProductionCompanies";
import ApiHelper from "../data/FetchData";
import CheckIsLoading from "../components/CheckIsLoading";
import { NotificationContainer } from "react-notifications";
import Action from "../actions/MyList";
class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      id: 0,
      isLoading: true,
      hasList: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    var database = firebase.database();
    let options = {
      language: "en-US"
    };
    ApiHelper.getMovie(options, id).then(data =>
      this.setState({
        movie: data.results,
        isLoading: data.isLoading,
        id: data.id
      })
    );
    var ref = database.ref(`Lists/${localStorage.getItem("userID")}/listTitle`);
    ref.on("value", snapshot => {
      this.setState({ hasList: snapshot.exists() });
    });
  }
  componentDidUpdate() {
    if (!this.state.isLoading) {
      const { movie } = this.state;
      var rating = movie.vote_average || 0;
      const starsTotal = 10;
      const starPercentage = (rating / starsTotal) * 100;
      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
      var starsElement = document.getElementById("starsInner");
      starsElement.style.width = starPercentageRounded;
      var genreList = movie.genres || [];
      if (!genreList === []) {
        document.getElementById("genre").innerText = genreList[0].name + " • ";
      }
    }
  }

  render() {
    const { movie } = this.state;
    var releaseDate = movie.release_date || "";
    var newDate = releaseDate.split("-")[0];
    function secondsToTime(secs) {
      var hours = Math.floor(secs / (60 * 60));

      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);

      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);

      var obj = {
        h: hours,
        m: minutes,
        s: seconds
      };
      var str = `${obj.h === 0 ? "" : obj.h + "hr"} ${
        obj.m === 0 ? "" : obj.m + "mins"
      }`;
      return str;
    }

    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer backgroundImage={movie.backdrop_path}>
          <CheckIsLoading isLoading={this.state.isLoading}>
            <NotificationContainer />
            <div className="discover-detail-image-fade" />
            <div className="app-main-area">
              <div className="movie">
                <h2 className="movie-title">{movie.title}</h2>
                <div className="movie-info">
                  <div className="vote-stars">
                    <div className="stars-outer fa">
                      <div className="stars-inner fa" id="starsInner" />
                    </div>
                    <div className="rating">
                      <h4 className="rating-text">
                        {movie.vote_average} <span>/ 10</span>
                      </h4>
                    </div>
                  </div>
                  <p className="movie-properties">
                    <span id="genre" />
                    {secondsToTime(movie.runtime * 60)} • {newDate}{" "}
                    {movie.adult
                      ? "• <span className='age-limit age-details'>18+</span>"
                      : ""}
                  </p>
                </div>
                <p className="movie-overview">{movie.overview}</p>
                <div className="actions">
                  {this.state.hasList ? (
                    <button
                      onClick={() => {
                        Action.addToList(localStorage.getItem("userID"), localStorage.getItem("currentMovieID"));

                      }}
                      className="btn btn-primary"
                    >
                      <i className="fa fa-play fa-fw" aria-hidden="true" /> Add
                      Movie to my list
                    </button>
                  ) : (
                    ""
                  )}
                  {this.state.hasList ? (
                    <button className="btn btn-outline">
                      <i className="fa fa-th-list fa-fw" aria-hidden="true" />{" "}
                      Watch Later
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <div className="production-companies">
                  {Object.keys(movie.production_companies || {}).map(
                    (item, i) => (
                      <ProductionCompanies
                        key={item}
                        image={movie.production_companies[item].logo_path}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}
export default MovieItem;
