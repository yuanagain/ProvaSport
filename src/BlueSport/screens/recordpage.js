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

var RecordPage = React.createClass({

  getInitialState: function() {
  
    return (
      {
        isVisible: false,
        selectedSport: ["None Selected"],
        selectedContract: ["None Selected"],
        selectedTeam1: [],
        selectedTeam2: [],
        contract: ['Default'],
        scores: [[1,2], [3,5], [5,6]],
        teams: [[],[],]
      },
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
        <Header title={"RECORD"}
                navigator={this.props.navigator} />

        <View style={_cstyles.body_container}>
          <PopoverSelector
            title={'Contract'}
            items={['Default']}
            navigator={this.props.navigator}
            selection={this.state.contract}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <PopoverSelector
            title={'Sport'}
            items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
            navigator={this.props.navigator}
            selection={['Tennis']}
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
            harvestSelection={this.setTeams}
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
            harvestSelection={this.setTeams}
            harvestArgs={1}
          />
          <View style={_cstyles.section_divider_line}>
          </View>

          <DynamicList
            items={this.state.scores}
            magic={'scores'}
            harvest={this.setScores}
            />
        </View>
      </View>
        <View style={_cstyles.buttons_container}>
          <WideButton
            text="Record"
            onPress={this.props.loginFunction}
            />
        </View>

    </View>
    );
  },

  renderRow(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  setTeams: function(team, index) {
    this.state.teams[index] = team
    this.setState({teams: this.state.teams})
    console.log(index)
    console.log(this.state.teams)
  },

  setScores: function(scores) {
    this.setState({scores: scores})
    console.log(scores)
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
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0,
    backgroundColor: 'transparent',
  },
  score_values: {
    flexDirection: 'row'
  },
  game_title: {
    width: 120
  }
})

module.exports = RecordPage;
