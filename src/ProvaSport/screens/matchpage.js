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
import * as _clogic from '../libs/customlogic'
import * as Match from '../modules/match'
import * as Team from '../modules/team'
import * as Player from '../modules/player'
import * as Tournament from '../modules/tournament'

var {
  AsyncStorage,
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
        team2: Team.default_team,
        player: Player.default_player,
        myStatus: 1,
        myTeam: -1
      }
    );
  },
  //somehow find a way to tie use to team to match
  getDefaultProps: function() {
    return (
      {
        userteamid: 1,
        matchid: -1,
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

    var buttons = <View/>
    console.log("STATUS:  "+this.state.myStatus)
    if (this.state.myStatus == 3) {
      //console.log("MATCH  "+ this.state.match.status['0'])
      // if this is an unconfirmed match
      buttons = <WideButtonPair textRight={"Confirm"}
                                textLeft={"Adjust"}
                                onPressRight={()=>{this.changeStatus(4); this.checkToUpdate()} }
                                onPressLeft={()=>this.toRecordPage()} />
    }

    if (this.state.myStatus == 0) {
      // if this match can be edited by the player
      buttons = <WideButtonPair textRight={"Accept"}
                                textLeft={"Decline"}
                                onPressRight={()=>this.changeStatus(2)}
                                onPressLeft={()=>this.changeStatus(-1)} />
    }

    if (this.state.myStatus == 2) {
      // if this match can be edited by the player
      buttons = <WideButton text={"Record"}
                            onPress={()=> {this.changeStatus(3);this.toRecordPage();}} />
    }

    return (
      <View style={styles.container}>
        <View style={(Platform.OS === 'ios') ? {height: 535 * _cvals.vscale} : {height: 520 * _cvals.vscale}}>
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
                          backgroundColor={(Platform.OS === 'ios') ? _cvals.skorange : 'white'}
                        />
                      }>
            <View style={_cstyles.body_container}>

              <SimpleRow title={"Date "} value={_ctools.toDate(new Date(this.state.match.datetime))} />
              <View style={_cstyles.section_divider_line} />

              <SimpleRow title={"Status "} value={_ctools.codeToString(this.state.match.status[this.state.myTeam])} />
              <View style={_cstyles.section_divider_line} />

              <SimpleRow title={"Location "} value={this.state.match.location} />
              <View style={_cstyles.section_divider_line} />

              <SimpleRow title={"Sport "} value={this.state.match.sport[0]} />
              <View style={_cstyles.section_divider_line} />


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

              <View style={_cstyles.section_divider_line} />

              <SimpleRow title={"Scores "} value={""} />
              <DynamicList
                items={this.state.match.scores}
                magic={'scores_fixed'}
              />

              <View style={_cstyles.section_divider_line} />
            </View>
          </ScrollView>
        </View>
        {buttons}
      </View>
    );
  },

  onRefresh: function() {
    this.setState({isRefreshing: true})
    console.log("Refresh");
    //Match._GetMatch(this.props.matchid, this.fetchMatch)
    //Match.myStatus(this.props.matchid).then(resp=>{this.setState({myStatus: resp}); console.log("RESP"+resp)})
    this.loadPlayer();
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, _cvals.timeout);
  },

  getTeamid1: function() {
    //console.log("LOADTEAMS")
    return this.state.match.teams[0]
  },
  //will update the match and possibly the tournament correctly
  checkToUpdate: function(){
    //check that both teams have confirmed attitude towards match
    //if (this.state.match.status[0] === 4 && this.state.match.status[1] === 4){
      //see if it is bound to a tournamentid
      if (this.state.match.tournamentid && this.state.match.tournamentid !== -1) {
        //grab tournament object
        console.log("You Have Advanced Someone!");
        Tournament.getTournament(this.state.match.tournamentid).then(tournament=>{
          //get a list of match objects
          if (tournament.type == "Elimination") {
            var matchids = tournament.matches;
            Match.fetchList(tournament.matches).then(matchobjs=>{
              //update that list and the tournament
              var data = _clogic.update_matches(matchobjs, tournament);
              console.log("DATA FROM update()");
              console.log(data);
              var matches = data.matches;
              var teams = data.teams;
              console.log(teams);
              Team.updateMatches(teams);
              Match.setFromList(matchids, matches).then(resp=>console.log(matches)).catch(function(err){
                console.log("in matchpage.js 301: "+err)})
            })
          }
        })
      }
    //}
  },
  getTeamid2: function() {
    //console.log("LOADTEAMS")
    return this.state.match.teams[1]
  },

  loadTeams: function() {
    console.log("LOAD1");
    console.log(this.state.match.teams)
    Team.getTeam(this.state.match.teams[0]).then(resp=>this.setState({team1: resp})).then(this.load2).catch(function(err){
      console.log(err);
    });

  },
  load2: function() {
    console.log("LOAD2");
    Team.getTeam(this.state.match.teams[1]).then(resp=>this.setState({team2: resp,
          loaded: true})).then(this.teamOn).catch(function(err){
      console.log(err);
    });
  },

  fetchMatch: function(data) {
    this.setState({match: data,
                  loaded: true});
    console.log("\n\nCalling LoadTeams");
    this.loadTeams()
  },
  teamOn:function(){
    /*
     * console.log("TEAM ON");
     * console.log(this.state.player.playerid);
     * console.log(this.state.team1.players);
     * console.log(this.state.team2.players);
     */
    var playerid = String(this.state.player.playerid);
    //|| this.state.playerid in this.state.team1.players
    if (this.state.team1.players.indexOf(playerid) >- 1){
      console.log("\n\nTEAM1");
      var code = this.state.match.status[0];
      this.setState({myStatus: code,
        myTeam: 0})
    }
    //|| this.state.playerid in this.state.team2.players
    else if (this.state.team2.players.indexOf(playerid) >- 1) {
      console.log("\n\nTEAM2");
      var code = this.state.match.status[1];
      this.setState({myStatus: code,
      myTeam: 1})
    }
    else {
      console.log("you are not in this Match")
    }
  },
  componentDidMount: function () {
    this.loadPlayer();
    // this.state.match = this.props.match
  },

  toRecordPage: function() {
    var RecordPage = require('../screens/recordpage')
    this.props.navigator.push({
      id: "RecordingScores",
      component: RecordPage,
      passProps: {
        mode: "nav",
        navigator: this.props.navigator,
        matchid: this.props.matchid,
        match: this.state.match,
        team1: this.state.team1,
        team2: this.state.team2
      }
    })
  },
  changeStatus: function(code) {
    console.log("CHANGING STATUS")
    this.setState({myStatus: code})
    if (code != -1) {
      this.state.match.status[this.state.myTeam] = code;
      Match.setMatch(this.props.matchid, this.state.match).then(resp=>this.setState({match: resp}))
    }
  },
  loadPlayer: function(){
    var matchid = this.props.matchid;
    try {
      var value = AsyncStorage.getItem('player', (error, response)=>{
        var obj = JSON.parse(response)
        // this is player id of person logged in. WORKS!!
        //console.log(obj.playerid)
        this.setState({player: obj})
        Match._GetMatch(matchid, this.fetchMatch);
      });
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

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
    height: (Platform.OS === 'ios') ? (windowSize.height / 1.33) : (windowSize.height / 1.43),
  },
  // Not sure this is needed, removed for now
  content: {
    flex: 1,
    width: windowSize.width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 200,
  },
})

module.exports = MatchPage;
