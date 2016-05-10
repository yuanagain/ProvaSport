'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

// var ScoreRowRecord = require('./scorerowrecord')

// var PopoverSelect = require('./popoverselect')
var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PopoverSelector = require('../bigparts/popoverselector')
var Header = require('../parts/header')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')
var TextField = require('../smallparts/textfield')
var PlayersRow = require('../parts/playersrow')

import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as _settings from '../modules/settings'

var {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  ListView,
  Platform,
} = React;

var reset_form = {
        name: "",
        location: "",
        sport: [],
        players: []
      }

var all_teams = ["Item 1", "Item 2"];

var TeamCreationPage = React.createClass({

  getInitialState: function() {
    return ( {
      all_teams: [],
      players: [],
    });
  },

  getDefaultProps: function() {
    return ({

    })
  },

  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;
    //console.log(this.props.match);
    var settings = _settings.config

    var playersrow = <View/>

    if (this.state.players.length > 0) {
      playersrow = <PlayersRow  players={this.state.players}
                                navigator={this.props.navigator}/>
    }

    return (
    <View style={styles.container}>
      <View style={_cstyles.content}>
        <Header title={"CREATE TEAM"}
                  mode={this.props.mode}
                  navigator={this.props.navigator} />
          <ScrollView>
          <View style={_cstyles.body_container}>

            <TextField
              value={this.state.name}
              label="Team Name"
              placeholder="Required"
              keyboardType='default'
              onChangeText={(name) => this.setState({name})}
            />
            <TextField
              value={this.state.location}
              label="Location"
              placeholder="Optional"
              keyboardType='default'
              onChangeText={(location) => this.setState({location})}
            />

            <PopoverSelector
              title={'Sport'}
              items={settings.sports}
              navigator={this.props.navigator}
              selection={this.state.sport}
              harvest={this.setSport}
              mode={'single'}
            />

            <View style={_cstyles.section_divider_line}/>

            <PopoverSelector
                title={'Select Players'}
                magic={'player'}
                items={this.state.all_teams}
                navigator={this.props.navigator}
                selection={this.state.players}
                harvest={this.setPlayers}
              />

            {playersrow}

            <View style={_cstyles.section_divider_line}/>

          </View>
          </ScrollView>
      </View>
      <View style={_cstyles.buttons_container}>
        <WideButton
          text={"Create Team"}
          onPress={()=>this.submit()}
          />
      </View>

    </View>
    );
  },

  componentDidMount(){
    AsyncStorage.getItem('player', (err, player)=>{
      player = JSON.parse(player);
      var all_teams = player.following.concat(player.playerid);
      this.setState({all_teams: all_teams});
    })
  },
  //data MUST be populated
  setPlayers: function(players) {
    this.setState({players: players})
  },

  fetchTeam: function(data, index) {
    this.state.teams[index] = data.players
    this.setState({teams : this.state.teams})
    this.setState({loaded : true})
  },

  componentWillReceiveProps(nextProps){
    // for incase we pop off navigator and don't refresh
    AsyncStorage.getItem('user', (err, user)=>{
      user = JSON.parse(user);
      AsyncStorage.getItem('player', (err, player)=>{
        player = JSON.parse(player);
        var all_teams = player.following.concat(user.playerid);
        this.setState({all_teams: all_teams});
      })
    })
  },

  setName: function(name) {
    this.setState({name})
  },

  setLocation: function(location) {
    this.setState({location})
  },

  reset: function() {
    this.setState(reset_form)
  },

  submit: function() {
    this.reset()
  },

  renderRow: function(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  setSport: function(sport) {
    this.setState({sport: sport})
  },

  reloadPlayer: function(){
    AsyncStorage.getItem('user',(err,resp)=>{
      resp = JSON.parse(resp);
      Player._GetPlayer(resp.playerid, function(playerobj) {
        AsyncStorage.setItem('player', JSON.stringify(playerobj),(err,resp)=>{
          console.log(resp);
        })
      })
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
  scores_scroll: {
    height: (Platform === 'ios') ? 130 * _cvals.dscale : 75 * _cvals.dscale,
  }
})

module.exports = TeamCreationPage;
