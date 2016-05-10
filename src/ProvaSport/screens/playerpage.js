'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'
var Header = require('../parts/header')
var PayoutSection = require('../smallparts/payoutsection')
var PayoutListing = require('../smallparts/payoutlisting')
var SimpleRow = require('../smallparts/simplerow')
var MatchList = require('../bigparts/matchlist')

import * as Player from '../modules/player'

var {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ListView,
  RefreshControl,
  Modal,
  Platform,
} = React;

var PlayerPage = React.createClass({
  getInitialState: function() {
    return (
      {
        player: Player.default_player,
        loaded: false,
        isRefreshing: false,
        my_player: false,
        my_user: false,
        playerid: this.props.playerid
      }
    );
  },
  getDefaultProps: function() {

    return (
      {
        playerid: -1,
        teamid: 0,
        mode: 'nav',
      }
    )
  },
  render: function() {
    var {
      playerid,
      loginFunction,
      ...props
    } = this.props;


    // add friend component
    var add_friend = <View></View>

    if (this.state.my_player) {

      if (this.state.my_user.playerid != this.props.playerid
            && this.props.playerid != -1 ) {
        var friend_status_text = "Follow"

        // if they're a friend
        if (this.state.my_player.following.indexOf(this.props.playerid) != -1) {
          friend_status_text = "Unfollow"
        }

        add_friend =  [<SimpleRow  onPress={() => this.toggleFriend()}
                                    title={'Follow'}
                                    value={friend_status_text}
                                    key={1}/>,
                       <View style={_cstyles.section_divider_line}
                             key={2}></View>]
      }
    }

    if (this.state.my_player == null) {
      // this.state.player = Player.default_player
      if (nextProps.playerid !== -1) {
        Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
      }
      else {
        this.getPlayerId()
      }
    }

    return (
    <View style={styles.container}>
      <View>
        <Header title={this.state.player.name.full}
                mode={this.props.mode}
                navigator={this.props.navigator} />
      </View>
      <ScrollView styles={[styles.scroll, {height: windowSize.width}]}
                  contentContainerStyle={styles.content}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this.onRefresh}
                      tintColor={'white'}
                      colors={['#ff0000', '#00ff00', '#0000ff']}
                      backgroundColor={(Platform.OS === 'ios') ? _cvals.skorange : 'white'}
                    />
                  }>
        <Image source={{uri: this.state.player.prof_pic}}
               style={styles.pic} />

        <View style={_cstyles.body_container}>
          <SimpleRow
            title={'Name'}
            value={this.state.player.name.full}/>

          <View style={_cstyles.section_divider_line}></View>

          {add_friend}

          <SimpleRow
            title={'Nationality'}
            value={this.state.player.nationality}/>

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Level'}
            value={this.state.player.level}/>

          <View style={_cstyles.section_divider_line}></View>

          <PayoutSection
            title={'Earnings'}
            earnings={_ctools.cumulativeEarnings(this.state.player.earnings)}
          />

          <PayoutListing
            earnings={this.state.player.earnings} />

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Sports'}
            value={this.state.player.sports}/>

          <View style={_cstyles.section_divider_line}></View>

          <SimpleRow
            title={'Location'}
            value={this.state.player.home}/>

          <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Teams'}
          value={this.state.player.teams.length}
          onPress={this.toTeamListing} />
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Friends'}
          value={this.state.player.following.length}
          onPress={this.toFriendsListing} />
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow
          title={'Tournaments'}
          value={this.state.player.tournaments.length}
          onPress={this.toTournamentListing} />
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Career Matches"}
                   value={this.state.player.matches.length}
                   onPress={()=>this.toMatchListing()}/>
        <View style={_cstyles.section_divider_line}></View>

        <SimpleRow title={"Recent Matches"}
                   value={this.state.player.matches.length}
                   />

          <View style={styles.matches}>
            <MatchList
              matches={this.state.player.matches.slice(0, 3)}
              navigator={this.props.navigator}
            />
          </View>
        </View>
      </ScrollView>
      <View style={_cstyles.buttons_container}>
      </View>
    </View>
    );
  },

  componentWillUnmount: function() {
    this.setState({loaded : false})
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (nextState.player == null
        || nextState.my_player == null
        || nextState.my_user == null) {
      return false
    }
    return true
  },

  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },
  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
  },

  getPlayerId: function(){
    //console.log("\n\n\n\nUSING THE ASYNC STORAGE")

    var value = AsyncStorage.getItem('player', (error, response)=>{
      var obj = JSON.parse(response)
      // this is player id of person logged in. WORKS!!
      //console.log(obj.playerid)
      this.setState({player: obj})
    });
  },

  getMe: function(){
    AsyncStorage.getItem('player', (error, response)=>{
      var obj = JSON.parse(response)
      // this is player id of person logged in. WORKS!!
      //console.log(obj.playerid)
      this.setState({my_player: obj})
    });
    AsyncStorage.getItem('user', (error, response)=>{
      var obj = JSON.parse(response)
      // this is player id of person logged in. WORKS!!
      //console.log(obj.playerid)
      this.setState({my_user: obj})
    });
  },

  onRefresh: function() {
    this.setState({isRefreshing: true})
    var pid = this.state.my_user.playerid;
    Player.GetPlayer(pid).then(playerobj=>{
      AsyncStorage.setItem('player', JSON.stringify(playerobj), (error, response)=>{
        // this is player id of person logged in. WORKS!!
        //console.log(obj.playerid)
        this.setState({my_player: playerobj})
        if (this.props.playerid == -1){
          this.setState({player: playerobj})
        }
        else {
          Player._GetPlayer(this.props.playerid, this.fetchPlayer)
        }
      });
    })

    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, _cvals.timeout);
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    this.getMe();

    if (this.props.playerid == -1){
      this.getPlayerId();
    }
    else {
      Player._GetPlayer(this.props.playerid, this.fetchPlayer)
    }
    //DB.player.findById(0).then(resp => this.setState({my_player: resp}))
  },

  toggleFriend: function() {
    // TODO change status of friend, update local data store
    var setPlayer = this.setMyPlayer;
    if (this.state.my_player.following.indexOf(this.props.playerid) == -1) {
      /*
       * Player.addFriend(this.state.my_user.playerid, this.props.playerid)
       * this.state.my_player.following.push(this.props.playerid)
       * setPlayer(this.state.my_player)
       * this.setState({loaded: true})
       */
       this.addFrnd()
    }
    else {
      //console.log("REMOVE Friend");
      this.removeFrnd();
      /*
       * var player = this.state.my_player;
       * console.log("calling remove friend"+this.state.my_user.playerid+"  "+this.props.playerid)
       * Player.removeFriend(this.state.my_user.playerid, this.props.playerid).then(function(resp){
       *   player.following = resp;
       *   console.log("changing in cache")
       *   setPlayer(player);
       *   this.setState({my_player: player})
       * })
       */
    }
  },
  setMyPlayer: function(obj){
    AsyncStorage.setItem('player', JSON.stringify(obj), (error, response)=>{
      //console.log(obj)
      this.setState({my_player: obj})
    });
  },
  removeFrnd: function(){
    var setPlayer = this.setMyPlayer;
    var player = this.state.my_player;
    //console.log("calling remove friend"+this.state.my_user.playerid+"  "+this.props.playerid)
    Player.removeFriend(this.state.my_user.playerid, this.props.playerid).then(function(resp){
      player.following = resp;
      //console.log("changing in cache")
      setPlayer(player);
    })

  },
  addFrnd: function() {
    var setPlayer = this.setMyPlayer;
    Player.addFriend(this.state.my_user.playerid, this.props.playerid)
    this.state.my_player.following.push(this.props.playerid)
    setPlayer(this.state.my_player)
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.playerid === -1){
      this.getPlayerId()
    }
    else {
      Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
    }
  },

  toTeamListing() {
    var TeamListingPage = require('../screens/teamlistingpage')
    this.props.navigator.push({
      id: "TeamListing",
      component: TeamListingPage,
      passProps: {
        navigator: this.props.navigator,
        teams: this.state.player.teams.reverse()
      }
    })
  },

  toFriendsListing() {
    var FriendsListingPage = require('../screens/friendslistingpage')
    this.props.navigator.push({
      id: "FriendsListing",
      component: FriendsListingPage,
      passProps: {
        navigator: this.props.navigator,
        following: this.state.player.following
      }
    })
  },

  toTournamentListing() {
    var TournamentListingPage = require('../screens/tournamentlistingpage')
    this.props.navigator.push({
      id: "Tournament",
      component: TournamentListingPage,
      passProps: {
        navigator: this.props.navigator,
        tournaments: this.state.player.tournaments.reverse()
      }
    })
  },

  toMatchListing() {
    var MatchListingPage = require('../screens/matchlistingpage')
    this.props.navigator.push({
      id: "MatchListing",
      component: MatchListingPage,
      passProps: {
        navigator: this.props.navigator,
        matches: this.state.player.matches.reverse()
      }
    })
  },

});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
  pic: {
    width: windowSize.width,
    height: windowSize.width,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'grey',
    // width: windowSize.width,
    height: 300,
  },
  matches: {
    height: 200 * _cvals.dscale
  }
})


module.exports = PlayerPage;
