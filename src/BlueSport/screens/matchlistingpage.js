'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var MatchList = require('../bigparts/matchlist')
var Header = require('../parts/header')
var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')
import Store from 'react-native-store';


//database name and constant for storing data
const DB = {
  'user': Store.model("user"),
  'player': Store.model("player")
}
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

console.log("\n\nUSER: "+DB.user.get()[0])
console.log("\n\nPlayer: " +DB.player.get()[0])

var MatchListingPage = React.createClass({
  getInitialState: function() {
    return ({
      isRefreshing: false,
    });
  },
  getDefaultProps: function() {
    return (
      {
        mode: 'nav',
        title: "MATCHES",
      }
    )
  },
  render: function() {
    var {
      matches,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

    <Header title={this.props.title}
            navigator={this.props.navigator}
            mode={this.props.mode} />

      <MatchList
        navigator={this.props.navigator}
        matches={this.props.matches}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
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

module.exports = MatchListingPage;
