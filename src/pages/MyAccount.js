import React, { Component } from "react";
import Actions from "../actions/Authentication";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import CheckIsLoading from "../components/CheckIsLoading";
import { NotificationContainer } from "react-notifications";
class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.handleChangeDisplayName = this.handleChangeDisplayName.bind(this);
    this.handleChangePasswordField = this.handleChangePasswordField.bind(this);
    this.handleChangeConfirmPasswordField = this.handleChangeConfirmPasswordField.bind(
      this
    );
    this.state = {
      isLoading: false,
      avatarPicked: false,
      DisplayName: "Example Name",
      Password: "",
      ConfirmPassword: ""
    };
  }
  handleChangeDisplayName(event) {
    this.setState({ DisplayName: event.target.value });
  }
  handleChangePasswordField(event) {
    this.setState({ Password: event.target.value });
  }
  handleChangeConfirmPasswordField(event) {
    this.setState({ ConfirmPassword: event.target.value });
  }
  render() {
    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer>
          <NotificationContainer />
          <CheckIsLoading isLoading={this.state.isLoading}>
            <div className="app-main-area">
              <div className="app-main-area-row account-wrapper">
                <div className="app-main-area-title">
                  <h1>My Account</h1>
                </div>
                <div className="account-fields-wrapper">
                  <div className="account-section account-avatar">
                    <h2>Pick an avatar</h2>
                    <hr />

                    <div className="avatar-picker">
                      <img
                        src="/assets/profiles/thumbnail-01.jpg"
                        className="selected"
                      />
                      <img
                        src="/assets/profiles/thumbnail-02.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-03.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-04.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-05.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-06.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-07.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-08.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-09.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-10.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-11.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-12.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-13.png"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-14.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-15.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-16.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-17.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-18.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-19.jpg"
                        onClick={this.selectAvatar}
                      />
                      <img
                        src="/assets/profiles/thumbnail-20.jpg"
                        onClick={this.selectAvatar}
                      />
                    </div>
                  </div>
                  <div className="account-section account-displayname">
                    <h2>Change your password</h2>
                    <hr />
                    <div className="input-group">
                      Display Name{" "}
                      <input
                        type="text"
                        value={this.state.DisplayName}
                        onChange={this.handleChangeDisplayName}
                        id="DisplayName"
                      />
                    </div>
                    <button
                      onClick={() => {
                        Actions.updateDisplayName(this.state.DisplayName);
                      }}
                      className="btn btn-primary ml-auto"
                    >
                      Save
                    </button>
                  </div>
                  <div className="account-section account-password">
                    <h2>Change your password</h2>
                    <hr />
                    <div className="input-group">
                      New Password{" "}
                      <input
                        type="password"
                        id="NewPassword"
                        onChange={this.handleChangePasswordField}
                      />
                    </div>
                    <div className="input-group">
                      Confirm New Password{" "}
                      <input
                        type="password"
                        id="ConfirmNewPassword"
                        onChange={this.handleChangeConfirmPasswordField}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (
                          this.state.Password === this.state.ConfirmPassword
                        ) {
                          Actions.updateUserPassword(this.state.Password);
                        } else {
                          console.log("Passwords do not match");
                        }
                      }}
                      className="btn btn-primary ml-auto"
                    >
                      Save
                    </button>
                  </div>
                  <div className="account-section account-delete-account">
                    <h2>Close Your Account</h2>
                    <hr />
                    <div className="input-group">
                      <button
                        onClick={() => {
                          Actions.closeAccount();
                        }}
                        className="btn btn-danger ml-auto"
                      >
                        Close Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}
export default MyAccount;
