'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var SimpleRow = require('../smallparts/simplerow')

var MatchList = require('../bigparts/matchlist')

import * as Team from '../modules/team'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image
} = React;

var TeamPage = React.createClass({
  getInitialState: function() {
    return (
      {
        team: this.props.team,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        team:
          {
            "name" : "LOADING",
            "players": []
          },
        teamid: 0,
      }
    )
  },
  render: function() {
    var {
      match,
      navigator,
      ...props
    } = this.props;

    return (
    <View>
      <Header title={this.state.team.name}
              mode={'nav'}
              navigator={this.props.navigator} />
      <ScrollView style={styles.container}
                  contentContainerStyle={styles.content}>

        <SimpleRow title={"Team Name"} value={this.state.team.name} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Sport"} value={this.state.team.sport} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Location"} value={"MBBC"} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow title={"Members"} value={this.state.team.players.length} />
        <View style={_cstyles.section_divider_line} ></View>

        <SimpleRow navigator={this.props.navigator} />
        <View style={_cstyles.section_divider_line} ></View>

        
        <SimpleRow title={"Recent Matches"} value={""} />

        <View style={styles.matches}>
          <MatchList
            navigator={this.props.navigator}
            matches={this.state.team.matches}
          />
        </View>

        <View style={_cstyles.section_divider_line} ></View>

      </ScrollView>
    </View>
    );
  },
  /*
   * fetchPlayer: function(data) {
   *   this.state.player = data
   *   console.log("DATA SUCCESSFULLY FETCHED")
   *   console.log(data);
   *   this.setState({loaded : true})
   * },
   */
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
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1
  },
  content: {
    flex: 1,
    width: windowSize.width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  section: {

  },
  matches: {
    height: 200 * _cvals.dscale
  }
})

module.exports = TeamPage;
