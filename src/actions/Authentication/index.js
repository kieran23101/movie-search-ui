import fire from "../../data/Firebase";
import firebase from "firebase";
import Notification from "../../data/NotificationPopups";
export default {
  Login: function(email, password) {
    return new Promise(function(resolve, reject) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log(error);
        });
    });
  },
  Signup: function(email, password, username, phonenumber) {},
  Logout: function() {},
  getUserProfile: function() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      console.log(user);
    }
  },
  updateDisplayName: function(displayName) {
    var user = firebase.auth().currentUser;

    if (displayName === "") {
      Notification.error("You cannot have an empty name!", "Error");
    } else {
      user
        .updateProfile({
          displayName: displayName
        })
        .then(function() {
          Notification.success("Your Display Name was updated!", "Success");
        })
        .catch(function(error) {
          Notification.error(error.message, "Error");
        });
    }
  },
  updateUserPassword: function(password) {
    var user = firebase.auth().currentUser;
    var newPassword = password;

    user
      .updatePassword(newPassword)
      .then(function() {
        Notification.success("Password Updated", "Success");
      })
      .catch(function(error) {
        Notification.error(error.message, "Error");
      });
  },
  closeAccount() {
    var user = firebase.auth().currentUser;
    user
      .delete()
      .then(function() {
        Notification.success("You have closed your account", "Success");
      })
      .catch(function(error) {
        Notification.error(error.message, "Error");
      });
  },
  SaveUserToServer: function(user) {
    if (user === {}) {
      console.log("User object empty");
    } else {
      var data = {
        Profile: {
          displayName: "Example Name",
          emailVerified: false,
          phoneNumber: "07786260429",
          photoURL: "http://via.placeholder.com/40"
        }
      };
      var database = fire.database();
      var ref = database.ref(`${user.uid}`);
      ref.push(data);
      console.log("saved to server");
    }
  }
};
