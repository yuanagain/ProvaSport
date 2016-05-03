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
    AsyncStorage.getItem('player', (err, player)=>{
      player = JSON.parse(player);
      if (player.friends.length == 0){
        this.setState({fmatches: player.matches})
      }
      AsyncStorage.getItem('user', (err, result)=>{
         //console.log("PLAYER");
        //this is our matches
        //console.log("USING ASYNC MATCHES")
        result = JSON.parse(result);
        Player.getFriendsMatches(result.playerid).then(resp=>{
          var matches = [];
          console.log("RESPONSE FrOM SDNJDKFJJNKDFJNKSD");
          console.log(resp);
          console.log(player.matches);
          if(resp!=null || resp!= undefined) {
            matches = resp.concat(player.matches);
          }
          else {
            matches = player.matches;
          }
          matches = this.unique(matches);
          this.setState({fmatches: matches})
        });
      });
      // this.state.match = this.props.match
    })
  },
  componentWillReceiveProps: function (nextProps) {
    AsyncStorage.getItem('player', (err, player)=>{
      player = JSON.parse(player);
      AsyncStorage.getItem('user', (err, result)=>{
         //console.log("PLAYER");
        //this is our matches
        //console.log("USING ASYNC MATCHES")
        result = JSON.parse(result);
        Player.getFriendsMatches(result.playerid).then(resp=>{
          var matches = [];
          console.log("RESPONSE FORM SDNJDKFJJNKDFJNKSD");
          console.log(this.unique(player.matches.concat(resp)));
          if (resp!=null || resp!= undefined) {
            matches = resp.concat(player.matches);
          }
          else {
            matches = player.matches;
          }
          matches = this.unique(matches);
          console.log(matches);
          this.setState({fmatches: matches})
        });
      });
      // this.state.match = this.props.match
    })
  },

  onRefresh: function() {
//hard re-fresh fetch from server
    AsyncStorage.getItem('user', (err, result)=>{
      result = JSON.parse(result);

      Player.GetPlayer(result.playerid).then(player=>{
        AsyncStorage.setItem('player', JSON.stringify(player), (err, response)=>{
          Player.getFriendsMatches(result.playerid).then(resp=>{
            var matches = [];
            console.log("RESPONSE FROM");
            console.log(resp);
            console.log(player.matches);
            if(resp!=null || resp!= undefined) {
              matches = resp.concat(player.matches);
            }
            else {
              matches = player.matches;
            }
            //matches = unique(matches);
            this.setState({fmatches: matches})
          });
        });
      });
      // this.state.match = this.props.match
    })
  },
  unique: function(list) {
    return list.filter(function(elem, pos, arr) {
      return arr.indexOf(elem) == pos;
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
