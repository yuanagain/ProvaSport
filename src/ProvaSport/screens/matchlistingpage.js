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



var MatchListingPage = React.createClass({
  getInitialState: function() {
    return ({
      isRefreshing: false,
      fmatches: []
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
        matches={this.state.fmatches}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },
  componentDidMount: function () {
     /* 
     *  AsyncStorage.getItem('user', (err, result)=>{
     *    //console.log("PLAYER");
     *    //this is our matches
     *    console.log("USING ASYNC MATCHES")
     *    result = JSON.parse(result);
     *    Player.getFriendsMatches(result.playerid).then(resp=>this.setState({fmatches:resp}));
     *  });
      */

    // this.state.match = this.props.match
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
