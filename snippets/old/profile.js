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
  Image,
  TouchableOpacity,
} = React;

var Profile = React.createClass({
  
  getInitialState: function() {
    return {
      user: "Sample Username"
    }
  },

  render: function() {
    if (!this.props.isModal) {
      return (
        <View style={styles.container}>
          <View style={styles.prof_pic_container}>
            <Image style={styles.prof_pic_image}
            source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
            />
          </View>
          <Text style={styles.nameText}>
            {this.props.user}
            Placeholder
          </Text>
        </View>
      );
    }
    else {
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
          <Text style={styles.nameText}>
            {this.props.user}
            Placeholder
          </Text>
        </View>
      );



    }
  },

  onBackPress() {
    this.props.navigator.pop({
    });
  },

  /*
  getInitialState: function() {
    return {
      username: "Sample Username"
    }
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.prof_pic_container}>
          <Image style={styles.prof_pic_image}
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          />
          <View style={styles.content_container}>
            <View style={styles.header_container}>
              <Text style={styles.nameText}>
                {this.state.username}
              </Text>
              <GameData />
              <Button_Native
                style={{borderWidth: 1, borderColor: 'blue'}}
                onPress={this._handlePress_toHome}>
                Home Screen
              </Button_Native>
            </View>
          </View>
        </View>
      </View>
    );
  },
  _handlePress_toHome(event) {
    this.props.setState({show_screen: "homescreen"})
  },
});

var GameData = React.createClass({
  getInitialState: function() {
    return {
      n_games: 1
    }
  },
  render: function() {
  return (
      <View style={styles.body_container}>
        <Text style={styles.nameText}>
          "GAME 1"
        </Text>
        <Image style={styles.prof_pic_image}
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        />
      </View>
  );
  }
  */
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'transparent',
    margin: 0
  },
  body_container: {
    padding: 10
  },
  prof_pic_container: {
    marginTop: 20
  },
  content_container: {
    margin: 10
  },
  header_container: {
  },
  prof_pic_image: {
    flex: 1,
    width: windowSize.width,
    height: windowSize.width,
  },
  nameText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
})

module.exports = Profile;
