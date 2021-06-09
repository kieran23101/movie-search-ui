import React, { Component } from "react";
import ListItem from "../components/ListItem";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import Action from "../actions/MyList";
import { NotificationContainer } from "react-notifications";
import Notification from "../data/NotificationPopups";
class YourList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      Movielists: null,
      ListTitle: "",
      isLoading: true,
      hasList: false,
      lists: {},
      listName: "",
      userData: {}
    };
  }
  componentWillMount() {
    Action.checkUserHasList(`${this.props.userData.uid}`).then(data => {
      this.setState({
        Movielists: data.Movielists,
        ListTitle: data.ListTitle,
        isLoading: data.isLoading,
        hasList: data.hasList,
        lists: data.lists,
        listName: data.listName,
        userData: data.userData
      });
    });
  }
  loadData(userID) {}
  removeItem(movieID) {
    var userID = this.state.userData.uid;
    Action.removeFromList(movieID, userID);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    function CheckIsLoading(props) {
      const isLoading = props.isLoading;
      return (
        <div>
          {isLoading === false && props.children}
          {isLoading === true && (
            <div
              className="app-main-area"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%"
              }}
            >
              <i
                className="fa fa-spinner fa-spin"
                style={{ fontSize: "5rem" }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      );
    }
    function CheckHasList(props, userData) {
      const HasList = props.HasList;
      return (
        <div>
          {HasList === true && props.children}
          {HasList === false && (
            <div
              className="app-main-area"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                flexDirection: "column"
              }}
            >
              <h1>You have not yet created a list</h1>
              <h3
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  marginTop: "2rem"
                }}
              >
                If you would like to create a list, please click the button
                below:
              </h3>
              <p
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  marginTop: "2rem"
                }}
              >
                <input
                  type="text"
                  name="listName"
                  id="listName"
                  placeholder="Your list name"
                />
                <button
                  onClick={() => {
                    Action.createNewList(
                      document.getElementById("listName").value,
                      userData.uid
                    );
                  }}
                  className="btn btn-primary"
                >
                  Create List
                </button>
              </p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer>
          <NotificationContainer />
          <CheckIsLoading isLoading={this.state.userData === {}}>
            <CheckIsLoading isLoading={this.state.isLoading}>
              <CheckHasList HasList={this.state.hasList} userData={this.state.userData}>
                <div className="app-main-area">
                  <h1>
                    {!this.state.ListTitle === "" ? "" : this.state.ListTitle}
                  </h1>

                  <div className="list-container">
                    {this.state.Movielists
                      ? Object.keys(this.state.Movielists).map((item, i) => (
                          <React.Fragment>
                            <p>{i}</p>
                            <ListItem
                              key={item}
                              id={this.state.Movielists[item].movie_id}
                              time={this.state.Movielists[item].dateAdded}
                              watched={this.state.Movielists[item].watched}
                              onClick={e => {
                                e.preventDefault();
                                this.removeItem(
                                  this.state.Movielists[item].movie_id
                                );
                              }}
                            />
                          </React.Fragment>
                        ))
                      : ""}
                  </div>
                </div>
              </CheckHasList>
            </CheckIsLoading>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}

export default YourList;
