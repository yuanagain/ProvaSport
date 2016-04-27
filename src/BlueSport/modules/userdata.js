/*TODO: login users and clean up constructor
  data validation and crash handling

  Actual Login may require Firebase Token Handler
 */
 /*
  * Imports
  */
 import * as Player from '../modules/player'
 import * as Team from '../modules/team'
 import * as Trophy from '../modules/trophy'
 import * as Match from '../modules/match'


import Store from 'react-native-store';


var ref= require("firebase");
ref = new Firebase("https://shining-torch-4767.firebaseio.com");

    /* LOGIN TODO
    On Shutdown: ref.unauth(); to deauthorize.
    */
function something() {
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

/* register new user */
function create(authData, object) {
  /*Actual login*/
  var isNewUser = true;
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      // save the user's profile into the database so we can list users,
      // use them in Security and Firebase Rules, and show profiles
      ref.child("user").child(authData.uid).set({
        object
      });
    }
  });
}

/*set everything in here*/
function set(obj) {
  User = obj;
  var userDB = new Firebase(FireURL + "/User/"+Data.userid);
  userDB.set(obj);
  /* handle error if object not correct JSON format */
}

/* Create a new trophy */
function newTrophy(trophyid) {
  /* Messed up you need to search by child node and then set */
  /* TODO change the data structure to be indexed by Id's */
  var playerdb = new Firebase(FireURL + "/player/");
  var playerTroph = playerdb.child(User.playerid).child("earnings").child("trophyid");
  playerTroph.push(trophyid); //change to appednig to array not pushing a new object
}

/* Change Player's earnings to New earnings JSONObject
* update data must be of the form:
* {
*  "key": updatedvalue
* }
*/
function updateUser(uid, updateData) {
  ref.child('user').child(uid).update({
    updateData
  });
}


/*  CHANGED TO PLAYER MODULE
HUGE API  how to request a friend? instead of force them to be together?
function addFriend(friendid) {
  var p = new Player(this.User.playerid);
  p.addFriend(friendid);
}
*/

/* CHANGED TO PLAYER
Delete friend:
function deleteFriend(friendid) {
  if(err) { return null;}
  var p = new Player(User.playerid);
  var friends = p.getFriends;
  friends.filter(friendid);
  ref.child("player").child(this.User.playerid).update({"friends":friends});
}
*/
/* set the users name

  */
function setName(uid, strName) {
  ref.child('user').child(uid).update({"name": strName});
}
/* ADDED To PLAYER
 * Set profile picture
 */
function setProfPic(imgURL) {
  if(imgURL === "") throw new err;
  var p = new Player(User.playerid);
  p.setProfPic(imgURL);
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
  ref.set(new Match(matchid)); //inadequate API to deal with this should be
  //handled in the Match Class not here
}
/* join tournament // returns tournament object if successful, -1 otherwise */
function joinTournament(tournamentid) {
  //set both player object AND tournamnet object
  ref.child('player').child(playerid).child("tournaments").push(tournamentid);
}
/* create tournament // returns tournament object if successful, -1 otherwise */
function createTournament() {
  var tourn = new Tournament(generatedId);
  new Firebase(FireURL+"/tournament/").set(tourn);
}
/* user joins team */
function joinTeam(teamid) {
  var p = new Player(User.playerid);
  p.addTeam(teamid);
  var team = new Team(teamid);
  team.addPlayer(user.playerid); //check concurrency condition
}
/* CHANGED to TEAM and Match
create team // returns team object if successful, -1 otherwise

function createTeam(teamid) {
  var team = new Team(teamid);
  /* TODO make sure they cannot overwrite data return -1 if failure
  ref.child("team").child(teamid).set(team, function(err) {
    callback(-1);
  });
  callback(teamid);
}
*/

//change Email data of user
function changeEmail(oldEmail, NewEmail, password, callback) {
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
    return new Promise(function(resolve, reject) {
      ref.createUser({
        email    : email,
        password : password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
          resolve(-1);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          resolve(userData.uid);
        }
      });
    });
}

/*
function setAllUserData(uid, obj, callback) {
  ref.onAuth(function(authData) {
  if (authData) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    ref.child("users").child(authData.uid).set({
      provider: authData.provider,
      data: obj
    });
  }
});

}*/
/* Login existing user */
function login(email, password) {
  return new Promise(function(resolve, reject) {
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
        reject();
     } else {
        console.log("Authenticated successfully with payload:", authData);
        resolve(authData);
      }
    })
  });
}
/* Login existing user */
function _Login(email, password, callback) {
  var promise = new Promise(function(resolve, reject) {
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
        reject();
     } else {
        resolve(authData);
      }
    })
  });
  promise.then(function(value) {
    callback(value);
  }).catch(function() {
    console.log("ERROR logging in");
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

/* NEEDS WORK Sign in with Facebook
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
function GetUser(uid){
/* would we ever get a User?*/
  return new Promise(function(resolve, reject) {
      ref.child('user').child(uid).on("value", function(snapshot) {
        var user = snapshot.val();
        console.log(user);
        resolve(user);
      });
   });
}
function _GetUser(uid, callback){
/* would we ever get a User?*/
  var promise = new Promise(function(resolve, reject) {
      ref.child('user').child(uid).on("value", function(snapshot) {
        var user = snapshot.val();
        resolve(user);
      });
   });
  promise.then(function(value){
    callback(value);
  }).catch(function(){
    console.log("Failed");
  });
}
function setUser(uid, obj) {
  return new Promise(function(resolve, reject){
    if (obj){
      ref.child('user').child(uid).set(obj)
      console.log("created object USER")
    }
    else {
      ref.child('user').child(uid).set(default_user)
      consle.log("created Default User")
    }
  })
}
//sets the user to the specificed object
function _SetUser(uid, obj) {
  return new Promise(function(resolve, reject){
    if (obj){
      ref.child('user').child(uid).set(obj)
      console.log("created object USER")
    }
    else {
      ref.child('user').child(uid).set(default_user)
      consle.log("created Default User")
    }
  })
}

var default_user = {
  "name": "Loading",
  "email": "Loading",
  "playerid": 0,
  "prof_pic": "loading",
  "nationality": "USA",
  "gender": "gender",
  "birthday": 0,
  "sports": []
};
//createUser("dummy@dummy.com", "test123").then(function(value){console.log(value)})
setUser('dd726cb4-cdd3-4d66-a06f-cb9e5a5a8794', {
  "name": "Password",
  "email": "password@gmail.com",
  "playerid": 0,
  "prof_pic": "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiuhcmO4a3MAhWJez4KHcT5DHMQjRwIBw&url=http%3A%2F%2Fwww.jennstrends.com%2Fthese-profile-photos-make-you-look-bad%2F&psig=AFQjCNHQM1sWI8pOR7pVQA1I9mlYjkBb5A&ust=1461810096997589",
  "nationality": "USA",
  "gender": "M",
  "birthday": 1888889999,
  "sports": ["Basketball"]
}).then(resp=>console.log("ADDED USER"))

//GetUser(35)
/*
 * const DB = {
 *   'user': Store.model('user'),
 *   'player': Store.model('player')
 * }
 * DB.player.destroy();
 * DB.user.destroy();
 */

module.exports = {_GetUser, GetUser, default_user, createUser, login, _Login, logout, setUser};
