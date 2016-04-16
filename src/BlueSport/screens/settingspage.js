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
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
})

module.exports = SettingsPage;
