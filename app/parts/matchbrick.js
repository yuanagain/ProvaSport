import React from 'react';
import TeamBrick from './teambrick'

import _cstyles from '../constants/customstyles'
import defaults from '../constants/defaults'


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
        match: defaults.default_match,
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
            <p style={_cstyles.detail_text}>
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

var styles = {
  scores: {
    height: 20,
    marginBottom: -20,
    paddingLeft: 5,
  },
}
export default MatchBrick;