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

// testing
var RoundRobinPage = require('../screens/roundrobinpage')


var items = ["Item 1", "Item 2"];

var SettingsPage = React.createClass({

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
        selectedSport: "None Selected",
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
        <View style={_cstyles.header_container}>
          <Text style={_cstyles.title_text}>
            {"SETTINGS"}
          </Text>
        </View>

        <PopoverSelector
          title={'Sports'}
          items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
          navigator={this.props.navigator}
          selection={[0]}
        />
        <View style={_cstyles.section_divider_line}>
        </View>

        <RoundRobinPage />


      </View>
      <View style={_cstyles.buttons_container}>
        <Button
          style={_cstyles.wide_button}
          styleDisabled={{color: 'grey'}}
          onPress={this.props.loginFunction}
          >
          {'Save Changes'}
        </Button>
      </View>
    </View>
    );
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

module.exports = SettingsPage;
