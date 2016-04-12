'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Team from '../modules/team'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Navigator,
  TouchableOpacity,
} = React;


var TeamBrick = React.createClass({

  toTeamPage: function() {
    if (this.props.disabled) {
      return
    }
    var TeamPage = require('../screens/teampage')
    this.props.navigator.push({
      id: "TeamPage" + String(_ctools.randomKey()),
      component: TeamPage,
      passProps: {
        navigator: this.props.navigator,
        teamid: this.props.teamid
      }
    })
  },

  toPlayerPage: function() {
    var ProfilePage = require('../screens/profilepage')
    this.props.navigator.push({
      id: "ProfilePage" + String(_ctools.randomKey()),
      component: ProfilePage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.state.team.players[0]
      }
    })
  },

  getInitialState: function() {
    return (
      {
        team: Team.default_team,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teamid: -1,
        disabled: false,
      }
    )
  },
  render: function() {
    var {
      playerid,
      navigator,
      disabled,
      ...props
    } = this.props;

    if (this.props.disabled) {
      return (
        <View style={styles.teambrick}>
          <View style={[styles.center, styles.left]} >
            <Image style={styles.im}
                   source={{uri: this.state.team.thumbnail}}/>
          </View>
          <View style={styles.right}>
              <Text style={[_cstyles.detail_text, {fontWeight: 'bold'}]}
                    numberOfLines={2} >
                    {this.state.team.name}
              </Text>
          </View>
        </View>
        )
    }

    return (
      <TouchableOpacity style={styles.teambrick}
                        onPress={() => this.toTeamPage()}>
        <View style={[styles.center, styles.left]} >
          <Image style={styles.im}
                 source={{uri: this.state.team.thumbnail}}/>
        </View>
        <View style={styles.right}>
            <Text style={[_cstyles.detail_text, {fontWeight: 'bold'}]}
                  numberOfLines={2} >
                  {this.state.team.name}
            </Text>
        </View>
      </TouchableOpacity>
    );
  },

  fetchTeam: function(data) {
    this.state.team = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },
});

var styles = StyleSheet.create({
  teambrick: {
    height: _cvals.brickheight,
    width: _cvals.bricklength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginRight: 4 * _cvals.dscale,
  },
  left:{
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: _cvals.thumbslength + 5 * _cvals.dscale,
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compress: {
    marginTop: _cvals.dscale * -4,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

module.exports = TeamBrick;
