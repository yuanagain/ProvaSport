/*TODO: login users and clean up constructor
  data validation and crash handling
 */

var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
var FireURL = "https://incandescent-torch-5505.firebaseio.com";
var ref;
class User {
  /* Creates a new user if there is none or logins a user if exists in database */
  constructor(email, password, isNew) {
    this.User = {
      "name": "",
      "email": "",
      "playerid": 0
    /* TODO session token? NO Firebase will handle this if we decide on a session token scheme */
    };
  // Register the callback to be fired every time auth state changes
    ref = new Firebase(FireURL);
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
/* check if the user is logged in given authentication data */
  authDataCallback(authData) {
    if (authData) {
      console.log("User " + authData.uid + " is logged in with " + authData.provider);
      ref.offAuth(authDataCallback);// logged in no longer need to listen for login
    } else {
      console.log("User is logged out");
    }
  }
  /* authenitcation handler */
  authHandler() {
    ref.offAuth()
  }

/* register new user */
  create() {
    /*Actual login*/
    var isNewUser = true;
    var ref = new Firebase("FireURL");
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
  }

  /*set everything in here*/
  set(obj) {
    User = obj;
    var userDB = new Firebase(FireURL + "/User/"+Data.userid);
    userDB.set(obj);
    /* handle error if object not correct JSON format */
  }

  /* Create a new trophy */
  newTrophy(trophyid) {
    /* Messed up you need to search by child node and then set */
    /* TODO change the data structure to be indexed by Id's */
    var playerdb = new Firebase(FireURL + "/player/");
    var playerTroph = playerdb.child(User.playerid).child("earnings").child("trophyid");
    playerTroph.push(trophyid); //change to appednig to array not pushing a new object
  }

/* Change Player's earnings to New earnings JSONObject
 *
 *
 */
  updateEarnings(newEarnings) {
    new Firebase(FireURL+"/player/"+User.playerid).child(earnings).update(newEarnings);
  }


  /* HUGE API TODO how to request a friend? instead of force them to be together? */
  addFriend(friendid) {
    var p = new Player(this.User.playerid);
    p.addFriend(friendid);
  }


  /* Delete friend: */
  deleteFriend(friendid) {
    if(err) { return null;}
    var p = new Player(User.playerid);
    var friends = p.getFriends;
    friends.filter(friendid);
    ref.child("player").child(this.User.playerid).update({"friends":friends});
  }

  /* set the users name

    */
  setName(strName) {
    User.name = strName;
    var ref = new Firebase(FireURL + "/user/");
    ref.set(User);
  }
  /*
   * Set profile picture
   */
  setProfPic(ImgURL) {
    if(imgURL !=== "") throw new err;
    var p = new Player(User.playerid);
    p.setProfPic(ImsgURL);
  }

  /* Add sport */
  addSport(sport) {
    sports = Firebase.get("/players/"+User.playerid+"/sports");
    sports.push(sport);
  }

  /* report match // return new match object, -1 otherwise */
  reportMatch(tupleObj, matchid) {
    Firebase.set("/match/"+matchid+"/scores", tupleObj);
  }
  /* schedule match // returns match object if successful, -1 otherwise */
  scheduleMatch(matchid, timeObj) {
    var ref = new Firebase(FireURL+"/match/");
    ref.set(new Match(matchid)); //inadequate API to deal with this should be
    //handled in the Match Class not here
  }
  /* join tournament // returns tournament object if successful, -1 otherwise */
  joinTournament(tournamentid) {
    var ref = new Firebase(FireURL+"/player/"+User.playerid+"/tournaments/"+tournamentid);
    //set both player object AND tournamnet object
    ref.push(tournamentid);
  }
  /* create tournament // returns tournament object if successful, -1 otherwise */
  createTournament() {
    var tourn = new Tournament(generatedId);
    new Firebase(FireURL+"/tournament/").set(tourn);
  }
  /* user joins team */
  joinTeam(teamid) {
    var p = new Player(User.playerid);
    p.addTeam(teamid);
    var team = new Team(teamid);
    team.addPlayer(user.playerid); //check concurrency condition
  }
  /*
  create team // returns team object if successful, -1 otherwise
    */
  createTeam(teamid) {
    var team = new Team(teamid);
    var ref = new Firebase(FireURL + "/team/");
    /* TODO ERROR API INADEQUACY NEED TO BREAK API RULES FOR CORRECT JSON OBJECT */
    ref.set(team);
  }

  //change Email data of user
  changeEmail(oldEmail, NewEmail, password) {
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
  createUser(email, password) {
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
  login(email, password) {
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
  changePassword(oldPass, newPass, email) {
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
  resetPasswordEmail(email) {
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
  removeUser(strEmail, strPassword) {
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
  FBlogin() {
    ref.authWithOAuthRedirect("Facebook", authHandler);
  }

  /* Sign out */
  logout() {
    ref.unauth();
  }

  /* Save User Data */
  saveUser(authData) {
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
