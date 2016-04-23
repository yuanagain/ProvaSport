import React from 'react';
import TeamBrick from './teambrick'

var default_player = {
    "name" : {
      "first": "Loading",
      "last": "Loading",
      "full": "Loading",
    },
    "userid" : -1,
    "prof_pic": "Loading",
    "elo": 0.0,
    "earnings": [ {"sport" :
    {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
    }} ],
    "home": "LOADING",
    "sports": "LOADING",
    "imageURL": "Loading",
    "friends": [],
    "teams": [],
    "matches": [],
    "tournaments": []
  };
var default_match = {
        "datetime": 0,
        "sport": "LOADING",
        "scores": [["0","1"],["0","1"],["0","1"],["0","1"]],
        "tournamentid": -1,
        "winner": 1,
        "data": {},
        "teams": [0,0],
        "payoutdata": {
          "xp": -1,
          "cash": -1
        },
        "status": {
          '0': 0,
          '1': 1
        },
        "name": "matchesHaveNames?",
        "location": "LOADING"
  };
var default_team = {
    "name": "Fale Yales",
    "players": [default_player],
    "matches": [default_match],
    "thumbnail": "http://cdn.xl.thumbs.canstockphoto.com/canstock16117908.jpg"
};


var ScoreSquare = React.createClass({
/*
  onPress: function() {
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(this.props.matchid),
      component: MatchPage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.props.matchid
      }
    })
  },
*/
  getInitialState: function() {
    return (
      {
        match: default_match,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        matchid: -1,
      }
    )
  },
  render: function() {
    var {
      matchid,
    } = this.props;

    if (this.state.loaded == false) {
      return (<div></div>)
    }

    var tally = _ctools.getTally(this.state.match)
    console.log(tally)
    return (
      <div style={styles.playersquare}>
        <div style={[styles.icon, ]}>
          <div style={[_cstyles.standard_text]}>
            {tally[0] + ' - ' + tally[1]}
          </div>
        </div>
      </div>
    );
  },

getTally: function(match) {
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

  fetchMatch: function(data) {
    this.setState({loaded : true})
    this.setState({match : data})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    //Match._GetMatch(this.props.matchid, this.fetchMatch)
  },

  componentWillReceiveProps: function(nextProps) {
    //Match._GetMatch(this.props.matchid, this.fetchMatch)
  },
});

// TODO: Make universal
var mainfont = 'avenir';
var slength = 75;
var bricklength = slength * 2.5 - 2;
var brickheight = ((slength) * 3 / 5 - 4);
var thumbslength = ((slength) * 3 / 5 - 12);

var styles = {
  playersquare: {
    height: slength,
    width: slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    height: slength,
    width: slength,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ScoreSquare;