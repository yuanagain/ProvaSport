'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var MatchList = require('../bigparts/matchlist')
var Header = require('../parts/header')
var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView,
  RefreshControl,
} = React;


var NewsFeedPage = React.createClass({
  getInitialState: function() {
    return {
      isRefreshing: false,
    };
  },
  getDefaultProps: function() {
    return (
      {
      }
    )
  },
  render: function() {
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

    <Header title={"NEWS"} navigator={this.props.navigator} />

      <MatchList
        navigator={this.props.navigator}
        matches={[0, 1]}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },

  goBack: function() {
    this.props.navigator.pop()
  },
})

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    marginTop: 0,
  },
})

module.exports = NewsFeedPage;
