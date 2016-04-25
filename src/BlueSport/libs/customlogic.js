'use strict';

var _const = require('./constants')
import * as Match from '../modules/match'
var RRMatrix = function(tournament) {
  var teams = tournament.teams
  var matches = tournament.matches
  var matrix = []
  var k = 0
  for (var i = 0; i < teams.length + 1; i++) {
    var row = []
    for (var j = 0; j < teams.length + 1; j++) {
      if (i == 0) {
        if (j == 0) {
          row.push({'item': false, 'type': 'blank'})
        }
        else {
          row.push({'item': teams[j - 1], 'type': 'icon'})
        }
      }
      else {
        if (j == 0) {
          row.push({'item': teams[i - 1], 'type': 'team'})
        }
        else if (i == j) {
          row.push({'item': 0, 'type': 'empty'})
        }
        else if (i < j) {
          row.push({'item': matches[k], 'type': 'match'})
          k++
        }
        else if (i > j) {
          row.push(matrix[j][i])
        }
      }
    }
    matrix.push(row)
  }
  return matrix
}


var bracketMatrix = function(tournament) {
  var teams = tournament.teams
  var matches = tournament.matches
  var matrix = [[]]
  var k = 0
  var depth = Math.ceil(Math.log(teams.length) / Math.log(2))

  // populate first layer of forks with teams
  for (var i = 0; i < teams.length; i += 2) {
    matrix[0].push([teams[i], teams[i + 1]])
  }

  for (var j = 1; j < depth; j++) {
    var col = []

    var cap = Math.pow(2, depth - j)

    for (var i = 0; i < cap; i += 2) {
      col.push([matches[k], matches[k + 1]])
      k += 2
    }
    matrix.push(col)
  }
  matrix.push(tournament.matches[matches.length - 1])
  return matrix
}

var createTournament = function(data) {
  var teams = data.teams
  var type = data.type

  // compute list of matches


  if (type == "Elimination ") {
    // add byes if necessary
    if (team.length % 2 != 0) {
      var depth = Math.ceil(Math.log(teams.length) / Math.log(2))
      var target_ct = teams.length + (teams.length % 2)
    }
  }
}
/* takes in data of the form :
  dictionary with team array
  assming all teams created,
  create Match with each team


  data.teams will have teams that are playing
  no need for BYE team unless odd number of teams

  */
var createRR = function(data) {
  return new Promise(function(resolve){
  var matches = []
  var teams = data.teams
  // could do 2 forEach loops that are callback-safe
  var n = teams.length;
  var numMatches = (n*n-n)/2.0;
  loop1:
    for (var i = 0; i < teams.length; i++) {
      for (var j = 0; j < teams.length; j++) {
        if (i < j) {
          var team1 = data.teams[i];
          var team2 = data.teams[j];
          var matchi = Match.default_match;
          //var matchi = data.matchinfo[j + teams.length*i] // get data match obj (just stock data but migh have a name and other attributes)
          //could possibly connect here too if connection not an issue
          matchi.teams[0] = team1
          matchi.teams[1] = team2
          //console.log(matchi) //correct object form testing
          Match.createMatch(matchi).then(resp=>{matches.push(resp); if(matches.length === numMatches){resolve(matches)}}).catch(function(err){console.log(err);})
        }
      }
    /*  if(i == teams.length - 2){
        //returning TOO EARLY
        console.log(matches)
        return matches;
      }*/
    }
  // now we have create matches and have a complete matchidlist.
  // return matches????
  //returning early?
  //return matches;
  //matchidlist = Matches.createFromList(matches);


  })
}

/*Will need a data prepper function before this to get to a specific format that
 we can use for the tournament creation software

 data.match = stock or default match attributes with everything filled in except teams
 data.teams = teamid array of all those particpating in the match
 now we also need software for updating matches or saying that as soon as someone has
 won(both teams confirmed at 4 level) then we will advance or change a match to update with that team

  */
var createBracket = function(data) {
  return new Promise(function(resolve){
  var matches = []
  var teams = data.teams

  var depth = Math.ceil(Math.log(teams.length) / Math.log(2))
  var target_length = Math.pow(2, depth)
  for (var i = 0; i < target_length - teams.length; i++) {
    //create the Bye teamid this should be fine
    teams.push("Bye")
  }
  var placements = new Array(teams.length)
  var trace = createTrace(depth)
  for (var i = 0; i < trace.length; i++) {
    placements[i] = teams[trace[i] - 1]
  }

  var numMatches = Math.pow(2, depth + 1) - 1;
  console.log(numMatches)
  //might have to change ot placements.length-2
  loop1:
    for (var i = 0; i < placements.length - 1; i += 2) {
      var team1 = placements[i];
      var team2 = placements[i+1];
      var matchi = Match.default_match;
      //var matchi = data.matchinfo[j + teams.length*i] // get data match obj (just stock data but migh have a name and other attributes)
      //could possibly connect here too if connection not an issue
      matchi.teams[0] = team1;
      matchi.teams[1] = team2;
      Match.createMatch(matchi).then(resp=>{matches.push(resp); if(matches.length === numMatches){resolve(matches)}}).catch(function(err){
        console.log("customlogic.js: "+err);
      }) //delete all data given a match array
      //matches.push("placements[i], [i+1]")
    }
    //placements.length = 2^N of matches but still have E 2^N-i for i > 0 to create

    //next depths are the TBD match
    for (var i = depth - 1; i >= 0; i--) {
      var cap = Math.pow(2, i);
      for (var j = 0; j < cap; j++){
        //run 2^depth times
        var matchi = Match.TBD;
        Match.createMatch(matchi).then(resp=>{matches.push(resp); if(matches.length === numMatches){resolve(matches)}}).catch(function(err){console.log(err);})
      }
    }
  //some simple data validation
/*  if (matches.length != Math.pow(2, teams.length)-1)
  {
    console.log("FAILURE WRONG NUMBER OF MATCHES")
  }
  else {
    return matches
  }*/
  });
}


var updateBracket = function(data, result) {
  // get index of match played

  // update player for that match
}

var createTrace = function(depth) {
  var n = Math.pow(2, depth)
  var trace = [1, 2]
  for (var i = 1; i <= depth; i++) {
    var size = Math.pow(2, i)  // number of nodes at this level
    var target_sum = size + 1 // sum for each pair of nodes
    var old = trace // old version
    trace = new Array(size)
    for (var j = 0; j < size; j += 2) {
      if (j < size / 2) {
        trace[j] = old[j / 2]
        trace[j + 1] = target_sum - trace[j]
      }
      else {
        trace[j + 1] = old[j / 2]
        trace[j] = target_sum - trace[j + 1]
      }
    }
  }
  return trace
}


var updateBracket = function(tournament) {

}
/* --------------TESTING SECTION ---------------------
takes in data of the form :
  dictionary with team array
  assuming all teams created,
  create Match with each team


  data.teams will have teams that are playing
  no need for BYE team unless odd number of teams

  */
var dictTest = {
  teams: [0,1,"-KG4-Vd6h8s_52achoTc","-KG3xiu0NftaiyQxIV_A"],
  match: Match.default_match // attribute array of match objects (tied to tournament)
}
//all teams need to be created before this point
// if teams do not exist in data base then the method will crash
//createRR(dictTest).then(resp=>console.log("RESPONSE:::::::::\n     "+resp));
createBracket(dictTest).then(resp=>console.log(resp))

module.exports = {RRMatrix, bracketMatrix, createTrace};
