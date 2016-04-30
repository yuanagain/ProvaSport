'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
import * as _clogic from '../libs/customlogic.js'

var Header = require('../parts/header')
var TextField = require('../smallparts/textfield')


import * as Player from '../modules/player'
import * as User from '../modules/userdata'
import * as _settings from '../modules/settings'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} = React;

var PasswordChangePage = React.createClass({

  getInitialState: function() {
    
    return (
      {
        new_password: "",
        old_password: "",
        passwordConf: "",

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

    var settings = _settings.getSettings()
    return (
    
    <View style={styles.container}>
      <View>
        <Header title={"Change Password"}
                mode={'nav'}
                navigator={this.props.navigator} />
        <ScrollView style={_cstyles.body_container}>

          <TextField
              label="Old Password "
              placeholder="old password"
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(old_password) => this.setState({old_password})}
            />
         
          
          <TextField
              label="New Password "
              placeholder="new password"
              secureTextEntry={true}
              keyboardType='default'
              onChangeText={(new_password) => this.setState({new_password})}
            />

          <TextField
            label="Confirm Password "
            placeholder="new password"
            secureTextEntry={true}
            keyboardType='default'
            onChangeText={(passwordConf) => this.setState({passwordConf})}
          />

          
        </ScrollView>

      </View>

      <View style={_cstyles.buttons_container}>
        <WideButton
          text="Change Password"
          onPress={this.change_password}
          />
      </View>
    </View>
    );
  },

  componentDidMount: function() {
    
  },

  validEmail() {
    var re = /\S+@\S+\.\S+/;
    return re.test(this.state.email)
  },

  validPasswordLength() {
    return (this.state.new_password.length >= 8)
  },

  validPasswordConf() {
    return (this.state.new_password == this.state.passwordConf)
  },

  change_password: function() {
    // Change password
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
  screen: {
    height: windowSize.height,
    flex: 1,
  },
  image_container: {
    height: 200 * _cvals.dscale,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    borderRadius: 60 * _cvals.dscale,
    width: 120 * _cvals.dscale,
    height: 120 * _cvals.dscale,
  },
  date_picker_container: {
    alignItems: 'center',
    flex: 1,
  },
  input_container: {
    height: windowSize.height
  },
  input: {
    height: 40 * _cvals.dscale,
    fontSize: _cvals.standard_text,
    padding: (Platform.OS === 'ios') ? 10 * _cvals.dscale : 0
  },
  input_row: {
    paddingTop: 5 * _cvals.dscale,
  },
  selector: {
    paddingBottom: 5 * _cvals.dscale,
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFront: {
    color: "#000"
  },
})

module.exports = PasswordChangePage;
