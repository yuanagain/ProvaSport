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

            <TeamBlock title={this.state.teams[0].name}
                       teamid={this.state.match.teams[0]}
                       value={""}
                       navigator={this.props.navigator}/>

            <TeamRow navigator={this.props.navigator} />

            <View style={_cstyles.section_divider_line} ></View>

            <TeamBlock title={this.state.teams[1].name}
                       teamid={this.state.match.teams[1]}
                       value={""}
                       navigator={this.props.navigator}/>

            <TeamRow navigator={this.props.navigator} />

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
    //}

    // else {
    //   return (
    //     <LoadingPage navigator={this.props.navigator}/>
    //   );
    // }
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
