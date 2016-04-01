'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');
var Navigator = require('Navigator');

var SignUpPage = require('../screens/signup.js')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} = React;

var SignUpRoot = React.createClass({

render: function() {
  var {
    name,
    navToHomeFunc,
    ...props
  } = this.props;
      
      return (
        <Navigator
          style={styles.wrapper}
          initialRoute={{name: 'SignUpPage', component: SignUpPage, passProps:{navToHomeFunc: this.props.navToHomeFunc}}}

          renderScene={(route, navigator) =>    {
            if (route.component) {
                          return React.createElement(route.component, {...route.passProps, navigator, route } );
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
/*

navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
              routeMapper={NavigationBarRouteMapper} />
}

  renderScene(route, navigator) {
    var routeId = route.id;

    if (routeId === 'HomeScreen') {
      return (
        <HomeScreen
            navigator={navigator} />
      );
    }

  },
*/
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
            Home
          </Text>
        </TouchableOpacity>
      );
    }
  };

var styles = StyleSheet.create({

})

module.exports = SignUpRoot;
