'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PlayerBrick = require('../parts/playerbrick')

import * as _ctools from '../libs/customtools.js'
import * as Team from '../modules/team'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} = React;

var TeamRow = React.createClass({
  getInitialState: function() {
    return ({
      team: Team.default_team,
    })
  },

  getDefaultProps: function() {
    return (
      {
        //team players
        
      }
    )
  },

  createPlayerBricks: function(playerid, i) {
    // TODO Somehow navigator is not being passed.
    return (
      <PlayerBrick key={i} playerid={playerid}
          navigator={this.props.navigator} />
    )
  },

  render: function() {
    var {
      teamid,
      getTeamid,
      navigator,
      ...props
    } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}
                        style={styles.container}>
        <ScrollView style={styles.scroll}
          contentContainerStyle={[styles.content,
                  {width: (_cvals.bricklength + 10) * this.state.team.players.length,}]}>

          {this.state.team.players.map(this.createPlayerBricks)}
        </ScrollView>
      </TouchableOpacity>

    )
  },


  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // props.teamid not properly seen
    Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },


});

var picslength = _cvals.dscale * 30

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: _cvals.dscale * 4,
  },
  scroll: {
    height: _cvals.brickheight + 12 * _cvals.dscale,
    width: windowSize.width,
  },
  content: {
    height: _cvals.brickheight,
    paddingLeft: 8 * _cvals.dscale,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  }
})

module.exports = TeamRow;
