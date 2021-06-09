import React, { Component } from "react";
class CheckIsLoading extends Component {
  render() {
    const isLoading = this.props.isLoading;
    return (
      <React.Fragment>
        {isLoading === false && this.props.children}
        {isLoading === true && (
          <div
            className="app-main-area"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              minWidth: "99vw"
            }}
          >
            <i
              className="fa fa-spinner fa-spin"
              style={{ fontSize: "5rem" }}
              aria-hidden="true"
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default CheckIsLoading;
