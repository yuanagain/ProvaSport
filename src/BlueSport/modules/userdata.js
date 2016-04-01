/*TODO:
 */

var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
var FireURL = "https://incandescent-torch-5505.firebaseio.com";
var User = {
  name: "",
  userid: 0,
  email: "",
  playerid: 0,
/* TODO session token? NO Firebase will handle this if we decide on a session token scheme */
}
var ref;
class User {
  /* Creates a new user if there is none or logins a user if exists in database */
  constructor(email, password, isNew) {
    /*given email and password
    checks if matches login
    if so create if not
    session token? this wil be where the user will be authenticated throught he node.js
    npm install firebase-token-generator --save
    */
    /*
    var ref = new Firebase("https://incandescent-torch-5505.firebaseio.com");
    ref.authWithPassword({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, authData) {  }, {
      remember: "sessionOnly"
    });
    */
  // Register the callback to be fired every time auth state changes
    ref = new Firebase("https://incandescent-torch-5505.firebaseio.com");
    ref.onAuth(authDataCallback);
    /* LOGIN TODO
    On Shutdown: ref.unauth(); to deauthorize.
    */
    if (isNew){
      newName();
    }
    else {
      ref.authWithPassword({
        email    : email,
        password : password
      }, authHandler);
    }
    /*Firebase generate a user id*/
  }

  function authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      ref.offAuth(authDataCallback);// logged in no longer need to listen for login
    } else {
      console.log("User is logged out");
    }
  }
  /* authenitcation handler */
  function authHandler() {
    ref.offAuth()
  }

  var isNewUser = true;
  var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData)
      });
    }
  });
  function create() {
    /*Actual login*/
  }
  /*set everything in here*/
  function set(obj) {
    User = obj;
    var userDB = new Firebase(FireURL + "/User/"+User.userid);
    userDB.set(obj);
    /* handle error if object not correct JSON format */
  }
  function newTrophy(trophyid) {
    /* Messed up you need to search by child node and then set */
    /* TODO change the data structure to be indexed by Id's */
    var playerdb = new Firebase(FireURL + "/player/");
    var playerTroph = playerdb.child(User.userid).child("earnings").child("trophyid");
    playerTroph.push(trophyid);
  }
  function updateEarnings(newEarnings) {
    new Firebase(FireURL+"/player/"+User.playerid).child(earnings).update(newEarnings);
  }
  /* HUGE TODO how to request a friend instead of force them to be together? */
  function addFriend(friendid) {
    var friendsDb = new Firebase(FireURL+"/player/"+User.playerid+"/friends");
    friends.push(friendid);
  }
  /* Delete friend: */
  function deleteFriend(friendid) {
    var friends = new Firebase(FireURL + "/player/" + User.playerid+"/friends");
    friends.filter(friendid);
    Firebase.set("/players/"+User.playerid+"/friends", friends );
  }
  function setName(strName) {
    User.name = strName;
    var ref = new Firebase(FireURL + "/user/");
    ref.set(User);
  }
  /*
   * Set profile picture
   */
  function setProfPic(ImgURL) {
    if(imgURL !=== "") throw new err;
    User.player.prof_pic = ImgURL;
    upload()

  }

  /* Add sport */
  function addSport(sport) {
    sports = Firebase.get("/players/"+User.playerid+"/sports");
    sports.push(sport);
  }

  /* report match // return new match object, -1 otherwise */
  function reportMatch(tupleObj, matchid) {
    Firebase.set("/match/"+matchid+"/scores", tupleObj);
  }
  /* schedule match // returns match object if successful, -1 otherwise */
  function scheduleMatch(matchid, timeObj) {
    var ref = new Firebase(FireURL+"/match/");
    ref.set(new Match(matchid)); //inadequate API to deal with this should be
    //handled in the Match Class not here
  }
  /* join tournament // returns tournament object if successful, -1 otherwise */
  function joinTournament(tournamentid) {
    var ref = new Firebase(FireURL+"/player/"+User.playerid+"/tournaments/"+tournamentid);
    //set both player object AND tournamnet object
    ref.push(tournamentid);
  }
  /* create tournament // returns tournament object if successful, -1 otherwise */
  function createTournament() {
    var tourn = new Tournament(generatedId);
    new Firebase(FireURL+"/tournament/").set(tourn);
  }
  function joinTeam(teamid) {
    new Firebase(FireURL+"/team/"+teamid+"/players/").push(User.playerid);
  }
  /*
  create team // returns team object if successful, -1 otherwise
    */
  function createTeam(teamid) {
    var team = new Team(teamid);
    var ref = new Firebase(FireURL + "/team/");
    /* TODO ERROR API INADEQUACY NEED TO BREAK API RULES FOR CORRECT JSON OBJECT */
    ref.set(team);
  }

  //change Email data of user
  function changeEmail(oldEmail, NewEmail, password) {
    ref.changeEmail({
      oldEmail :oldEmail,
      newEmail : newEmail,
      password : password
    }, function(error) {
      if (error === null) {
        console.log("Email changed successfully");
      } else {
        console.log("Error changing email:", error);
      }
    });
  }

  /* Create New User with Login */
  function createUser(email, password) {
    ref.createUser({
      email    : email,
      password : password
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  }

  /* Login existing user */
  function login(email, password) {
    ref.authWithPassword({
      email    : email,
      password : password
    }, function(error, authData) {
      if (error) {
       switch (error.code) {
         case "INVALID_EMAIL":
           console.log("The specified user account email is invalid.");
           break;
         case "INVALID_PASSWORD":
           console.log("The specified user account password is incorrect.");
           break;
         case "INVALID_USER":
           console.log("The specified user account does not exist.");
           break;
         default:
           console.log("Error logging user in:", error);
       }
     } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }

  /* Forgotten password and in-app reset */
  function changePassword(oldPass, newPass, email) {
    ref.changePassword({
      email       : email,
      oldPassword : oldPass,
      newPassword : newPass
    }, function(error) {
      if (error === null) {
        console.log("Password changed successfully");
      } else {
        console.log("Error changing password:", error);
      }
    });
  }

  /* Can't Remeber your passwrod? We got your back */
  function resetPasswordEmail(email) {
    ref.resetPassword({
      email : email
    }, function(error) {
      if (error === null) {
        console.log("Password reset email sent successfully");
      } else {
        console.log("Error sending password reset email:", error);
      }
    });
  }

  /* Delte Users from DB (they delete themselves) [Full Authority still belongs to Admin]*/
  function removeUser(strEmail, strPassword) {
    ref.removeUser({
      email    : strEmail,
      password : strPassword
    }, function(error) {
      if (error === null) {
        console.log("User removed successfully");
      } else {
        console.log("Error removing user:", error);
      }
    });
  }

  /* NEEDS WORK Sign in with Facebook */
  function FBlogin() {
    ref.authWithOAuthRedirect("Facebook", authHandler);
  }

  /* Sign out */
  function logout() {
    ref.unauth();
  }


  /* Save User Data */
  function saveUser(authData) {
    ref.onAuth(function(authData) {
      if (authData) {
        // save the user's profile into the database so we can list users,
        // use them in Security and Firebase Rules, and show profiles
        ref.child("users").child(authData.uid).set({
          provider: authData.provider,
          data: authData
          });
      }
    });
  }

}
  module.exports = UserData;
