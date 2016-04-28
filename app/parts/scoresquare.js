import React from 'react';
import TeamBrick from './teambrick'

import _cstyles from '../constants/customstyles'
import _cvals from '../constants/customvals'
import defaults from '../constants/defaults'


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
        match: defaults.default_match,
        loaded: true,
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

    var tally = this.getTally(this.state.match)
    console.log(tally)
    return (
      <div style={styles.playersquare}>
        <div style={[styles.icon, ]}>
          <div style={[styles.standard_text]}>
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
  },

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


var styles = {
  playersquare: {
    display: 'flex',
    height: _cvals.slength,
    width: _cvals.slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    display: 'flex',
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}
export default ScoreSquare;