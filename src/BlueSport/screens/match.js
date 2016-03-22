'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var ProfScreen = require('./profile')
var Navigator = require('Navigator');

import TabNavigator from 'react-native-tab-navigator';

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} = React;

var MatchScreen = React.createClass({
  getInitialState: function() {
    return {
      
    }
  },


  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <TouchableOpacity onPress={this.onBackPress}>
          <Text>
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>
            Player 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>
            Player 2
          </Text>
        </TouchableOpacity> 
      </View>
    );
  },

  onButtonPress() {
    this.props.navigator.push({
      component: ProfScreen,
      passProps: {
        user: "player 1",
        isModal: true,
      }
    });
  },

  onBackPress() {
    this.props.navigator.pop({
    });
  },

});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0
  },
  prof_pic_container: {
    marginTop: 20
  },
  prof_pic_image: {
    flex: 1,
    width: windowSize.width,
    height: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

module.exports = MatchScreen;
