'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var WideButton = require('../smallparts/widebutton');

// var ScoreRowRecord = require('./scorerowrecord')

// var PopoverSelect = require('./popoverselect')
var DynamicList = require('../bigparts/dynamiclist')
var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PopoverSelector = require('../bigparts/popoverselector')
var Header = require('../parts/header')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')
var TextField = require('../smallparts/textfield')
var PlayersRow = require('../parts/playersrow')

import * as Match from '../modules/match'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as _settings from '../modules/settings'

var {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Platform,
} = React;

var blank_match = {
        name: "",
        location: "",
        sport: [],
        teams: [],
        scores: [],
      }

var reset_form = {
        name: "",
        location: "",
        sport: [],
        teams: [[],[],],
        scores: [],
      }

var items = ["Item 1", "Item 2"];

var RecordPage = React.createClass({

  getInitialState: function() {
    return ( {
      name: "",
      location: "",
      sport: [],
      teams: [[],[]],
      scores: [],
    });
  },

  getDefaultProps: function() {
    return ({
      mode: '',
      items: [0, 1],
      matchid: 1,
      // options; 'team1', 'team2, 'name', 'sport', 'location',
      fixed_fields: [],
    })
  },

  render: function() {
    var {
      name,
      loginFunction,
      ...props
    } = this.props;
    //console.log(this.props.match);
    var settings = _settings.config

    var name_field = [<SimpleRow
                                  title={'Name'}
                                  key={10}
                                  value={this.state.name} />,
                      <View style={_cstyles.section_divider_line} 
                            key={11}/>]

    if (this.props.fixed_fields.indexOf('name') == -1) {
      name_field =  <TextField
                      value={this.state.name}
                      label="Match Name"
                      placeholder="Optional"
                      keyboardType='default'
                      onChangeText={(name) => this.setState({name})}
                    />
    }

    var location_field = [<SimpleRow
                                      title={'Name'}
                                      key={13}
                                      value={this.state.location} />, 
                          <View style={_cstyles.section_divider_line} 
                                key={14} />]

    if (this.props.fixed_fields.indexOf('location') == -1) {
      location_field = <TextField
                          value={this.state.location}
                          label="Location"
                          placeholder="Optional"
                          keyboardType='default'
                          onChangeText={(location) => this.setState({location})}
                        />
    }


    sport = <SimpleRow
                      title={'Sport'}
                      value={this.state.sport}/>
    

    if (this.props.fixed_fields.indexOf('sport') == -1) {
      var sport = 
      <PopoverSelector
              title={'Sport'}
              items={settings.sports}
              navigator={this.props.navigator}
              selection={this.state.sport}
              harvest={this.setSport}
              mode={'single'}
            />
    }

    var team1 = <View />
    var team2 = <View />

    if (this.props.fixed_fields.indexOf('team1') == -1) {
      team1 = <PopoverSelector
                title={'Team 1'}
                magic={'player'}
                items={this.state.items}
                navigator={this.props.navigator}
                selection={this.state.teams[0]}
                harvest={this.setTeams}
                harvestArgs={0}
              />
    }
    else  {
      team1 = <SimpleRow
                      title={'Team 1'}
                      value={this.state.teams[0].length}
                      key={1}/>

    }

    if (this.props.fixed_fields.indexOf('team2') == -1) {
      team2 = <PopoverSelector
                title={'Team 2'}
                magic={'player'}
                items={this.state.items}
                navigator={this.props.navigator}
                selection={this.state.teams[1]}
                harvest={this.setTeams}
                harvestArgs={1}
              />
    }
    else  {
      team2 = <SimpleRow
                      title={'Team 2'}
                      key={3} 
                      value={this.state.teams[1].length}/>
                
    }

    var team_row_1 = <View/>
    var team_row_2 = <View/>

    if (this.state.teams[0].length > 0) {
      team_row_1 = <PlayersRow  players={this.state.teams[0]}
                                navigator={this.props.navigator} />

    }

    if (this.state.teams[1].length > 0) {
      team_row_2 = <PlayersRow  players={this.state.teams[1]}
                                navigator={this.props.navigator} />
    }
   

    return (
    <View style={styles.container}>
      <View style={(Platform.OS === 'ios') ? {height: 525 * _cvals.vscale} : {height: 520 * _cvals.vscale}}>
        <Header title={"RECORD"}
                  mode={this.props.mode}
                  navigator={this.props.navigator} />
          <ScrollView>
          <View style={_cstyles.body_container}>

            {name_field}
            {location_field}

            {sport}
            
            <View style={_cstyles.section_divider_line}>
            </View>

            {team1}
            {team_row_1}

            <View style={_cstyles.section_divider_line}>
            </View>

            {team2}
            {team_row_2}

            <View style={_cstyles.section_divider_line}>
            </View>

            <SimpleRow
              title={'Scores'}
              value={''}/>

            <DynamicList
              items={this.state.scores}
              magic={'scores'}
              harvest={this.setScores}
              />
          </View>
          </ScrollView>
      </View>
      <View style={_cstyles.buttons_container}>
        <WideButton
          text={"Record Activity"}
          onPress={()=>this.submit()}
          />
      </View>

    </View>
    );
  },

  componentDidMount(){
    if (this.props.matchid == -1) {
      return
    }
    else {
      Match._GetMatch(this.props.matchid, this.fetchMatch)
    }
    /* 
     * AsyncStorage.getItem('user', (err, user)=>{
     *   user = JSON.parse(user);
     *   AsyncStorage.getItem('player', (err, player)=>{
     *     player = JSON.parse(player);
     *     var items = player.friends.concat(user.playerid);
     *     this.setState({items: items});
     *   })
     * })
     */
  },

  fetchMatch: function(data) {
    if (this.props.matchid == -1) {
      return
    }
    this.setState({match : data})
    this.setState({sport : [data.sport], scores : data.scores,
                   name: data.name, location: data.location,}) 
    Team._GetTeam(data.teams[0], (data)=>this.fetchTeam(data, 0) )
    Team._GetTeam(data.teams[1], (data)=>this.fetchTeam(data, 1) )
  },

  fetchTeam: function(data, index) {
    console.log("TEAMS LOADED " + (index + 1))
    this.state.teams[index] = data.players
    this.setState({teams : this.state.teams})
    this.setState({loaded : true})
  },

  componentWillReceiveProps(nextProps){
    // for incase we pop off navigator and don't refresh
    AsyncStorage.getItem('user', (err, user)=>{
      user = JSON.parse(user);
      AsyncStorage.getItem('player', (err, player)=>{
        player = JSON.parse(player);
        var items = player.friends.concat(user.playerid);
        this.setState({items: items});
      })
    })
  },

  setName: function(name) {
    if (true) {
      this.setState({name})
    }
  },

  setLocation: function(location) {
    if (true) {
      this.setState({location})
    }
  },
  validateTeams: function(){
    var team1 = this.state.teams[0];
    var team2 = this.state.teams[1];
    //rules for team validation
    // if (team1.length != team2.length){
    //   return false;
    // }
    if (this.state.teams.length != 2){
      return false;
    }
    //see if teams are distinct
    if (Team.findOne(team1, team2)){
      return false;
    }
    else {
      return true;
    }
  },

  reset: function() {
    this.setState(reset_form)
    this.setState({teams: [[],[],]})
    this.setScores([])
  },

  // attempt to create ad hoc teams
  /* TODO: team customization*/
  createTeams: function() {
    //console.log(this.state.teams[1])
    var team1 = Team.default_team;
    team1.name = "Team 1";
    team1.players = [].concat(this.state.teams[0]);
    //Player.GetPlayer(team1.players[0]).then(resp=>{team1.thumbnail = resp.prof_pic})
    //validate teams
    if (this.validateTeams()) {
     Team._CreateTeam(team1, this.harvestTeam1)
   }
    //Team._CreateTeam(team2, this.harvestTeam2)//.then(resp=>this.state.teams[1] = resp).then(this.submitMatch())
  },

  harvestTeam1: function(team) {
    var team2 = Team.default_team;
    team2.name = "Team 2";
    team2.players = [].concat(this.state.teams[1]);
    //Player.GetPlayer(team2.players[0]).then(resp=>{team1.thumbnail = resp.prof_pic})
    this.state.teams[0] = team;
    Team._CreateTeam(team2, this.harvestTeam2)
  },

  harvestTeam2: function(team) {
    this.state.teams[1] = team;
    console.log(Team.addMatch)
    this.submitMatch()
  },

  // get submission in action
  submit: function() {
    if (this.props.matchid == -1){
      this.createTeams()
    }
    else {
      //this.props.match.status[0] = 3;//WTF?
      Match.setMatch(this.props.matchid, this.props.match).then(this.props.navigator.pop())
      //Match.updateStatus(this.props.matchid, 3)
    }
  },

  // run once both teams have been created
  //pass along navigaotr
  // TODO: add match to teams' and players' match lists
  submitMatch: function() {
    //could introduce error with reporting no scores
    var now = Date.now();
    var match = {
      name: this.state.name,
      location: this.state.location,
      contract: this.state.contract,
      sport: this.state.sport,
      teams: [this.state.teams[0], this.state.teams[1]],
      scores: this.state.scores,
      status: {
        0: 0,
        1: 0
      },
      datetime: now,
      payoutdata: {
        xp : 100,
        cash: 100,
      },
    }
    Match._CreateMatch(match, this.confirmSubmit)
  },

  confirmSubmit: function(match) {
    //Player.addMatch(this.state.teams[0][0], match);
    Team.addMatch(this.state.teams[0], match)
    Team.addMatch(this.state.teams[1], match)
    //incase we added ourselves
    this.reloadPlayer();
    this.reset()
  },

  renderRow: function(rowData) {
    return (
      <ScoreRowRecord
        scores={rowData}
      />
    )
  },

  setTeams: function(team, index) {
    this.state.teams[index] = team
    this.setState({teams: this.state.teams})
  },

  setScores: function(scores) {
    this.setState({scores: scores})
  },

  setSport: function(sport) {
    this.setState({sport: sport})
  },

  reloadPlayer: function(){
    AsyncStorage.getItem('user',(err,resp)=>{
      resp = JSON.parse(resp);
      Player._GetPlayer(resp.playerid, function(playerobj) {
        AsyncStorage.setItem('player', JSON.stringify(playerobj),(err,resp)=>{
          console.log(resp);
        })
      })
    })
  },



  setName: function(name) {
    this.setState({name})
  },

  setLocation: function(location) {
    this.setState({name})
  }
});



var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    opacity: 1.00,
  },
  scores_scroll: {
    height: (Platform === 'ios') ? 130 * _cvals.dscale : 75 * _cvals.dscale,
  }
})

module.exports = RecordPage;
