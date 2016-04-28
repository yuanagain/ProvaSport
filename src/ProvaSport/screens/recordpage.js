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
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Platform,
} = React;

var blank_form = {
        isVisible: false,
        name: "",
        location: "",
        contract: ["Default"],
        sport: [],
        teams: [[],[],],
        scores: [],
      }

var reset_form = {
        name: "",
        location: "",
        contract: ["Default"],
        sport: [],
        teams: [[],[],],
        scores: [],
      }

var items = ["Item 1", "Item 2"];

var RecordPage = React.createClass({

  getInitialState: function() {
    this.teamids = [-1, -1]
    return (
      this.props.form
    );
  },

  getDefaultProps: function() {
    return ({
      mode: '',
      form: blank_form,
      match: {
              name: "",
              location: "",
              contract: ["Default"],
              sport: [],
              teams: [[],[],],
              scores: [],
            },
    matchid: -1,
    teams: [[],[],]
    })
  },

  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;
    //console.log(this.props.match);
    return (
    <View style={styles.container}>
      <View style={{height: 565 * _cvals.vscale}}>
        <Header title={"RECORD"}
                  mode={this.props.mode}
                  navigator={this.props.navigator} />
          <ScrollView>
          <View style={_cstyles.body_container}>
            <TextField
              value={this.state.name}
              label="Match Name"
              placeholder="Optional"
              keyboardType='default'
              onChangeText={(name) => this.setName(name)}
            />

            <TextField
              value={this.state.location}
              label="Location"
              placeholder="Optional"
              keyboardType='default'
              onChangeText={(location) => this.setLocation(location)}
            />

            <PopoverSelector
              title={'Contract'}
              items={['Default']}
              navigator={this.props.navigator}
              selection={this.state.contract}
              mode={'single'}
              harvest={this.setContract}
            />
            <View style={_cstyles.section_divider_line}>
            </View>

            <PopoverSelector
              title={'Sport'}
              items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
              navigator={this.props.navigator}
              selection={this.state.sport}
              harvest={this.setSport}
              mode={'single'}
            />
            <View style={_cstyles.section_divider_line}>
            </View>

            <PopoverSelector
              title={'Team 1'}
              magic={'player'}
              items={[0, 1]}
              navigator={this.props.navigator}
              selection={this.state.teams[0]}
              harvest={this.setTeams}
              harvestArgs={0}
            />
            <View style={_cstyles.section_divider_line}>
            </View>

            <PopoverSelector
              title={'Team 2'}
              magic={'player'}
              items={[0, 1]}
              navigator={this.props.navigator}
              selection={this.state.teams[1]}
              harvest={this.setTeams}
              harvestArgs={1}
            />
            <View style={_cstyles.section_divider_line}>
            </View>

            <SimpleRow
              title={'Scores '}
              value={''}/>


            <DynamicList
              items={this.props.match.scores}
              magic={'scores'}
              harvest={this.setScores}
              />
          </View>
          </ScrollView>
      </View>
      <View style={_cstyles.buttons_container}>
        <WideButton
          text="Record Activity"
          onPress={()=>this.logout()}
          />
      </View>

    </View>
    );
  },

  logout: function() {
    this.props.logout()
  },


  setName: function(name) {
    if (true) {
      this.setState({name})
    }
  },

  setLocation: function(location) {
    if (true) {
      this.setState({location})
    }
  },

  reset: function() {
    this.setState(reset_form)
    this.setState({teams: [[],[],]})
    this.setState({scores: []})
  },

  // attempt to create ad hoc teams
  // TODO: recall teams
  createTeams: function() {
    console.log(this.state.teams[1])
    var team1 = {
      "name": "Team",
      "players": this.state.teams[0],
      "matches": [],
      "thumbnail": "https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.png"
    }
    var team2 = {
      "name": "Team",
      "players": this.state.teams[1],
      "matches": [],
      "thumbnail": "https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.png"
    }
     Team._CreateTeam(team1, this.harvestTeam1)/*.then(resp=>this.state.teams[0] = resp) */
    //Team._CreateTeam(team2, this.harvestTeam2)//.then(resp=>this.state.teams[1] = resp).then(this.submitMatch())
  },

  harvestTeam1: function(team) {
    var team2 = {
      "name": "Team",
      "players": this.state.teams[1],
      "matches": [],
      "thumbnail": "https://image.freepik.com/free-icon/multiple-users-silhouette_318-49546.png"
    }
    //console.log("checkpoint 1")
    this.state.teams[0] = team;
    Team._CreateTeam(team2, this.harvestTeam2)
  },

  harvestTeam2: function(team) {
    this.state.teams[1] = team;
    console.log(Team.addMatch)
    this.submitMatch()
  },

  // get submission in action
  submit: function() {
    if (this.props.matchid == -1){
      this.createTeams()
    }
    else {
      this.props.match.status[0] = 3;
      Match.setMatch(this.props.matchid, this.props.match).then(this.props.navigator.pop())
      //Match.updateStatus(this.props.matchid, 3)
    }
  },

  // run once both teams have been created
  // TODO: add match to teams' and players' match lists
  submitMatch: function() {
    var match = {
      name: this.state.name,
      location: this.state.location,
      contract: this.state.contract,
      sport: this.state.sport,
      teams: [this.state.teams[0], this.state.teams[1]],
      status: 0,
      payoutdata: {
        xp : 100,
        cash: 100,
      },
    }
    console.log(match)
    Match._CreateMatch(match, this.confirmSubmit)
  },

  confirmSubmit: function(match) {
    //Player.addMatch(this.state.teams[0][0], match);
    console.log(match)
    this.reset()
  },

  renderRow: function(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  setTeams: function(team, index) {
    this.state.teams[index] = team
    this.setState({teams: this.state.teams})
  },

  setScores: function(scores) {
    this.setState({scores: scores})
  },

  setSport: function(sport) {
    this.setState({sport: sport})
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

module.exports = RecordPage;
