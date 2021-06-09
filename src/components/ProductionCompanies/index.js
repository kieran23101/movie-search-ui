import React, { Component } from "react";

class ProductionCompanies extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.image == null ? (
          ""
        ) : (
          <div className="company">
            <img
              src={
                "https://image.tmdb.org/t/p/w200" +
                this.props.image
              }
              alt=""
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProductionCompanies;
