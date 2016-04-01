'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

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
  Modal,
} = React;

var dummyselections = [
  {'name': '1', 'descr': 'Description 1'},
  {'name': '2', 'descr': 'Description 2'},
  {'name': '3', 'descr': 'Description 3'},
  {'name': '4', 'descr': 'Description 4'},
  {'name': '5', 'descr': 'Description 5'},
  {'name': '6', 'descr': 'Description 6'},
  {'name': '7', 'descr': 'Description 7'},
  {'name': '8', 'descr': 'Description 8'},
  {'name': '9', 'descr': 'Description 9'},
]


var items = ["Item 1", "Item 2"];

var ContractsPage = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => this.rowChanged(r1, r2)})
    return (
      {
        item: "Select Item",
        isVisible: false,
        username: '',
        password: '',
        scoreData: [(21, 5), (10, 21), (21, 12)],
        dataSource: ds.cloneWithRows([[21, 5], [10, 21], [21, 12]]),
        selectedSport: ["Tennis"],
        selectedContract: "None Selected",
        selectedTeam1: [],
        selectedTeam2: [],
        selection: [],

        SomeData: [{'key': 1, 'scores': [21,  2]},
                   {'key': 2, 'scores': [11, 21]},
                   {'key': 3, 'scores': [12, 21]},
                   {'key': 4, 'scores': [11, 14]}]
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <Header title={"CREATE"}
                navigator={this.props.navigator} />


        <PopoverSelector
          title={'Event Type'}
          items={['Single Match', 'Elimination ', 'Round Robin']}
          navigator={this.props.navigator}
          selection={[]}
          mode={'single'}
        />
        <View style={_cstyles.section_divider_line}>
        </View>

        <PopoverSelector
          title={'Sport'}
          items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
          navigator={this.props.navigator}
          selection={this.state.selectedSport}
          harvestSelection={this.setSport}
          maxSelect={1}
          mode={'single'}
        />
        <View style={_cstyles.section_divider_line}>
        </View>

        <PopoverSelector
          title={'Team 1'}
          items={['Player 1', 'Player 2', 'Player 3']}
          navigator={this.props.navigator}
          selection={[]}
        />
        <View style={_cstyles.section_divider_line}>
        </View>

        <PopoverSelector
          title={'Team 2'}
          items={['Player 4', 'Player 5', 'Player 6']}
          navigator={this.props.navigator}
          selection={[]}
        />
        <View style={_cstyles.section_divider_line}>
        </View>

      </View>

      <View style={_cstyles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.toTeamPage}
          >
          {'View Team Page'}
        </Button>
        <View style={{height: 1}}></View>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.toRR}
          >
          {'View RR Page'}
        </Button>
        <View style={{height: 1}}></View>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.toBracket}
          >
          {'View Bracket Page'}
        </Button>
        <View style={{height: 1}}></View>

        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}

          >
          {'Create'}
        </Button>
      </View>
    </View>
    );
  },

  setSport: function(selection) {
    this.setState({selectedSport: selection})
    console.log("SELECTED SPORT: " + String(this.state.selectedSport))
    this.forceUpdate()
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
      id: "RoundRobinPage",
      component: RoundRobinPage,
      passProps: {
        navigator: this.props.navigator
      }
    })
  },
  toBracket() {
    this.props.navigator.push({
      id: "BracketPage",
      component: BracketPage,
      passProps: {
        navigator: this.props.navigator
      }
    })
  },
  toTeamPage() {
    this.props.navigator.push({
      id: "TeamPage",
      component: TeamPage,
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
