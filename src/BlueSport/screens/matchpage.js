'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var TeamRow = require('../parts/teamrow')
var SimpleRow = require('../smallparts/simplerow')
var DynamicList = require('../bigparts/dynamiclist')
var TeamBlock = require('../smallparts/teamblock')
var WideButton = require('../smallparts/widebutton')
var WideButtonPair = require('../smallparts/widebuttonpair')
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
  Image,
  Platform,
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
  //somehow find a way to tie use to team to match
  getDefaultProps: function() {
    return (
      {
        userteamid: 1,
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

    var buttons = <View></View>

      //console.log("MATCHSTAT  "+ this.state.match.status[this.props.userteamid])
    if (this.state.match.status['0'] == 3) {
      console.log("MATCH  "+ this.state.match.status['0'])
      // if this is an unconfirmed match
      buttons = <WideButtonPair textRight={"Confirm"}
                                textLeft={"Adjust"}
                                onPressRight={()=>console.log("Confirmed") setStatus(4, 0, )}
                                onPressLeft={()=>console.log("Left")} />
    }

    if (this.state.match.status['0'] == 0) {
      // if this match can be edited by the player
      buttons = <WideButtonPair textRight={"Accept"}
                                textLeft={"Decline"}
                                onPressRight={()=>console.log("Right")}
                                onPressLeft={()=>console.log("Left")} />
    }

    if (this.state.match.status['0'] == 2) {
      // if this match can be edited by the player
      buttons = <WideButton text={"Record"}
                            onPress={()=>console.log("Log")} />
    }

    return (
      <View style={styles.container}>
        <View>
          <Header title={"MATCH"}
                mode={'nav'}
                navigator={this.props.navigator} />
          <ScrollView style={styles.scroll_container}>
            <View style={_cstyles.body_container}>

              <SimpleRow title={"Date "} value={_ctools.toDate(new Date(this.state.match.datetime))} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Status "} value={"Complete"} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Location "} value={this.state.match.location} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Sport "} value={this.state.match.sport} />
              <View style={_cstyles.section_divider_line} ></View>


              <TeamBlock teamid={this.state.match.teams[0]}
                         value={""}
                         navigator={this.props.navigator}/>

              <TeamRow teamid={this.state.match.teams[0]}
                       navigator={this.props.navigator} />


              <TeamBlock teamid={this.state.match.teams[1]}
                         getTeam={this.state.getTeams}
                         value={""}
                         navigator={this.props.navigator}/>

              <TeamRow  teamid={this.state.match.teams[1]}
                        navigator={this.props.navigator} />

              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Scores "} value={""} />
              <DynamicList
                items={this.state.match.scores}
                magic={'scores_fixed'}
              />

              <View style={_cstyles.section_divider_line} ></View>
            </View>
          </ScrollView>
        </View>
        {buttons}
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
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  scroll_container: {
    width: windowSize.width,
    flexDirection: 'column',
    flex: 1,
    height: (Platform === 'ios') ? windowSize.height / 1.33 : windowSize.height / 1.43,
  },
  // Not sure this is needed, removed for now
  content: {
    flex: 1,
    width: windowSize.width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
})

module.exports = MatchPage;
