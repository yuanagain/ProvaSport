'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var ProfileScreen = require('../screens/profile');

var Button_Native = require('react-native-button');
var windowSize = Dimensions.get('window');

var HomeScreen = require('../screens/homescreen');
var RecordScreen = require('../screens/recordscreen');
var Navigator = require('Navigator');


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

import { Button, Card } from 'react-native-material-design';

//import { StyleSheet } from 'react-native';
import { typography } from 'react-native-material-design-styles';
const typographyStyle = React.StyleSheet.create(typography);

const ColoredRaisedButton = MKButton.coloredButton()
  .withText('BUTTON')
  .withOnPress(() => {
    console.log("Hi, it's a colored button!");
  })
  .build();


var Login = React.createClass({
  getInitialState: function() {
    return {
      username: 'Home User',
      password: 'PASSWORD',
      logged_in: false,
      show_screen: "loginscreen"
    }
  },
  render: function() {
    if (this.state.show_screen == "profilescreen") {
      return (
        <ProfileScreen />
      );
    }
    else if (this.state.show_screen == "homescreen") {
      return (
        <HomeScreen />
      );
    }
    else if (this.state.show_screen == "recordscreen") {
      return (
        <RecordScreen />
      );
    }
    else if (this.state.show_screen == "loginscreen") {
      return (
        <View style={styles.container}>
          <View style={styles.inputs_container}>
            <View style={styles.input_container}>
              <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Email"
              placeholderTextColor="#000"
              value={this.state.username}
              onChangeText={(username) => this.setState({username})}
              />
            </View>
            <View style={styles.input_container}>
              <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Password"
              placeholderTextColor="#000"
              value={this.state.password}
              onChangeText={(text) => this.setState({text})}
              />
            </View>
          </View>
          <View style={styles.buttons_container}>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._handlePress_toHome}>
              Home Screen
            </Button_Native>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._handlePress_toRecord}>
              RecordScreen
            </Button_Native>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._handlePress_toProfile}>
              Profile Screen
            </Button_Native>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._handlePress_toNav}>
              NAV
            </Button_Native>
            <ColoredRaisedButton/>
          </View>
        </View>
      );
    }
    else { return <RecordScreen />
    }
  },
  _handlePress_toNav(event) {
    this.setState({show_screen: "nav"})
  },
  _handlePress_toHome(event) {
    this.setState({show_screen: "homescreen"})
  },
  _handlePress_toProfile(event) {
    this.setState({show_screen: "profilescreen"})
  },
  _handlePress_toRecord(event) {
    this.setState({show_screen: "recordscreen"})
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 10
  },
  input: {
    left: 0,
    right: 0,
    height: 40,
    padding: 10,
    margin: 10,
    fontSize: 25
  },
  whiteFont: {
    color: "#FFF"
  },
  blackFront: {
    color: "#000"
  },
  input_container: {
    backgroundColor: "#3399ff",
    margin: 0,
    padding: 20,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs_container: {
    justifyContent: 'center',
    marginTop: 40
  },
  buttons_container: {
    height: 80,
    marginTop: 10,
    backgroundColor: "#6699ff"
  }
})

module.exports = Login;
