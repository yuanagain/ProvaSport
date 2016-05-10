'use strict';

var _const = require('./constants')

var isNumeric = function (n) {
  return (!isNaN(parseFloat(n)) && isFinite(n))
}

var isValidScore = function(n) {
  if (isNumeric(n)) {
    if (n >= 0) {
      return true
    }
  }
  return false
}

var supplementIndex = function(items) {
  var indexedItems = []
  for (var i = 0; i < items.length; i++) {
    indexedItems.push({'index': i, 'item': items[i]})
  }
  return indexedItems
}

var stripIndex = function(indexedItems) {
  var items = []
  for (var i = 0; i < indexedItems.length; i++) {
    items.push(indexedItems[i]['item'])
  }
}

var indexOf = function(haystack, needle) {
  for (var i = 0; i < haystack.length; i++) {
      if (needle == haystack[i]) { return i }
  }
  return -1
}

var contains = function(haystack, needle) {
  return (indexOf(haystack, needle) != -1)
}

var inRange = function(n, min, max) {
  if (n > max) { return false }
  if (n < min) { return false }
  return true
}

/*
takes list of indices, recovers corresponding list
of items
*/
var traceIndices = function(haystack, indices) {
  var items = []
  for (var i = 0; i < indices.length; i++) {
    items.push(haystack[indices[i]])
  }
  return items
}

/*
takes list of item, recovers corresponding list
of indices
*/
var selectionNeedles = function(haystack, needles) {
  var indices = []
  for (var i = 0; i < needles.length; i++) {
    var index = indexOf(haystack, needles[i])
    if (index >= 0) {
      indices.push(index)
    }
  }
  return indices
}

var randomKey = function() {
  return Math.random(2, _const.bignum)
}

var toDate = function(mydate){
  return (mydate.getMonth()+1)+"/"+mydate.getDate()+"/"+mydate.getFullYear();
}

var shortString = function(strings, max) {
  var out = ""
  var len = 0
  for (var i = 0; i < strings.length; i++) {
    var s = String(strings[i])
    if (len + s.length > max - 5) {
      return out + ', ...'
    }
    out += s
    len += s.length
    if (i < out.length - 1) {
      out += ', '
      len += 2
    }
  }
  return out
}

var cumulativeEarnings = function(earnings) {
  var out = {'cash': 0, 'xp': 0}
  for (var key in earnings) {
    out['cash'] += earnings[key]['cash']
    out['xp'] += earnings[key]['xp']
  }
  return out
}

var getInitials = function(player) {
  return player.name.first.charAt(0) + player.name.last.charAt(0)
}

var getWinner = function(match) {
  var tally = 0

  // handle Byes
  if (match.teams[0] == 'BYE') {
    return match.teams[1]
  }

  if (match.teams[1] == 'BYE') {
    return match.teams[0]
  }

  if (match.teams[0] == 'TBD' || match.teams[1] == 'TBD') {
    return 'TBD'
  }

  var status = codeToString(match.status)
  if (match.status[0]!=4 || match.status[1]!=4) {
    return "TBD"
  }

  for (var i = 0; i < match.scores.length; i++) {
    if (match.scores[i][0] > match.scores[i][1]) {
      tally += 1
    }
    else if (match.scores[i][0] < match.scores[i][1]) {
      tally -= 1
    }
  }

  if (tally > 0) {
    return match.teams[0]
  }
  if (tally < 0) {
    return match.teams[1]
  }
  return match.teams[0]
}

var getTally = function(match) {
  var tally = [0, 0, 0]
  for (var i = 0; i < match.scores.length; i++) {
    if (match.scores[i][0] > match.scores[i][1]) {
      tally[0] += 1
    }
    if (match.scores[i][0] < match.scores[i][1]) {
      tally[1] += 1
    }
    else {
      tally[2] += 1
    }
  }
  return tally
}

// TODO: generate team name from list of players
var addNames = function(players) {
  return ""
}

var getScoreString = function(match) {
  var scoreString = ""
  for (var i = 0; i < match.scores.length; i++) {
    scoreString += match.scores[i][0] + ' - ' + match.scores[i][1] + ', '
  }
  return scoreString.slice(0, -2)
}
/*Unplayed means the user needs   */
var codeToString = function(code){
  switch (code) {
    case 0:
      return "Unplayed"
      break;
    case 1:
      return "Played"
      break;
    case 2:
      return "Recording needed"
      break;
    case 3:
      return "Confirmation/Changes"
      break;
    case 4:
      return "Completed"
      break;
    default:
      return "Not In Match"
  }
}

// searches list of dictionaries for index of first instance of key, val
var findField = function(l, key, val) {
  for (var i = 0; i < l.length; i++) {
    if (l[i].key == val) {
      return i
    }
  }
  return -1
}

// searches list of dictionaries for index of first instance of id == val
var findId = function(l, val) {
  for (var i = 0; i < l.length; i++) {
    if (l[i].id == val) {
      return i
    }
  }
  return -1
}
var unique = function (list) {
  return list.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
}
/* intersection between lists  */
var intersection = function (a, b)
{
  var ai = 0, bi = 0;
  var result = [];

  while( ai < a.length && bi < b.length )
  {
     if (a[ai] < b[bi])
     {
        ai++;
     }
     else if (a[ai] > b[bi])
     {
        bi++;
     }
     else
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }
  return result;
}

// SET ARITHMETIC: returns the set without the elements of diff
var setDifference = function(set, diff) {
  for (var i = 0; i < diff.length; i++) {
    var item = diff[i]
    var index = set.indexOf(item)
    if (index == -1) {
      continue
    }

    set.splice(index, 1)
  }
  return set
}

// SET ARITHMETIC: returns the set of players that are not in any
// of the given teams
var trimTeams = function(all_players, teams) {
  var set = all_players.clone()
  for (var i = 0; i < teams.length; i++) {
    set = setDifference(set, teams[i])
  }

  return set
}

// SET ARITHMETIC: returns the set of players that team index can take
var getAvailable = function(all_players, teams, index) {
  var set = all_players.slice(0)
  for (var i = 0; i < teams.length; i++) {
    if (i == index) {
      continue
    }
    set = setDifference(set, teams[i])
  }

  return set
}


module.exports = {indexOf, supplementIndex, contains, inRange,
                  traceIndices, isValidScore, randomKey,
                  selectionNeedles, toDate, shortString,
                  cumulativeEarnings, getInitials, getWinner,
                  getTally, getScoreString, codeToString,
                  findField, findId, unique, intersection, 
                  setDifference, getAvailable};
