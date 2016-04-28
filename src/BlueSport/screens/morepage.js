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
var SimpleRow = require('../smallparts/simplerow')
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

var MorePage = React.createClass({

  getInitialState: function() {
    
    return (
      {
        selectedTeam1: [],
        selectedTeam2: [],
        selection: [],
        sport: [],
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
        <Header title={"More"}
                navigator={this.props.navigator} />
        <View style={_cstyles.body_container}>

          <View style={_cstyles.section_divider_line}></View>

        </View>

        <SimpleRow
          title={'Messages'}
          value={'View'}
          onPress={this.toMessenger} />
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Settings'}
          value={'Edit'}
          onPress={this.toSettings} />
        <View style={_cstyles.section_divider_line}></View>

      </View>

      <View style={_cstyles.buttons_container}>
      </View>
    </View>
    );
  },

  toSettings: function() {
    var SettingsPage = require('../screens/settingspage')
    this.props.navigator.push({
      id: "SettingsPage",
      component: SettingsPage,
      passProps: {
        navigator: this.props.navigator,
      }
    })
  },

  toMessenger: function() {
    var MessagePage = require('../messenger/MessagePage')
    this.props.navigator.push({
      id: "MessengerPage",
      component: MessagePage,
      passProps: {
        navigator: this.props.navigator,
        userid: 0
      }
    })
  },

  setSport: function(selection) {
    this.setState({sport: selection})
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
})

module.exports = MorePage;
