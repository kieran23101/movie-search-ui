import React, { Component } from "react";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import ProductionCompanies from "../components/ProductionCompanies";
class TvItem extends Component {
  state = {
    movie: {},
    rating: 0,
    genres: [],
    prodCompanies: []
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.match.params);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=9ca53593f50ef7ae15aa5e856bce4bf1&language=en-US`
    )
      .then(response => response.json())
      .then(json =>
        this.setState({
          movie: json,
          rating: json.vote_average,
          genres: json.genres,
          prodCompanies: json.production_companies
        })
      );
  }

  componentDidUpdate() {
    var rating = this.state.rating || 0;
    const starsTotal = 10;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    document.getElementById("starsInner").style.width = starPercentageRounded;
    if (this.state.genres.hasOwnProperty("name")) {
      var genreList = this.state.genres || [];
      document.getElementById("genre").innerText = genreList[0].name;
    } else {
      console.log("No Genre name was found!");
    }
  }

  render() {
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
    const { movie } = this.state;
    console.log(movie);
    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer backgroundImage={movie.backdrop_path}>
          <div className="discover-detail-image-fade" />
          <div className="app-main-area">
            <div className="movie">
              <h2 className="movie-title">{movie.name}</h2>
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
                  <span>
                    {movie.episode_run_time || [] >= 2
                      ? ""
                      : secondsToTime(movie.episode_run_time * 60) + " • "}
                  </span>
                  <span>Episodes: {movie.number_of_episodes}</span>
                </p>
              </div>
              <p className="movie-overview">{movie.overview}</p>
              <div className="actions">
                <button href="/" className="btn btn-primary">
                  <i className="fa fa-play fa-fw" aria-hidden="true" /> Play
                  Movie
                </button>
                <button href="/" className="btn btn-outline">
                  <i className="fa fa-th-list fa-fw" aria-hidden="true" /> Watch
                  Later
                </button>
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
        </MainContentContainer>
      </div>
    );
  }
}
export default TvItem;
