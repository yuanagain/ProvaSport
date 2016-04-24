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


var MatchBrick = React.createClass({
/*
  onPress: function() {
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(_ctools.randomKey()),
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

    return (
        <div>
          <TeamBrick teamid={this.state.match.winner}
                     disabled={true} />
          <div style={styles.scores}>
            <p style={styles.detail_text}>
              {this.getScoreString(this.state.match)}
            </p>
          </div>
        </div>
    );
  },

  getScoreString: function(match) {
    var scoreString = ""
    for (var i = 0; i < match.scores.length; i++) {
      scoreString += match.scores[i][0] + ' - ' + match.scores[i][1] + ', '
    }
    return scoreString.slice(0, -2)
  },

  fetchMatch: function(data) {
    this.state.match = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    //Match._GetMatch(this.props.matchid, this.fetchMatch)
  },

  componentWillReceiveProps: function(nextProps) {
    //Match._GetMatch(nextProps.matchid, this.fetchMatch)
  },
});

// TODO: Make universal
var mainfont = 'avenir';
var styles = {
  detail_text: {
    color: 'black',
    fontSize: 18,
    fontFamily: mainfont,
    paddingTop: 0,
  },
  scores: {
    height: 20,
    marginBottom: -20,
    paddingLeft: 5,
  },
}
export default MatchBrick;