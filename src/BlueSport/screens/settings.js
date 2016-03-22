'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button_Native = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var SettingsScreen = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <View style={styles.content_container}>
            <Text style={styles.nameText}>
            Settings
            </Text>
          </View>
        </View>
      </View>
    );
  }
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
    height: windowSize.width,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

module.exports = SettingsScreen;