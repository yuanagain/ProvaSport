// Mapping help: https://facebook.github.io/react/docs/tutorial.html
// Accessed: April 20, 2016

var React = require('react');
var ReactDOM = require('react-dom');

var _cvals = require('./constants/customvals');
import _ctools from './libs/customtools'
import * as Match from './modules/match';
import * as Team from './modules/team';
import default_pic from './styles/default_pic.jpg';


/* Pass props to component within map */
var Newsfeed = React.createClass({
  getInitialState: function() {
    return (
      {
        matches: null,
      }
    )
  },

  componentWillMount: function() {
    Match.getAllMatches().then(resp =>(
      this.setState({matches: resp})
    ))
  },

  render: function() {
    var matches = this.state.matches
    if (matches != null) {
      matches = matches.sort(this.compareMatches)
    }
    return (
      <div className="entry">
        <p style={title}> News </p>
        <EntryMap matches={this.state.matches} />
      </div>
    );
  },

  compareMatches: function(match1, match2) {
    if (match1.datetime < match2.datetime)
      return 1;
    else if (match1.datetime > match2.datetime)
      return -1;
    else
      return 0;
  },
});

var Entry = React.createClass({
  render: function() {
    return (
      <span style={entry}>
        <div style={text}>
          {this.props.team1} played {this.props.team2} in a game of {this.props.sport}.
        </div>
        {this.props.children}
      </span>
    );
  }
});

var EntryMap = React.createClass({
  render: function() {
    if (this.props.matches == null) {
      return (
        <div className="entryMap">
          <p>Loading...</p>
        </div>
      )
    }
    else {
      var matches = this.props.matches
      if (this.props.matches.length <= 25)
        matches = this.props.matches
      else {
        matches = this.props.matches.slice(0, 25)
      }
      var entries = matches.map(function(match, i) {
        return (
          <NewsEntry match={match} key={i}/>
        );
      })
    }
    return (
      <div className="entryMap">
        {entries}
      </div>
    );
  }
});

var NewsEntry = React.createClass({
  getInitialState: function() {
    return (
      {
        match: null,
        winner: Team.default_team,
        loser: Team.default_team,
      }
    )
  },

  fetchWinner: function(team) {
    this.setState({winner: team})
  },

  fetchLoser: function(team) {
    this.setState({loser: team})
  },

  componentWillMount: function() {
    if (this.props.match.teams != null && this.props.match.scores != null) {
      var winnerIndex = _ctools.getWinnerIndex(this.props.match)
      var loserIndex = (winnerIndex = 1) ? 0 : 1;
      Team._GetTeam(this.props.match.teams[winnerIndex], this.fetchWinner)
      Team._GetTeam(this.props.match.teams[loserIndex], this.fetchLoser)
    }
    this.setState({match: this.props.match})
  },

  render: function() {
    var {
      match,
    } = this.props;
    if (this.state.match == null || this.state.match.teams == null) {
      return (
        <div className="entryMap">
          <p></p>
        </div>
      )
    }
    var scores
    if (this.state.match.scores == null)
        return (<div></div>)

    scores = _ctools.getScoreStrings(this.state.match.scores)
    var winnerIndex = _ctools.getWinnerIndex(this.state.match)
    var loserIndex = (winnerIndex == 1) ? 0 : 1;

    var picWinner = this.state.winner.thumbnail
    if (picWinner == "Loading")
      picWinner = default_pic

    var picLoser = this.state.loser.thumbnail
    if (picLoser == "Loading")
      picLoser = default_pic

    if (this.state.winner.name == "BYE" || this.state.loser.name == "BYE" || this.state.winner.name == "TBD" || this.state.loser.name == "TBD")
        return (<div></div>)

    return (
      <Entry team1={this.state.winner.name} team2={this.state.loser.name} sport={this.state.match.sport}>
        <div style={date}>
          {_ctools.toDate(new Date(this.state.match.datetime)) + " at " + _ctools.formatTime(new Date(this.state.match.datetime))}
        </div>
        <div style={pic_container}>
          <img style={pic}
            src = {picWinner}
          />
          <div style={score}>
            {scores[winnerIndex]}
          </div>
        </div>
        <div style={pic_container}>
          <img style={pic}
            src = {picLoser}
          />
          <div style={score}>
            {scores[loserIndex]}
          </div>
        </div>
      </Entry>
    )
  },

});

// Styling
// width value is temp, obviously
var width = window.innerWidth / 2.5;
var entry = {
  width: width,
  backgroundColor: _cvals.skbackground,
  padding: 30,
  margin: 30,
  marginTop: 10,
  marginLeft: 40,
  fontFamily: _cvals.mainfont,
  color: '#262626',
  fontSize: 20,
  display: 'block',
};
var title = {
  fontFamily: _cvals.mainfont,
  fontSize: 36,
  marginLeft: 20,
  marginTop: 40,
  marginBottom: 30,

}
var text = {
  width: width,
  // float: 'left',
  display: 'block',
};
var date = {
//  float: 'left',
  color: '#666666',
  fontSize: 15,
  padding: 10,
  display: 'block',
};
var pic_container = {
  height: 50,
  paddingTop: 15,
  display: 'block',
};
var pic = {
  float: 'left',
  width: 45,
  height: 45,
  borderRadius: 50,
};
var score = {
  float: 'left',
  color: '#262626',
  fontSize: 25,
  paddingLeft: 10,
  margin: 5,
};

//ReactDOM.render(
//  <Newsfeed data={data} />,
//  document.getElementById('newsfeed_container')
//);
export default Newsfeed;