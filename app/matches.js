var React = require('react');
var ReactDOM = require('react-dom');

import './styles/menu.css';
import _cvals from './constants/customvals';
import _ctools from './libs/customtools'

import * as Match from './modules/match'
import * as Team from './modules/team'
import * as Player from './modules/player'

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
  getDefaultProps: function() {
    // dummy match data
    var data = [{
      date:      'April 20, 2016',
      date_abbr: '04/20/2016',
      time:      '07:00 PM',
      location:  'ProClub Seattle',
      team_1:    'The Microsofties',
      team_2:    'Amazon\'s BaseBallers',
      result:    'beat',
      sport:     'baseball',
      sport_cap: 'Baseball',
      payout:    '10,000',
      win_bonus: '4,000',
      score_a:   '0 2 1 0 3 2 2 1 0',
      score_b:   '3 2 2 0 1 2 0 0 0',
      total_a:   '11',
      total_b:   '10'
    }];
    return (
      {
        data: data,
      }
    )
  },

  fetchMatch: function(data) {
    var matches = this.state.matches.slice()
    matches.push(data)
    this.setState({matches: matches})
  },

  componentWillMount: function() {
    var matchid;
    for (matchid in this.state.matchids)
      Match._GetMatch(matchid, this.fetchMatch)
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
          <PlayersMap data={this.props.data} />
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
        <div style={team_label_1}>
          {this.props.team_1}
        </div>
        {this.props.children}
        <div style={team_label_2}>
          {this.props.team_2}
        </div>
        {this.props.children}
      </span>
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
          <p style={data_column_right}>{match.sport.charAt(0).toUpperCase() + match.sport.slice(1)}</p>
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



// TODO: How do I map the pics separately from var data[]?
var PlayersMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <PlayersEntry team_1={entry.team_1} team_2={entry.team_2}>
          <div style={pic_container}>
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
            <img style={pic}
              src = 'http://facebook.github.io/react/img/logo_og.png'
            />
          </div>
        </PlayersEntry>
      );
    });
    return (
      <div className="playersMap">
        {vals}
      </div>
    );
  }
});

// Match Info
/*
var MatchMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <MatchEntry date_abbr={entry.date_abbr} time={entry.time} location={entry.location} sport_cap={entry.sport_cap} payout={entry.payout} win_bonus={entry.win_bonus}>
        </MatchEntry>
      );
    });
    return (
      <div className="scoresMap" style={matchInfo}>
        {vals}
      </div>
    );
  }
});
*/

// Scores
var ScoresMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry) {
      return (
        <ScoresEntry team_1={entry.team_1} score_1={entry.score_a} team_2={entry.team_2} score_2={entry.score_b}>
        </ScoresEntry>
      );
    });
    return (
      <div className="matchMap">
        {vals}
      </div>
    );
  }
});

// Page title
/*var TitleMap = React.createClass({
  render: function() {
    var vals = this.props.data.map(function(entry, i) {
      return (
        <div key={i}>
          <TitleEntry date={entry.date} key={i}>
          </TitleEntry>
        </div>
      );
    });
    return (
      <div className="matchMap">
        {vals}
      </div>
    );
  }
});
*/



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
  paddingTop: 28,
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