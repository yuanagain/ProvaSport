'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var TeamRow = require('../parts/teamrow')
var SimpleRow = require('../smallparts/simplerow')
var DynamicList = require('../bigparts/dynamiclist')
var TeamBlock = require('../smallparts/teamblock')

var LoadingPage = require('../screens/loadingpage')
import * as _ctools from '../libs/customtools'
import * as Match from '../modules/match'
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

var MatchPage = React.createClass({
  getInitialState: function() {
    return (
      {
        match: Match.default_match,
        teams: [Team.default_team, Team.default_team],
        loaded: false,
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
      teams,
      match,
      navigator,
      ...props
    } = this.props;

    console.log("teams")
    console.log(this.state.match.teams)

    //if (this.state.loaded) {
      return (
        <View>
          <Header title={"MATCH"}
                  mode={'nav'}
                  navigator={this.props.navigator} />
          <ScrollView style={styles.container}
                      contentContainerStyle={styles.content}>

            <SimpleRow title={"Date"} value={_ctools.toDate(new Date(this.state.match.datetime))} />
            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Sport"} value={this.state.match.sport} />
            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Location"} value={this.state.match.location} />
            <View style={_cstyles.section_divider_line} ></View>

            <TeamBlock teamid={this.state.match.teams[0]}
                       value={""}
                       navigator={this.props.navigator}/>

            <TeamRow  teamid={this.state.match.teams[0]}
                      navigator={this.props.navigator} />

            <View style={_cstyles.section_divider_line} ></View>

            <TeamBlock teamid={this.state.match.teams[1]}
                       getTeam={this.state.getTeams}
                       value={""}
                       navigator={this.props.navigator}/>

            <TeamRow  teamid={this.state.match.teams[1]}
                      navigator={this.props.navigator} />

            <View style={_cstyles.section_divider_line} ></View>

            <SimpleRow title={"Scores"} value={""} />
            <DynamicList
              items={this.state.match.scores}
              magic={'scores_fixed'}
            />

            <View style={_cstyles.section_divider_line} ></View>

          </ScrollView>
        </View>
      );
  },

  getTeamid1: function() {
    return this.state.match.teams[0]
  },

  getTeamid2: function() {
    return this.state.match.teams[1]
  },

  fetchMatch: function(data) {
    this.state.match = data
    this.setState({match: data})
    console.log(data)
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)

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
})

module.exports = MatchPage;
