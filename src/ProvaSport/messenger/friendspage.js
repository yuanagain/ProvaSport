'use strict';

import * as Player from '../modules/player'
import * as Conversation from '../modules/conversation'
import * as _ctools from '../libs/customtools'

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var Header = require('../parts/header')

var {
  AsyncStorage,
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
  //data is the following array
  getDefaultProps: function() {
    return ({
      data: [],
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
        <View style={styles.android_container}>
          <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                style={styles.listView}
              />
        </View>
      </View>
          );
  },

  renderRow(data) {
    return (
      <ChatRow playerid={data}
               navigator={this.props.navigator} />
    );
  },

  componentDidMount: function () {
    // get friend list
    this.setAsync();
  },
  componentWillReceiveProps: function (nextProps){
    this.setAsync();
  },
  setAsync: function(){
    AsyncStorage.getItem('player', (err, resp)=>{
      var player = JSON.parse(resp);
      //set data to people you follow
      //console.log("DATA");
      //console.log(player.following);
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      var res = ds.cloneWithRows(player.following);
      //changed to set Player also possible bug introduction
      this.setState({
        player: player,
        dataSource: res
      });
    })
  },

  // set the state to the current friend
  updateFriend: function (player) {
    this.setState({friend: player});
    this.setState({friendsLoaded: true});
  }
});


var ChatRow = React.createClass({
  getInitialState: function() {
    //Player._GetPlayer(this.props.playerid, this.getFriends);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      player: Player.default_player,
      intersection: [],
    };
  },
  getDefaultProps: function() {
    return ({
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
  <View style={styles.friendContainer}>
    <TouchableOpacity onPress = {()=>this.check()} style = {styles.container}>
      <View style={styles.profpicContainer}>
      <Image
            source={{uri: this.state.player.prof_pic}}
            style={styles.profpic}
             />
      </View>
      <View>
        <View style={styles.details}>
            <Text style={_cstyles.standard_text}>{this.state.player.name.first}</Text>
            <Text style={_cstyles.detail_text}>{this.state.player.name.last}</Text>
          </View>
          <View style={_cstyles.section_divider_line} ></View>
      </View>
    </TouchableOpacity>
  </View>
      );
  },

  onPress: function(convoid) {
    var Messenger = require('./Messenger');
    this.props.navigator.push({
      id: "Messenger",
      component: Messenger,
      passProps: {
        player: this.state.player,
        friend: this.props.playerid,
        convoid: convoid
      }
    });
  },

  fetchPlayer: function(data) {
    console.log("PLAYER SET");
    //console.log(data);
    this.setState({loaded : true})
    this.setState({player : data})

  },
  check: function() {
    //check if both players have existing conversation
    AsyncStorage.getItem('player',(err, resp)=>{
      var player = JSON.parse(resp);
      var interlist = _ctools.intersection(player.convo, this.state.player.convo)
      console.log(interlist);
      if(interlist.length == 1){
        console.log("Existing CONVO");
        this.onPress(interlist[0])
      }
      else if (interlist.length === 0) {
        console.log("NEW CONVO");
        Conversation.newConversation().then(id=>{
          //add to both Players
          console.log(id);
          Player.addConvo(player.playerid, id)
          Player.addConvo(this.state.player.playerid, id)
          this.onPress(convoid)
        })
      }
      else {
        console.log("ERROR intersection detects multiple conversations. friendspage.js line: 191");
      }
    })
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
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
  android_container: {
    marginTop: 50,
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
