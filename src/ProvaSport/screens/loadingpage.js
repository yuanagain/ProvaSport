'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var LoadingPage = React.createClass({

  render: function() {
    var {
      name,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <Header title={"Loading"}
              mode={'nav'}
              navigator={this.props.navigator} />
      <View/>
    </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})

module.exports = LoadingPage;
