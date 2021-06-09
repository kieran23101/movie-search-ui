import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();
class ConfigProvider extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider value={{ user: this.props.userData }}>
          {this.props.children}
        </Provider>
      </React.Fragment>
    );
  }
}
export { ConfigProvider };

// I make this default since it will probably be exported most often.
export default Consumer;
