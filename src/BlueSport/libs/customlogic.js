'use strict';

var _const = require('./constants')

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

var createRR = function(data) {
  var matches = []
  var teams = data.teams

  for (var i = 0; i < teams.length; i++) {
    for (var j = 0; j < teams.length; j++) {
      if (i < j) {
        matches.push("new match i, j")
      }
    }
  }
}

var createBracket = function(data) {
  var matches = []
  var teams = data.teams

  var depth = Math.ceil(Math.log(teams.length) / Math.log(2))
  var target_length = Math.pow(2, depth)
  for (var i = 0; i < target_length - teams.length; i++) {
    teams.push("Bye")
  }
  var placements = new Array(teams.length)
  var trace = createTrace(depth)
  for (var i = 0; i < trace.length; i++) {
    placements[i] = teams[trace[i]]
  }

  for (var i = 0; i < placements.length; i += 2) {
    matches.push("placements[i], [i+1]")
  }
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

module.exports = {RRMatrix, bracketMatrix, createTrace};
