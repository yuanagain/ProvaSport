'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var MatchList = require('../bigparts/matchlist')
var Header = require('../parts/header')
var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

import * as Player from '../modules/player'

var {
  AsyncStorage,
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
      fmatches: []
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
        matches={this.state.fmatches}
        onRefresh={this.onRefresh}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },

  componentDidMount: function () {

    AsyncStorage.getItem('user', (err, result)=>{
       //console.log("PLAYER");
      //this is our matches
      //console.log("USING ASYNC MATCHES")
      result = JSON.parse(result);
      Player.getFriendsMatches(result.playerid).then(resp=>{resp.concat(result.matches); this.setState({fmatches:resp})});
    });
    // this.state.match = this.props.match
  },

  onRefresh: function() {
    //console.log("REFRESHING")
        AsyncStorage.getItem('user', (err, result)=>{
           //console.log("PLAYER");
          //this is our matches
          //console.log("USING ASYNC MATCHES")
          result = JSON.parse(result);
          Player.getFriendsMatches(result.playerid).then(resp=>{resp.concat(result.matches); this.setState({fmatches:resp})});
        });
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
