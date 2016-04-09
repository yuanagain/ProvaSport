'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')

import * as Team from '../modules/team'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var TeamBlock = React.createClass({
  getInitialState: function() {
    return (
      {
        team: Team.default_team,
        loaded: false,
      }
    );
  },
  getDefaultProps() {
    return (
      {
        /* HOw do we change this based on past screen data?   */
        teamid: 1,
      }
    )
  },
  render: function() {
    var {
      title,
      value,
      team,
      navigator,
      ...props
    } = this.props;


    return (
      <TouchableOpacity onPress={this.onPress}>
        <SimpleRow title={this.state.team.name}
                   value={this.props.value} />
      </TouchableOpacity>
    );
  },

  onPress: function() {
      var TeamPage = require('../screens/teampage')
      this.props.navigator.push({
        id: "TeamPage" + String(_ctools.randomKey()),
        component: TeamPage,
        passProps: {
          teamid: this.props.teamid,
          navigator: this.props.navigator
        }
      })
    },


  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Team._GetTeam(this.props.teamid, this.fetchTeam)
  },
});

var styles = StyleSheet.create({
  values: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: windowSize.width / 2 - _cvals.stdmargin
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: windowSize.width / 2
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0,
    paddingRight: _cvals.stdmargin,
    width: windowSize.width
  },
})

module.exports = TeamBlock;
