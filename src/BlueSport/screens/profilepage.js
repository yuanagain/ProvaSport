'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
var Header = require('../parts/header')
var PayoutSection = require('../smallparts/payoutsection')
var PayoutListing = require('../smallparts/payoutlisting')
var SimpleRow = require('../smallparts/simplerow')
var MatchList = require('../bigparts/matchlist')



import * as Player from '../modules/player'
// var _GetTeam = require('../modules/team')

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
      }
    )
  },
  render: function() {
    var {
      player,
      team,
      loginFunction,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <Header title={this.state.player.name}
                mode={'nav'}
                navigator={this.props.navigator} />
      </View>
      <ScrollView styles={[styles.scroll, {height: windowSize.width}]}
                  contentContainerStyle={styles.content} >
        <Image source={{uri: this.state.player.prof_pic}}
               style={styles.pic} />

       <SimpleRow
         title={'Name'}
         value={this.state.player.name}/>

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
          value={_ctools.shortString(this.state.player.teams)}/>

        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Recent Matches"} value={this.state.player.matches.length} />

        <View style={styles.matches}>
          <MatchList
            navigator={this.props.navigator}
          />
        </View>

        <View style={_cstyles.section_divider_line} ></View>
        <View style={{height: 50 * _cvals.dscale, width: windowSize.width}}>
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
    console.log("DATA SUCCESSFULLY FETCHED")
    console.log(data);
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
    /* Player._CreateNewPlayer(Player.newDefault_player) */

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
  contentContainerStyle: {
    flex: 1,
  },
  matches: {
    height: 200 * _cvals.dscale
  }
})


module.exports = ProfilePage;
