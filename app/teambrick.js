import React from 'react';

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
        "scores": [["...","..."]],
        "tournamentid": -1,
        "winner": -1,
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


var TeamBrick = React.createClass({

  toTeamPage: function() {
    if (this.props.disabled) {
      return
    }
    /*var TeamPage = require('../screens/teampage')
    this.props.navigator.push({
      id: "TeamPage" + String(_ctools.randomKey()),
      component: TeamPage,
      passProps: {
        navigator: this.props.navigator,
        teamid: this.props.teamid
      }
    })*/
  },

  toPlayerPage: function() {
    /*var ProfilePage = require('../screens/profilepage')
    this.props.navigator.push({
      id: "ProfilePage" + String(_ctools.randomKey()),
      component: ProfilePage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.state.team.players[0]
      }
    })*/
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
        disabled: false,
      }
    )
  },
  render: function() {
    var {
      teamid,
      disabled,
    } = this.props;

    if (this.props.disabled || this.state.team.name == 'BYE ') {
      return (
        <div style={styles.teambrick}>
          <div style={[styles.center, styles.left]} >
            <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
          </div>
          <div style={styles.right}>
              <p style={[styles.detail_text, {fontWeight: 'bold'}]}>
                    {this.state.team.name}
              </p>
          </div>
        </div>
        )
    }

    return (
      <div style={styles.teambrick}
                        onPress={() => this.toTeamPage()}>
        <div style={[styles.center, styles.left]} >
            <img style={styles.im}
                 src='http://facebook.github.io/react/img/logo_og.png'/>
        </div>
        <div style={styles.right}>
            <p style={styles.detail_text}>
                {this.state.team.name}
            </p>
        </div>
      </div>
    );
  },

  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
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
  detail_text: {
    color: 'black',
    fontSize: 24,
    fontFamily: mainfont,
    paddingTop: 3,
    paddingLeft: 3,
  },
  teambrick: {
    height: brickheight,
    width: bricklength,
    paddingLeft: 4,
  },
  im: {
    height: thumbslength,
    width: thumbslength,
    borderRadius: thumbslength / 2,
    marginRight: 4,
    float: 'left'
  },
  left:{
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: thumbslength + 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default TeamBrick;