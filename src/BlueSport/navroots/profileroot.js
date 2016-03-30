'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Navigator = require('Navigator');

var ProfScreen = require('../screens/profile')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} = React;

var profileRoot = React.createClass({

  render: function() {
    return (
      <Navigator
        style={styles.wrapper}
          initialRoute={{name: 'ProfScreen', component: ProfScreen, passProps: {isModal: false}}}

          renderScene={(route, navigator) =>    {
            if (route.component) {
              return React.createElement(route.component, { ...this.props, ...route.passProps, navigator, route } );
            }
        }}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
          }}
      />
    )
  }

});

  var NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
      return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'white', margin: 10,}}>
            Back
          </Text>
        </TouchableOpacity>
      );
    },
    RightButton(route, navigator, index, navState) {
      return null;
    },
    Title(route, navigator, index, navState) {
      return (
        <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: 'white', margin: 10, fontSize: 16}}>
            Profile
          </Text>
        </TouchableOpacity>
      );
    }
  };

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

module.exports = profileRoot;
