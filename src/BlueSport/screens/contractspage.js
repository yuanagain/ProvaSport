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

import * as _ctools from '../libs/customtools.js'



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
} = React;


var ContractsPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => this.rowChanged(r1, r2)})
    return (
      {
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


    var teamselectors = []
    for (var i = 0; i < this.state.num_teams; i++) {
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
            items={['Single Match', 'Elimination ', 'Round Robin']}
            navigator={this.props.navigator}
            selection={this.state.event_type}
            harvest={this.setEventType}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Sport '}
            items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
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
            items={[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}
            navigator={this.props.navigator}
            selection={this.state.num_teams}
            harvest={this.setNumTeams}
            mode={'single'}
          />
          <View style={_cstyles.section_divider_line}>
          </View>
          <View>
            <ScrollView style={{height: 200 * _cvals.dscale,
                                width: windowSize.with}}>
              {teamselectors}
            </ScrollView>
          </View>
        </View>
      </View>

      <View style={_cstyles.buttons_container}>

        <WideButton
          text="Create Tournament"
          onPress={()=>this.create()}
        />
      </View>
    </View>
    );
  },

  create: function() {
    if (this.state.event_type[0] == 'Round Robin') {
      this.toRR()
    }
    if (this.state.event_type[0] == 'Elimination ') {
      this.toBracket()
    }
  },

  setTeam: function(players, index) {
    this.state.teams[index] = players
    this.setState({teams: this.state.teams})
  },

  setEventType: function(event_type) {
    this.setState({event_type: event_type})
  },

  setNumTeams: function(num) {
    this.setState({num_teams: num})
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
    this.goBack()
  },

  renderRow(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  updateGames: function() {

  },

  //// TODO POPULATE W/ REAL DATA
  toRR() {
    this.props.navigator.push({
      id: "RoundRobinPage3",
      component: RoundRobinPage,
      passProps: {
        navigator: this.props.navigator
      }
    })
  },
  toBracket() {
    this.props.navigator.push({
      id: "BracketPage3",
      component: BracketPage,
      passProps: {
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
  title_text: {
    color: 'white',
    fontSize: 30,
    fontFamily: _cvals.mainfont,
    padding: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: _cvals.skblue,
    height: 120
  },
  inputs_container: {
    width: windowSize.width,
    //height: windowSize.height * 2 / 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7bafea',
    opacity: 1.0,
  },
  buttons_container: {
    flexDirection: 'column',
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 1,
    backgroundColor: 'transparent',
  },
  score_values: {
    flexDirection: 'row'
  },
  game_title: {
    width: 120
  }
})

module.exports = ContractsPage;
