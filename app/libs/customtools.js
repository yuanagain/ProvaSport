var toDate = function(mydate){
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
  return (monthNames[mydate.getMonth()]) + " " + mydate.getDate() + ", " + mydate.getFullYear();
}

var toDateShort = function(mydate){
  return (mydate.getMonth()+1)+"/"+mydate.getDate()+"/"+mydate.getFullYear();
}

var formatTime = function(date) {
    var hh = date.getHours();
    var m = date.getMinutes();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
        h = hh-12;
        dd = "PM";
    }
    if (h == 0) {
        h = 12;
    }
    m = m<10?"0"+m:m;

    var formatted = h + ":" + m + " " + dd;
    return formatted;
}

// Return index of winning team
var getWinnerIndex = function(match) {
  var tally = 0

  // Handle byes
  if (match.teams[0] == 'BYE') {
    //return match.teams[1]
    return 1
  }

  if (match.teams[1] == 'BYE') {
    //return match.teams[0]
    return 0
  }

  if (match.teams[0] == 'TBD' || match.teams[1] == 'TBD') {
    return 'TBD'
  }

  var status = codeToString(match.status)
  if (status == "Recording needed") {
    return 'TBD'
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
    //return match.teams[0]
    return 0
  }
  if (tally < 0) {
    //return match.teams[1]
    return 1
  }
  //return match.teams[0]
  return 0
}

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

var getScoreStrings = function(scores) {
  var scoreStrings = ["", ""]
  for (var i = 0; i < scores.length; i++) {
    scoreStrings[0] += scores[i][0] + ' - ';
    scoreStrings[1] += scores[i][1] + ' - ';
  }
  scoreStrings[0] = scoreStrings[0].slice(0, -2)
  scoreStrings[1] = scoreStrings[1].slice(0, -2)
  return scoreStrings
}

module.exports = {toDate, toDateShort, formatTime, getWinnerIndex, getScoreStrings,};