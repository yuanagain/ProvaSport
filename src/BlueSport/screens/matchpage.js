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
  RefreshControl,
} = React;

var MatchPage = React.createClass({
  getInitialState: function() {
    return (
      {
        match: Match.default_match,
        teams: [Team.default_team, Team.default_team],
        loaded: false,
        team1: Team.default_team,
        team2: Team.default_team
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
      //console.log("MATCH  "+ this.state.match.status['0'])
      // if this is an unconfirmed match
      buttons = <WideButtonPair textRight={"Confirm"}
                                textLeft={"Adjust"}
                                onPressRight={()=>this.changeStatus(4)}
                                onPressLeft={()=>this.toRecordPage()} />
    }

    if (this.state.match.status['0'] == 0) {
      // if this match can be edited by the player
      buttons = <WideButtonPair textRight={"Accept"}
                                textLeft={"Decline"}
                                onPressRight={()=>this.changeStatus(2)}
                                onPressLeft={()=>console.log("Left")} />
    }

    if (this.state.match.status['0'] == 2) {
      // if this match can be edited by the player
      buttons = <WideButton text={"Record"}
                            onPress={()=> this.toRecordPage()} />
    }

    return (
      <View style={styles.container}>
        <View style={{height: 565 * _cvals.vscale}}>
          <Header title={"MATCH"}
                mode={'nav'}
                navigator={this.props.navigator} />
          <ScrollView style={styles.scroll_container}
                      refreshControl={
                        <RefreshControl
                          refreshing={this.state.isRefreshing}
                          onRefresh={this.onRefresh}
                          tintColor={'white'}
                          colors={['#ff0000', '#00ff00', '#0000ff']}
                          backgroundColor={_cvals.skorange}
                        />
                      }>
            <View style={_cstyles.body_container}>

              <SimpleRow title={"Date "} value={_ctools.toDate(new Date(this.state.match.datetime))} />
              <View style={_cstyles.section_divider_line} ></View>

              <SimpleRow title={"Status "} value={_ctools.codeToString(this.state.match.status[0])} />
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

  onRefresh: function() {
    this.setState({isRefreshing: true})
    Match._GetMatch(this.props.matchid, this.fetchMatch)
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, _cvals.timeout); 
  },

  getTeamid1: function() {
    return this.state.match.teams[0]
  },

  getTeamid2: function() {
    return this.state.match.teams[1]
  },

  loadTeams: function() {
    Team.getTeam(this.state.match.teams[0]).then(resp=>this.setState({team1: resp})).catch(function(){
      console.log("");
    });
    Team.getTeam(this.state.match.teams[1]).then(resp=>this.setState({team2: resp})).catch(function(){
      console.log("");
    });
  },

  fetchMatch: function(data) {
    this.state.match = data
    this.setState({match: data})
    console.log(data)
    this.setState({loaded : true})
    this.loadTeams()
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)

  },

  toRecordPage: function() {
    var RecordPage = require('../screens/recordpage')
    this.props.navigator.push({
      id: "RecordingScores",
      component: RecordPage,
      passProps: {
        navigator: this.props.navigator,
        matchid: this.props.matchid,
        match: this.state.match,
        team1: this.state.team1,
        team2: this.state.team2
      }
    })
  },
  changeStatus: function(code) {
    this.state.match.status['0'] = code;
    Match._SetMatch(this.props.matchid, this.state.match, this.changeA)
  },
  changeA: function(resp){
    this.setState({match: resp});
  }

  /*
   * setStatus: function(status) {
   *   Match.setStatus(status)
   * }
   */
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
