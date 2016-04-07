
/*
 * WARNING: methods wait on database download before returning.
 * TODO: download actual Images instead of URLs
        (accomplished by turning pic into bitstream)

 */

/* provide module to access/update player data here */
var playerdataRef = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
playerdataRef = new Firebase("https://incandescent-torch-5505.firebaseio.com/player");
/*player object within Player class*/
class Player {
  /* Creates and loads the Player from the Firebase */
  constructor(playerid) {
    this.hasLoaded = false;
    this.playerid = playerid;
    this.Player =  {
      "name" : "Johnny Sukon",
      "userid" : -1,
      "prof_pic": "url",
      "elo": 10.0,
      "earnings": {
        "cash": -1,
        "xp": -1,
        "trophies": []
      },
      "sports": "none",
      "friends": [0],
      "teams": [],
      "matches": [],
      "tournaments": []
    };
    this.promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).on("value", function(snapshot) {
        this.Player = snapshot.val();
        console.log("\n\nDOWLOADED PLAYER:  "+this.Player);
        this.hasLoaded = true;
        resolve(this.Player);
      });
    });
  }
  /* loads player from firebase and then handles Firebase errs */
  /*
   * if (this.hasLoaded){
   *   return this.Match.sport;
   * }
   * this.promise.then(function(value){
   *   console.log('+++++++++++++++++++++++++++++++');
   *   console.log(value.sport);
   *   console.log(this.hasLoaded);
   *   return value.sport;
   * });
   */

  /*
   * Usage: Player.getProfPic()
   * returns image tag of the PLayer's profile
   */
   getProfPic() {
     if (this.hasLoaded){
       return "<Image src=this.Player.prof_pic>"
     }
     this.promise.then(function(value){
       console.log(value.prof_pic);
       return "<Image src=value.prof_pic>"
     });

  }

  /*
   * Usage: player.getEarnings()
   * returns the earnings of the player.
   *
   */
   getEarnings() {
     if (this.hasLoaded){
       return this.Player.earnings;
     }
     this.promise.then(function(value){
       console.log(value.earnings);
       return value.earnings;
     });

  }
  /*
   * Usage: player.getELO()
   * returns the ELO of the player (specific to sport)
   */
   getELO() {
     if (this.hasLoaded){
       return this.Player.elo;
     }
     this.promise.then(function(value){
       console.log(value.elo);
       return value.elo;
     });
  }
  /*
   * Usage: player.getSports()
   * returns a standardized string of sports the player particpates in
   * TODO need to check if User has mulitple players binded to it or if players
   * have multisport data and how that relates to ELO calculation
   */
   getSports() {
     this.promise.then(function(value){
       console.log(value.elo);
       return value.sports;
     });
  }
  /*
   * Usage: player.getFriends()
   * returns the integer array of friendids of the players
   */
   getFriends() {
     this.promise.then(function(value){
       console.log(value.friends);
       return value.friends;
     });
  }
  /* get the num-th friend from friend list sorted by: TODO */
   getFriends(num) {
     this.promise.then(function(value){
       console.log(value.friends[num]);
       return value.friends[num];
     });
  }
  /*
   * Usage: player.getTeams()
   * returns the array obect of teamids the player is on
   */
   getTeams(){
     this.promise.then(function(value){
       console.log(value.teams);
       return value.teams;
     });
  }
  /*
   * Usage: Player.getMatches()
   * return the matchids that the player particpatedin
   */
   getMatches() {
     this.promise.then(function(value){
       console.log(value.matches);
       return value.matches;
     });
  }
  /*
   * Usage: Player.getTournaments()
   * returns the tournamnetids that the player particpated in
   */
   getTournaments() {
     this.promise.then(function(value){
       console.log(value.tournamnets);
       return value.tournaments;
     });
  }



     setELO(newElo) {
      this.Player.elo = newElo;
      playerdb.child(Data.playerid).child(elo).set(newElo);
    }
     setProfPic(picURL) {
      this.Player.prof_pic = picURL;
      playerdb.child(Data.playerid).child(prof_pic).set(picURL);
    }
     addSport(strSport) {
      this.Player.sports.append(strSport);
      playerdb.child(Data.playerid).child(sports).set(strSport);
    }
     setName(strName) {
      this.Player.name = strName;
      playerdb.child(Data.playerid).child(name).set(strName);
    }
     addFriend(frid) {
      load(Data.playerid);
      this.Player.friends.append(frid);
      playerdb.child(Data.playerid).child(friends).set(this.Player.friends);
    }
     addTrophy(trophyid) {
      this.Player.earnings.trophies.append(trophyid);
      playerdb.child(Data.playerid).child(earnings).child(trophies).set(this.Player.earnings.trophies);
    }
}
/*possilby add stuff like isOnTeam etc.*/
function _GetPlayer(playerid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
  var default_player = {
    "name" : "LOADING",
    "userid" : -1,
    "prof_pic": "LOADING",
    "elo": 0.0,
    "earnings": {
      "cash": -1,
      "xp": -1,
      "trophies": []
    },
    "home": "LOADING",
    "sports": "LOADING",
    "friends": [0],
    "teams": [],
    "matches": [],
    "tournaments": []
  };

module.exports = {_GetPlayer, default_player};
