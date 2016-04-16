'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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
        teamid: 0,
      }
    )
  },
  render: function() {
    var {
      title,
      value,
      teamid,
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
    // props.teamid not properly seen
    Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },

  
});

var styles = StyleSheet.create({

})

module.exports = TeamBlock;
