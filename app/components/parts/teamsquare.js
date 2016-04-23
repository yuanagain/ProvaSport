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


var TeamSquare = React.createClass({

  onPress: function() {
    // var ProfilePage = require('../screens/profilepage')
    // this.props.navigator.push({
    //   id: "ProfilePage" + String(_ctools.randomKey()),
    //   component: ProfilePage,
    //   passProps: {
    //     navigator: this.props.navigator,
    //     playerid: this.props.playerid
    //   }
    // })
  },

  getInitialState: function() {
    return (
      {
        team: default_team,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teamid: -1,
      }
    )
  },
  render: function() {
    var {
      teamid,
    } = this.props;

    if (this.state.loaded == false) {
      return (<div></div>)
    }

    return (
      <div style={styles.teamsquare}>
        <div style={[styles.icon, ]}>
          <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
          <p style={[_cstyles.detail_text]}>
            {this.state.team.name}
          </p>
        </div>
      </div>
    );
  },

  fetchTeam: function(data) {
    this.setState({loaded : true})
    this.setState({team : data})

  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    //Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    //Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },
});

// TODO: Make universal
var mainfont = 'avenir';
var slength = 75;
var bricklength = slength * 2.5 - 2;
var brickheight = ((slength) * 3 / 5 - 4);
var thumbslength = ((slength) * 3 / 5 - 12);

var styles = {
  teamsquare: {
    height: slength,
    width: slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  im: {
    height: thumbslength,
    width: thumbslength,
    borderRadius: thumbslength / 2,
    marginRight: 4,
  },
  icon: {
    height: slength,
    width: slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
}
export default TeamSquare;