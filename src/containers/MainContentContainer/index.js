import React, { Component } from "react";
import MainContentHeader from "../../components/MainContentHeader";
import Consumer from "../../data/ConfigContext";
class MainContentContainer extends Component {
  render() {
    var appInlineBG = {};
    if (this.props.backgroundImage) {
      appInlineBG = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          this.props.backgroundImage
        })`
      };
    }
    return (
      <div className="app-main-wrapper" style={appInlineBG}>
        <Consumer>
          {context => {
            return (
              <MainContentHeader
                username={context.user.displayName}
                userImage={context.user.photoURL}
              />
            );
          }}
        </Consumer>
        {this.props.children}
      </div>
    );
  }
}

export default MainContentContainer;
