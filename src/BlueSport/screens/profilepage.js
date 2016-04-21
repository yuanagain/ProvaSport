'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
var Header = require('../parts/header')
var PayoutSection = require('../smallparts/payoutsection')
var PayoutListing = require('../smallparts/payoutlisting')
var SimpleRow = require('../smallparts/simplerow')
var MatchList = require('../bigparts/matchlist')

import * as Player from '../modules/player'
import Store from 'react-native-store';


//database name and constant for storing data
const DB = {
  'user': Store.model("user"),
  'player': Store.model("player")
}
DB.player.get().then(resp => console.log(resp.playerid))
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  Modal,
} = React;

var ProfilePage = React.createClass({
  getInitialState: function() {

    return (
      {
        player: Player.default_player,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerid: 0,
        teamid: 0,
        mode: 'nav'
      }
    )
  },
  render: function() {
    var {
      playerid,
      loginFunction,
      ...props
    } = this.props;
    return (
    <View style={styles.container}>
      <View>
        <Header title={this.state.player.name.full}
                mode={this.props.mode}
                navigator={this.props.navigator} />
      </View>
      <ScrollView styles={[styles.scroll, {height: windowSize.width}]}
                  contentContainerStyle={styles.content} >
        <Image source={{uri: this.state.player.prof_pic}}
               style={styles.pic} />

        <View style={_cstyles.body_container}>
          <SimpleRow
            title={'Name'}
            value={this.state.player.name.full}/>

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Nationality'}
            value={this.state.player.nationality}/>

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Level'}
            value={this.state.player.level}/>

          <View style={_cstyles.section_divider_line}></View>

          <PayoutSection
            title={'Earnings'}
            earnings={_ctools.cumulativeEarnings(this.state.player.earnings)}
          />

          <PayoutListing
            earnings={this.state.player.earnings} />

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Sports'}
            value={this.state.player.sports}/>

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Location'}
            value={this.state.player.home}/>

          <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Teams'}
          value={this.state.player.teams.length}
          onPress={this.toTeamListing} />
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Career Matches"}
                   value={this.state.player.matches.length}
                   onPress={()=>this.toMatchListing()}/>
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Recent Matches"}
                   value={this.state.player.matches.length}
                   />

          <View style={styles.matches}>
            <MatchList
              matches={this.state.player.matches.slice(0, 3)}
              navigator={this.props.navigator}
            />
          </View>
        </View>
      </ScrollView>
      <View style={_cstyles.buttons_container}>
      </View>
    </View>
    );
  },
  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },
  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },
  componentWillReceiveProps: function(nextProps) {
    Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },

  toTeamListing() {
    var TeamListingPage = require('../screens/teamlistingpage')
    this.props.navigator.push({
      id: "TeamListing",
      component: TeamListingPage,
      passProps: {
        navigator: this.props.navigator,
        teams: this.state.player.teams
      }
    })
  },

  toMatchListing() {
    var MatchListingPage = require('../screens/matchlistingpage')
    this.props.navigator.push({
      id: "TeamListing",
      component: MatchListingPage,
      passProps: {
        navigator: this.props.navigator,
        matches: this.state.player.matches
      }
    })
  },

});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
  pic: {
    width: windowSize.width,
    height: windowSize.width,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'grey',
    // width: windowSize.width,
    height: 300,
  },
  matches: {
    height: 200 * _cvals.dscale
  }
})


module.exports = ProfilePage;
