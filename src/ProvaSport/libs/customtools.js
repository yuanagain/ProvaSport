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
  return Math.random(1, _const.bignum)
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
  if (status == "Recording needed") {
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
      return "Unplayed"
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

module.exports = {indexOf, supplementIndex, contains, inRange,
                  traceIndices, isValidScore, randomKey,
                  selectionNeedles, toDate, shortString,
                  cumulativeEarnings, getInitials, getWinner,
                  getTally, getScoreString, codeToString,
                  findField, findId};
