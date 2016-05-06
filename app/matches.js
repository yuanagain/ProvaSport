var React = require('react');
var ReactDOM = require('react-dom');

import './styles/menu.css';
import _cvals from './constants/customvals';
import _ctools from './libs/customtools'

import * as Match from './modules/match'
import * as Team from './modules/team'
import * as Player from './modules/player'
import {Link} from 'react-router';

//-KH3Z2bp004LAUomrxVB&_k=qiozo3

var Matches = React.createClass({
  getInitialState: function() {
    let { query } = this.props.location
    return (
      {
        matchids: query.matches,
        matches: [],
        activeMatchIndex: 0,
      }
    );
  },

  fetchMatch: function(data) {
    var matches = [].concat(this.state.matches)
    matches.push(data)
    this.setState({matches: matches})
  },

  componentWillMount: function() {
    var matchid;
    if (this.state.matchids != null) {
      // If multiple matches, matchids is an array, otherwise it is
      // a string. The following if and else handle this.
      if (this.state.matchids.constructor === Array) {
        for (var i = 0; i < this.state.matchids.length; i++)
          Match._GetMatch(this.state.matchids[i], this.fetchMatch)
      }
      else {
        Match._GetMatch(this.state.matchids, this.fetchMatch)
      }
    }
  },

  render: function() {
    return (
      <div style={content}>
        <img style={cover_pic}
          src = 'http://beingcovers.com/media/facebook-cover/Soccer-Stadium-facebook-covers-3555.jpg'
        />
        <div id="column_left" style={column_left}>
          <Sidebar matches={this.state.matches} callback={this.changeMatch}/>
        </div>
        <div id="column_right" style={column_right}>
          <TitleEntry match={this.state.matches[this.state.activeMatchIndex]} />
          <h1 style={section_label}>PLAYERS</h1>
          <PlayersEntry match={this.state.matches[this.state.activeMatchIndex]} />
          <h1 style={section_label}>MATCH INFO</h1>
          <MatchEntry match={this.state.matches[this.state.activeMatchIndex]} />
          <h1 style={section_label}>SCORES</h1>
          <ScoresEntry match={this.state.matches[this.state.activeMatchIndex]} />
        </div>
      </div>
    );
  },

  changeMatch: function(index) {
    this.setState({activeMatchIndex: index})
  },
});

// Title layout
var TitleEntry = React.createClass({
  getDefaultProps: function() {
    return (
      {
        match: null,
      }
    )
  },

  render: function() {
    var {
      match,
    } = this.props;
    if (match == null) {
      return (
        <div style={title_div}>
          No Matches To Display
        </div>
      )
    }

    return (
      <div style={title_div}>
        Match on {_ctools.toDate(new Date(this.props.match.datetime))}
      </div>
    );
  }
});

// Players layout
var PlayersEntry = React.createClass({
  getInitialState: function() {
    return (
      {
        team1: Team.default_team,
        team2: Team.default_team,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        match: null,
      }
    )
  },

  fetchTeam1: function(team) {
    this.setState({team1: team})
  },

  fetchTeam2: function(team) {
    this.setState({team2: team})
  },

  componentWillReceiveProps: function(nextprops) {
    Team._GetTeam(nextprops.match.teams[0], this.fetchTeam1)
    Team._GetTeam(nextprops.match.teams[1], this.fetchTeam2)
  },

  render: function() {
    var {
      match,
    } = this.props;

    if (match == null) {
      return (
        <div></div>
      )
    }
    return (
      <span style={entry}>
        <div style={team_label_1}>
          {this.state.team1.name}
        </div>
        <PlayersRow playerids={this.state.team1.players}/>
        <div style={team_label_2}>
          {this.state.team2.name}
        </div>
        <PlayersRow playerids={this.state.team2.players}/>
      </span>
    );
  }
});

var PlayersRow = React.createClass({
  getInitialState: function() {
    return (
      {
        players: [],
        initialLoad: true,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerids: [],
      }
    )
  },

  fetchPlayer: function(player) {
    this.setState({players: []})
    if (this.state.players.length < this.props.playerids.length) {
      var players = [].concat(this.state.players)
      players.push(player)
      this.setState({players: players})
    }
  },

  componentWillReceiveProps: function(nextprops) {
    this.setState({players: []})
    var fetchPlayer = this.fetchPlayer
    nextprops.playerids.forEach(function(playerid) {
      Player._GetPlayer(playerid, fetchPlayer)
    })
  },

  render: function() {
    var self = this
    var {
      playerids,
    } = this.props;

    console.log(this.state.players)
    if (this.state.players == null) {
      return (
        <div></div>
      )
    }

    var playerPics = this.state.players.map(function(player, i) {
      return (
        <Link to="/profile" query={{ playerid: player.playerid }} key={i}>
            <img style={pic} src={player.prof_pic} key={i + 1}/>
        </Link>
      );
    })

    return (
      <div style={pic_container}>
        {playerPics}
      </div>
    );
  }
});

// Information layout
var MatchEntry = React.createClass({
  getDefaultProps: function() {
    return (
      {
        match: null,
      }
    )
  },

  render: function() {
    var {
      match,
    } = this.props;

    if (match == null) {
      return (
        <div></div>
      )
    }

    return (
      <span style={entry}>
        <div id="data_col_left" style={info_column_left}>
          <p style={data_column_left}>Date</p>
          <p style={data_column_left}>Time</p>
          <p style={data_column_left}>Location</p>
          <p style={data_column_left}>Sport</p>
          <p style={data_column_left}>Payout</p>
          <p style={data_column_left}>Win Bonus</p>
        </div>
        <div id="data_col_right" style={info_column_right}>
          <p style={data_column_right}>{_ctools.toDateShort(new Date(match.datetime))}</p>
          <p style={data_column_right}>{_ctools.formatTime(new Date(match.datetime))}</p>
          <p style={data_column_right}>{match.location}</p>
          <p style={data_column_right}>{match.sport[0].charAt(0).toUpperCase() + match.sport[0].slice(1)}</p>
          <p style={data_column_right}>{match.payoutdata.xp + " EXP"}</p>
          <p style={data_column_right}>{"$" + match.payoutdata.cash}</p>
        </div>
        <div style={info_column_filler}>
        </div>
      </span>
    );
  }
});

// Scores layout
var ScoresEntry = React.createClass({
  getInitialState: function() {
    return (
      {
        team1: Team.default_team,
        team2: Team.default_team,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        match: null,
      }
    )
  },

  fetchTeam1: function(team) {
    this.setState({team1: team})
  },

  fetchTeam2: function(team) {
    this.setState({team2: team})
  },

  componentWillReceiveProps: function(nextprops) {
    Team._GetTeam(nextprops.match.teams[0], this.fetchTeam1)
    Team._GetTeam(nextprops.match.teams[1], this.fetchTeam2)
  },

  render: function() {
    var {
      match,
    } = this.props;

    if (match == null) {
      return (
        <div></div>
      )
    }

    var scores = _ctools.getScoreStrings(match.scores)
    return (
      <span style={entry}>
        <div style={team_label_1}>
          {this.state.team1.name}
        </div>
        <div style={score}>
          {scores[0]}
        </div>
        <div style={team_label_2}>
          {this.state.team2.name}
        </div>
        <div style={score}>
          {scores[1]}
        </div>
      </span>
    );
  }
});

// Sidebar
var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      focused: 0,
    };
  },
  clicked: function(index) {
    this.setState({
      focused: index,
    });
    this.props.callback(index)
  },
  render: function() {
    var self = this;
    var {
      matches,
    } = this.props;

    console.log(matches)
    return (
      <div style={sidebar}>
        <ol> {
          this.props.matches.map(function(match, index) {

            var style = '';
            if (self.state.focused == index) {
              style = 'focused';
            }
            return (
              <li className={style} onClick={self.clicked.bind(self, index)} key={index}>
                {_ctools.toDate(new Date(match.datetime))}
              </li>
            )
          })
        }
        </ol>
      </div>
    );
  }
});

// Styling
var content = {
  paddingLeft: 50,
}
var column_left = {
  width: 300,
  height: 1500,
  float: 'left',
  marginLeft: -100,
  marginTop: -20,
  border: 'solid',
  borderWidth: 1,
  borderColor: 'gray',
  color: '#262626',
};
var column_right = {
  width: 300,
  float: 'left',
  paddingLeft: 30,
  color: '#262626',
};
var info_column_left = {
  float: 'left',
  width: 150,
  height: 200,
  marginRight: 10,
  color: '#262626',
};
var info_column_right = {
  float: 'left',
  height: 200,
  color: '#262626',
};
var info_column_filler = {
  height: 200,
  width: 200,
};
var data_column_left = {
  fontFamily: _cvals.mainfont,
  fontWeight: 500,
  fontSize: 25,
  padding: 0,
  margin:0,
  marginBottom: 3,
  color: '#262626',
};
var data_column_right = {
  fontFamily: 'avenir',
  fontWeight: 200,
  fontSize: 25,
  padding: 0,
  margin: 0,
  marginBottom: 3,
  color: '#262626',
};
var entry = {
  width: 750,
  backgroundColor: _cvals.backgroundColor,
  padding: 30,
  margin: 30,
  paddingTop: 10,
  marginTop: 10,
  fontFamily: _cvals.mainfont,
  color: '#262626',
  fontSize: 20,
  display: 'block',
};
var matchInfo = {
    width: 500,
};
var text = {
  width: 200,
  display: 'block',
  color: '#262626',
};
var date = {
  color: '#666666',
  fontSize: 15,
  padding: 10,
  display: 'block',
};
var pic_container = {
  height: 50,
  paddingLeft: 15,
  paddingTop: 15,
};
var pic = {
  float: 'left',
  marginRight: 7,
  width: 45,
  height: 45,
  borderRadius: 50,
};
var cover_pic = {
  width: 1250,
  height: 200,
  marginLeft: -60,
  padding:0,
};
var section_label = {
  fontFamily: _cvals.mainfont,
  fontWeight: 200,
  paddingTop: 10,
  paddingLeft: 28,
  width: 300,
  color: '#262626',
};
var title_div = {
  width: 700,
  fontFamily: _cvals.mainfont,
  fontWeight: 400,
  fontSize: 45,
  paddingTop: 18,
  color: '#262626',
};
var team_label_1 = {
  display: 'block',
  fontFamily: _cvals.mainfont,
  fontWeight: 500,
  fontSize: 25,
  color: '#262626',
};
var team_label_2 = {
  display: 'block',
  paddingTop: 15,
  fontFamily: _cvals.mainfont,
  fontWeight: 500,
  fontSize: 25,
  color: '#262626',
};
var score = {
  fontSize: 25,
  paddingLeft: 20,
  paddingTop: 10,
  color: '#262626',
};
var left_data = {
  width: entry/2.5,
  float: 'left',
  fontFamily: _cvals.mainfont,
  fontWeight: 400,
  fontSize: 25,
  color: '#262626',
};
var right_data = {
  width: entry/2.5,
  fontFamily: _cvals.mainfont,
  fontWeight: 200,
  fontSize: 25,
  color: '#262626',
};
var sidebar = {
  width: 250,
  float: 'left',
  flex: 10,
  fontFamily: _cvals.mainfont,
  fontSize: 18,
  color: '#262626',
};
var sidebar_item = {
  display: 'block',
  padding: 20,
  paddingLeft: 300,
  cursor: 'pointer',
  transition: 0.15,
  fontSize: 18,
  color: '#262626',
};

export default Matches;