'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _MatchDefault = require('../modules/match')
import * as _ctools from '../libs/customtools.js'

import * as Match from '../modules/match'
import * as Team from '../modules/team'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} = React;

var MatchRow = React.createClass({

  getInitialState: function() {
    return (
      {
        match: Match.default_match,
        teams: [Team.default_team, Team.default_team]
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        matchid: 0,
      }
    )
  },
  render: function() {
    var {
      matchid,
      navigator,
      ...props
    } = this.props;
    if (this.state.loaded) {
      return (
        <View>
          <TouchableOpacity onPress={this.onPress}
                            style={styles.container}>
            <View style={styles.player_row}>
              <Image source={{uri: this.state.teams[0].thumbnail}}
                     style={styles.pic} />

              <View style={styles.name}>
                <Text style={_cstyles.standard_text}>
                  {this.state.teams[0]['name']}
                </Text>
              </View>
              <View style={styles.scores}>
                {this.state.match['scores'].map(createScoreRowTop)}
              </View>
            </View>

            <View style={styles.player_row}>
              <Image source={{uri: this.state.teams[1].thumbnail}}
                     style={styles.pic} />

              <View style={styles.name}>
                <Text style={_cstyles.standard_text}>
                  {this.state.teams[1]['name']}
                </Text>
              </View>
              <View style={styles.scores}>
                {this.state.match['scores'].map(createScoreRowBottom)}
              </View>
            </View>

            <View style={styles.details}>
              <Text style={_cstyles.light_text}>
                {_ctools.toDate(new Date(this.state.match.datetime))}
              </Text>
              <Text style={_cstyles.light_text}>
                {" at " + this.state.match.location}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={_cstyles.divider_line}></View>
        </View>
      )
    }
    return (<View></View>)
  },

  fetchMatch: function(data) {
    this.state.match = data
    Team._GetTeam(this.state.match.teams[0], this.fetchTeam1)
    Team._GetTeam(this.state.match.teams[1], this.fetchTeam2)
    this.setState({loaded : true})
  },

  fetchTeam1: function(data) {
    this.state.teams[0] = data
    this.setState({loaded : true})
  },

  fetchTeam2: function(data) {
    this.state.teams[1] = data
    this.setState({loaded : true})
  },



  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)
  },

  onPress: function() {
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(_ctools.randomKey()),
      component: MatchPage,
      passProps: {
        matchid: this.props.matchid,
        navigator: this.props.navigator
      }
    })
  },
})

var Score = React.createClass({
  render: function() {
    var style = {}
    if (this.props.win == false) {
      style = {opacity: 0.5}
    }
    return (
      <View style={styles.score}>
        <Text style={[_cstyles.detail_text,
                      _cstyles.centeredText,
                      style,
                      ]}>
          {this.props.val}
        </Text>
      </View>
    );
  }
});

var createScoreRowTop = function(score, i) {
  return (
    <Score key={i} val={score[0]} win={(score[0] > score[1])}/>
  )
}

var createScoreRowBottom = function(score, i) {
  return (
    <Score key={i} val={score[1]} win={(score[0] < score[1])}/>
  )
}
var picslength = _cvals.dscale * 30

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: _cvals.dscale * 8,
    paddingBottom: _cvals.dscale * 4,
  },
  player_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: _cvals.dscale * 4
  },
  name: {
    paddingHorizontal: 10,
    width: windowSize.width * 2 / 5,
  },
  scores: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: windowSize / 3,
  },
  score: {
    width: picslength
  },
  pic: {
    height: picslength,
    width: picslength,
    borderRadius: picslength / 2
  },
  details: {
    marginTop: _cvals.dscale * 2,
    marginBottom: _cvals.dscale * -3,
    marginLeft: picslength * 1.35,
    flexDirection: 'row',
  }
})

module.exports = MatchRow;
