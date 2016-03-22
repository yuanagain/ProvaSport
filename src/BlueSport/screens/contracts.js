'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var ProfScreen = require('./profile')
var MatchScreen = require('./match')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} = React;

var ContractsScreen = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>
            Match 1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Text>
            Match 2
          </Text>
        </TouchableOpacity>
      </View>
    );
  },

  onButtonPress() {
    this.props.navigator.push({
      id: "MatchScreen",
      component: MatchScreen,
      passProps: {
        matchnum: "matchnum",
      }
    });
  },



});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0
  },
  prof_pic_container: {
    marginTop: 50
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

module.exports = ContractsScreen;