import React, { Component } from "react";
import ApiHelper from "../../data/FetchData";
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      movie: {},
      isLoading: true,
      id: this.props.movieID
    };
  }

  componentDidMount() {
    let options = {
      language: "en-US"
    };
    ApiHelper.getMovie(options, this.props.id).then(data =>
      this.setState({
        movie: data.results,
        isLoading: data.isLoading,
        id: data.id
      })
    );
  }
  removeItem() {}
  render() {
    const { movie } = this.state;
    return (
      <div className="list-item" data-movieID={this.props.id}>
        <div className="item-wrapper">
          <div className="item-content">
            <div
              className="item-image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w200/${
                  movie.poster_path
                })`
              }}
            />
            <h4 className="item-title">{movie.title}</h4>
            <div className="item-info">
              <div className="bottom-info">
                <p>Date Added: {this.props.time}</p>
              </div>
              <a
                href="/remove"
                className="remove-btn"
                onClick={this.props.onClick}
              >
                Remove
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
