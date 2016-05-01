'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton')

// var ScoreRowRecord = require('./scorerowrecord')

// var PopoverSelect = require('./popoverselect')
var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PopoverSelector = require('../bigparts/popoverselector')

var RoundRobinPage = require('../screens/roundrobinpage')
var BracketPage = require('../screens/bracketpage')
var TeamPage = require('../screens/teampage')

var Header = require('../parts/header')

var TeamListingPage = require('../screens/teamlistingpage')
var TextField = require('../smallparts/textfield')

import * as Match from '../modules/match'
import * as Team from '../modules/team'
import * as Tournament from '../modules/tournament'
import * as _ctools from '../libs/customtools.js'
import * as _clogic from '../libs/customlogic.js'
import * as _settings from '../modules/settings'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  ScrollView,
  Modal,
  Platform,
} = React;


var ContractsPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => this.rowChanged(r1, r2)})
    return (
      {
        tournament: Tournament.default_tournament,
        selectedSport: ["Tennis"],
        selection: [],
        event_type: [],
        teams: [[],[],],
        num_teams: [2],
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;

    var settings = _settings.getSettings()

    var teamCts = settings.teamCts_elim

    if (this.state.event_type.length > 0) {
      if (this.state.event_type[0] == 'Round Robin') {
        teamCts = settings.teamCts_rr
      }
    }

    var teamselectors = []

    for (var i = 0; i < this.state.teams.length; i++) {
      teamselectors.push(
        <View key={i}>
          <PopoverSelector
            title={'Team ' + String(i + 1)}
            magic={'player'}
            items={[0, 1]}
            navigator={this.props.navigator}
            selection={this.state.teams[i]}
            harvest={this.setTeam}
            harvestArgs={i}
            key={i}
          />
          <View style={_cstyles.section_divider_line}></View>
        </View>
        )
    }

    return (
    <View style={styles.container}>
      <View>
        <Header title={"CREATE"}
                navigator={this.props.navigator} />

        <View style={_cstyles.body_container}>
          <TextField
            label="Event Name"
            placeholder="Event Name"
            keyboardType='default'
            onChangeText={(name) => this.setState({name})}
          />

          <TextField
            label="Location"
            placeholder="Optional"
            keyboardType='default'
            onChangeText={(location) => this.setState({location})}
          />

          <PopoverSelector
            title={'Event Type'}
            items={settings.eventTypes}
            navigator={this.props.navigator}
            selection={this.state.event_type}
            harvest={this.setEventType}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Sport '}
            items={settings.sports}
            navigator={this.props.navigator}
            selection={this.state.selectedSport}
            harvest={this.setSport}
            maxSelect={1}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Team Count'}
            items={teamCts}
            navigator={this.props.navigator}
            selection={this.state.num_teams}
            harvest={this.setNumTeams}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>
          <View>
            <ScrollView style={styles.team_scroll}>
              {teamselectors}
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={_cstyles.buttons_container}>

        <WideButton
          text="Create Tournament"
          onPress={()=>this.start()}
        />
      </View>
    </View>
    );
  },
  start: function(){
    var teamss = []
    var numTeams = this.state.teams.length;
    this.state.teams.forEach(function(team_i){
      var team = JSON.parse(JSON.stringify(Team.default_team));
      team.players = team_i;
      teamss.push(team)
    });
    Team.createFromList(teamss).then(teamids=>this.create(teamids)).catch(function(err){console.log(err)})
  },
  create: function(teamids) {
    var tournament = JSON.parse(JSON.stringify(Tournament.default_tournament));
    //build the tournament object
    tournament.teams = teamids;
    tournament.type = this.state.event_type[0];
    tournament.sport = this.state.selectedSport[0];
    tournament.name = this.state.name;
    tournament.location = this.state.location;


    if (this.state.event_type[0] == 'Round Robin') {
      console.log("CREATE RR!")
      this.createRR(tournament)
    }
    if (this.state.event_type[0] == 'Elimination') {
      this.createBracket(tournament)
    }
  },

  setTeam: function(players, index) {
    this.state.teams[index] = players
    this.setState({teams: this.state.teams})
  },

  setEventType: function(event_type) {
    this.setState({event_type: event_type})

    if (this.state.event_type[0] == 'Round Robin') {
      var settings = _settings.getSettings()
      var maxTeams = Math.max.apply(Math, settings.teamCts_rr)

      if (this.state.num_teams[0] > maxTeams) {
        this.setNumTeams([maxTeams])
      }
    }
  },

  setNumTeams: function(num) {
    // fill with empty teams
    for (var i = this.state.num_teams; i < num; i++) {
      this.state.teams.push([])
    }

    this.setState({num_teams: num})

    // trim off extra teams
    this.setState({teams: this.state.teams.slice(0, num[0])})

  },

  setSport: function(selection) {
    this.setState({selectedSport: selection})
  },

  goBack: function() {
    this.props.navigator.pop()
  },

  gotoPopoverSelect: function(items) {
    this.props.navigator.push({
      id: "PopoverSelect",
      component: PopoverSelect,
      passProps: {
        title: 'select stuff',
        goBack: this.goBack,
        confirmSelection: this.confirmSelection,
        items: items,
        selection: this.state.selection,
      }
    })
  },
/*
DeleteGame:
function -
input -
output -
*/
  deleteGame: function(index) {

    // reorder states
    for (var i = 0; i < this.state.SomeData.length; i++) {

      if (this.state.SomeData[i]['key'] == index) {

        this.state.SomeData.splice(i, 1)
        var SomeData = this.state.SomeData

        this.setState({SomeData: SomeData})

        return;
      }
    }
  },
  createRR: function(obj) {
    var defaults = Match.default_match;
    Tournament.createTournament(obj).then(resp=>this.createRR2(resp, obj, defaults))
  },
  createRR2: function(id, obj, defaults) {
    console.log("CreateRR2:  "+id+ "   ")
      var data = {
        teams: obj.teams,
        defaultM: defaults,
        id: id
      };
      //console.log(obj.teams)
      _clogic.createRR(data).then(reply=>{obj.matches=reply}).then(()=>Tournament.setTournament(id, obj)).then(()=>this.toRR(id)).catch(function(err){console.log(err)})
  },
  createBracket: function(obj, defaults) {
    var defaults = Match.default_match;
    Tournament.createTournament(obj).then(resp=>this.createBracket2(resp, obj, defaults))
  },
  createBracket2: function(id, obj, defaults) {
      var data = {
        teams: obj.teams,
        defaultM: defaults,
        id: id
      }
      _clogic.createBracket(data).then(reply=>{obj.matches=reply}).then(()=>Tournament.setTournament(id, obj)).then(r=>this.toBracket(id)).catch(function(err){console.log(err)})
  },

  /*
  AddGame:
  what do we need?

  function -
  input -
  output -
  */
  addGame: function(scores) {

  },

  onSelect: function(name) {
    this.props.navigator.push({
      id: "Select",
      component: PopoverSelect,
      passProps: {
        name: name,
        imageLink: 'http://facebook.github.io/react/img/logo_og.png',
        descr: "Description Text",
        goBack: this.goBack,

      }
    })
  },

  confirmSelection(selected) {
    this.selected_1 = selected
    this.goBack();
  },

  renderRow(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  updateGames: function() {
    //update match
  },

  //// TODO POPULATE W/ REAL DATA
  toRR(tid) {
    this.props.navigator.push({
      id: "RoundRobinPage3",
      component: RoundRobinPage,
      passProps: {
        tournamentid: tid,
        navigator: this.props.navigator
      }
    })
  },
  toBracket(tid) {
    this.props.navigator.push({
      id: "BracketPage3",
      component: BracketPage,
      passProps: {
        tournamentid: tid,
        navigator: this.props.navigator
      }
    })
  },
  toTeamPage() {
    this.props.navigator.push({
      id: "TeamPage3",
      component: TeamPage,
      passProps: {
        navigator: this.props.navigator
      }
    })
  },

  toTeamListingPage() {
    this.props.navigator.push({
      id: "TeamListingPage1",
      component: TeamListingPage,
      passProps: {
        navigator: this.props.navigator
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
  team_scroll: {
    height: (Platform === 'ios') ? 200 * _cvals.dscale : windowSize.height / 4.4,
    width: windowSize.width,
  }
})

module.exports = ContractsPage;
