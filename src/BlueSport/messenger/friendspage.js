'use strict';

import * as Player from '../modules/player'


var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var Header = require('../parts/header')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView,
  TouchableOpacity,
  Navigator,
  //RefreshControl,
} = React;

var MY_FRIENDS = [
  {'id': 1, 'name': "Suneel", 'sports': "basketball",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"},
  {'id': 2, 'name': "Daniel", 'sports': "tennis",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"},
  {'id': 3, 'name': "Khadim", 'sports': "football",
  'profpic': "http://facebook.github.io/react/img/logo_og.png"}];

var player = {
          "name" : "Sam",
          "userid" : 2,
          "prof_pic": "",
          "elo": 0.0,
          "earnings": {
            "cash": 1000,
            "xp": 200,
          },
          "sports": "Basketball",
          "friends": [0],
          "teams": [],
          "matches": [],
          "tournaments": []
        };

var FriendsPage = React.createClass({
  getInitialState: function() {
    //Player._GetPlayer(this.props.playerid, this.getFriends);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      player: Player.default_player,
      friend: Player.default_player,
      dataSource: ds.cloneWithRows(this.props.data),
      data: [],
      friendsLoaded: false,
    };
  },
  getDefaultProps: function() {
    return ({
      data: [1],
      playerid: 0
    })
  },
render() {
  var {
      data,
      navigator,
      ...props
    } = this.props;
	
return (
  <View style={styles.container}>
	<View>
        <Header title={"MESSAGES"}
                mode={"nav"}
                navigator={this.props.navigator} />
  </View>
  <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        style={styles.listView}
      />

  </View>
      );
  },


  renderRow(dataSource) {
    // get friend id, profpic, name, and sports
    console.log("RENDERING");
    //var name = null;
    //var sports = null;
    //var picture = null;
    var userid = dataSource;
    Player._GetPlayer(dataSource, this.updateFriend);
    //console.log(name);
    console.log(this.state.friend.name);

    return (
      <View style={styles.friendContainer}>
        <TouchableOpacity onPress = {()=>this.onPress(userid)} style = {styles.container}>
          <View style={styles.profpicContainer}>
            <Image
              //source={{uri: picture}}
              source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}
              style={styles.profpic}
            />
        	</View> 
          <View>
          	<View style={styles.details}>
  	            <Text style={_cstyles.standard_text}>{this.state.friend.name.full}</Text>
  	            <Text style={_cstyles.detail_text}>{this.state.friend.sports}</Text>
              </View>
              <View style={_cstyles.section_divider_line} ></View> 
          </View>
        </TouchableOpacity>
      </View>
    );
  },


  onPress: function(friendId) {
    var Messenger = require('./Messenger');
    this.props.navigator.push({
      id: "Messenger",
      component: Messenger,
      passProps: {
        player: this.props.player,
        friend: friendId,
      }
    });
  },

  componentDidMount: function () {
    // get friend list
    Player._GetPlayer(this.props.playerid, this.getFriends);
  },

  // adds friend userids to data
  getFriends: function (player) {
    this.state.data = player.friends;
    //this.setState({data: player.friends});
  },

  // set the state to the current friend
  updateFriend: function (player) {
    this.setState({friend: player});
    this.setState({friendsLoaded: true});
  }

});

var styles = StyleSheet.create({
	container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    //paddingHorizontal: _cvals.dscale * 8,
    paddingBottom: _cvals.dscale * 4,
    opacity: 1.00,
    marginTop: 0,
  },
  friendContainer: {
    flexDirection: 'row',
    flex: 1,
    width: windowSize.width,
    marginTop: _cvals.dscale * 4,
    marginBottom: _cvals.dscale * 4
  },
  player_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: _cvals.dscale * 4,
  },
  profpicContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowSize.width / 5,
    height: windowSize.wwidth / 5,
  },
  profpic: {
  	width: windowSize.width / 8,
    height: windowSize.width / 8,
    borderRadius: windowSize.width / 16
  },
  listview: {
    backgroundColor: 'transparent',
  },
  details: {
  	marginTop: -1*(windowSize.width /8),
  	marginLeft: windowSize.width / 5,
  }
})

module.exports = FriendsPage;