import firebase from "firebase";
import Notification from "../../data/NotificationPopups";
export default {
  createNewList: function(value, userID) {
    var database = firebase.database();
    var ref = database.ref(`Lists/${userID}`);
    ref
      .update({ listTitle: value })
      .then(() => {
        Notification.success("List Created", "You have created a new list");
      })
      .catch(e => {
        console.log(e);
        Notification.error("Creation Error", e.message);
      });
  },
  addToList: function(userID, movieID) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output =
      day +
      "-" +
      (("" + month).length < 2 ? "0" : "") +
      month +
      "-" +
      (("" + day).length < 2 ? "0" : "") +
      d.getFullYear();
    var data = {
      dateAdded: output,
      watched: false,
      movie_id: localStorage.getItem("currentMovieID")
    };
    var database = firebase.database();
    var ref = database.ref(`Lists/${userID}/movies`);
    ref
      .orderByChild("movie_id")
      .equalTo(`${movieID}`)
      .on("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
          console.log(data.length);
        });
      });
    ref.push(data);
  },
  removeFromList: function(movieID, userID) {
    var database = firebase.database();
    var ref = database.ref(`Lists/${userID}/movies`);
    ref
      .orderByChild("movie_id")
      .equalTo(`${movieID}`)
      .on("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data) {
          console.log(data.key);
          snapshot.ref.child(`${data.key}`).remove();
          Notification.error(
            "List Item Removed",
            "You have removed an item from your list!"
          );
        });
      });
  },
  checkUserHasList: function(userID) {
    return new Promise(function(resolve, reject) {
      const dbRefObject = firebase
        .database()
        .ref()
        .child(`Lists/${userID}`);
      if (dbRefObject) {
        dbRefObject.on("value", snap => {
          resolve({
            Movielists: snap.val() ? snap.val().movies : {},
            ListTitle: snap.val() ? snap.val().listTitle : "",
            ListId: snap.key || "",
            isLoading: false,
            hasList: snap.val() ? true : false
          });
          
        });
      } else {
        console.log("User doesnt have a list");
      }
    });
  }
};
