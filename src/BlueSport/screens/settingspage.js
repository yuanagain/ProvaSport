'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
import * as _clogic from '../libs/customlogic.js'
var PopoverSelector = require('../bigparts/popoverselector')

var Header = require('../parts/header')


var Bracket = require('../bigparts/bracket')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal,
} = React;

var t1 = {
  teams: [1, 2, 3],
  matches: [1, 2, 3],
}

var t2 = {
  teams: [1, 2, 3, 4, 5, 6, 7, 8],
  matches: [1, 2, 3, 4, 5, 6, 7],
}

var SettingsPage = React.createClass({

  getInitialState: function() {
    
    return (
      {
        selectedTeam1: [],
        selectedTeam2: [],
        selection: [],
      }
    );
  },
  render: function() {
    var {
      name,
      loginFunction,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>
      <View>
        <Header title={"SETTINGS"}
                navigator={this.props.navigator} />
        <View style={_cstyles.body_container}>
          <PopoverSelector
            title={'Sports'}
            items={['Tennis', 'Badminton', 'Squash', 'Basketball', 'Soccer']}
            navigator={this.props.navigator}
            selection={['Tennis']}
            
          />
          <View style={_cstyles.section_divider_line}></View>

        </View>
      </View>
      <View style={_cstyles.buttons_container}>
        <WideButton
          text="Save Changes"
          onPress={this.props.loginFunction}
          />
      </View>
    </View>
    );
  },

  componentDidMount: function() {
    console.log(_clogic.RRMatrix(t1))
    console.log(_clogic.bracketMatrix(t2))
    console.log(_clogic.createTrace(4))
  }


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
