import React, { Component } from "react";
import RecommendedList from "../RecommendedList";
import Slider from "react-slick";

class MainContentRow extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  state = {};
  render() {
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 1,
      arrows: false,
      touchMove: false
    };
    return (
      <div>
        {this.props.list === null || undefined ? (
          ""
        ) : (
          <div className="app-main-area-row">
            <div className="app-main-area-row-title">
              <h1>{this.props.title}</h1>
            </div>
            <div className="app-main-area-row-content">
              <Slider ref={c => (this.slider = c)} {...settings}>
                {Object.keys(this.props.list).map((item, i) => (
                  <RecommendedList
                    key={i}
                    title={this.props.list[item].title}
                    genre={this.props.list[item].genre}
                    movieLength={this.props.list[item].movieLength}
                    year={this.props.list[item].year}
                    image={
                      "https://image.tmdb.org/t/p/w200/" +
                      this.props.list[item].poster_path
                    }
                    link={`/${this.props.type}/` + this.props.list[item].id}
                    adult={this.props.list[item].adult}
                  />
                ))}
              </Slider>
              <div className="app-main-area-nav">
                <button
                  className="btn btn-dark btn-sm prev-btn"
                  onClick={this.previous}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true" />
                </button>
                <button
                  className="btn btn-dark btn-sm next-btn"
                  onClick={this.next}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MainContentRow;
