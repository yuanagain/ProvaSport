'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var Button_Native = require('react-native-button');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

var RecordScreen = React.createClass({
  getInitialState: function() {
    return {
      username: "Record"
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
        </View>

        <View style={styles.content_container}>
          <View style={styles.header_container}>
            <Text style={styles.nameText}>
              {this.state.username}
            </Text>
            <Button_Native
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._handlePress_toHome}>
              Home Screen
            </Button_Native>
          </View>
          <View style={styles.gamedata_container}>
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
        </View>
      </View>
    );
  },
  _handlePress_toHome(event) {
    this.setState({show_screen: "homescreen"})
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
    marginTop: 20,
    backgroundColor: 'red',
    flexDirection: 'row',
    height: windowSize.width / 2,
  },
  prof_pic_image: {
    width: windowSize.width / 2,
    height: windowSize.width / 2,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

module.exports = RecordScreen;
