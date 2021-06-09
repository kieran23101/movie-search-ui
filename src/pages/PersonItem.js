import React, { Component } from "react";
import firebase from "firebase";
import SidebarContainer from "../containers/SidebarContainer";
import MainContentContainer from "../containers/MainContentContainer";
import ApiHelper from "../data/FetchData";
import CheckIsLoading from "../components/CheckIsLoading";
import { NotificationContainer } from "react-notifications";
class PersonItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {},
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
    ApiHelper.getPerson(options, id).then(data =>
      this.setState({
        person: data.results,
        isLoading: data.isLoading,
        id: data.id
      })
    );
    var ref = database.ref(`Lists/${localStorage.getItem("userID")}/listTitle`);
    ref.on("value", snapshot => {
      this.setState({ hasList: snapshot.exists() });
    });
  }

  render() {
    const { person } = this.state;

    return (
      <div className="app-wrapper color-bg">
        <SidebarContainer />
        <MainContentContainer backgroundImage={person.profile_path}>
          <CheckIsLoading isLoading={this.state.isLoading}>
            <NotificationContainer />
            <div className="discover-detail-image-fade" />
            <div className="app-main-area">
              <div className="movie">
                <h2 className="movie-title">{person.name}</h2>
                <div className="movie-info">
                  <div className="vote-stars">
                    <div className="rating ml-0">
                      <h4 className="rating-text">
                        {person.birthday} • {person.place_of_birth} • {person.known_for_department}
                      </h4>
                    </div>
                  </div>
                </div>
                <p className="movie-overview">{person.biography}</p>
              </div>
            </div>
          </CheckIsLoading>
        </MainContentContainer>
      </div>
    );
  }
}
export default PersonItem;
