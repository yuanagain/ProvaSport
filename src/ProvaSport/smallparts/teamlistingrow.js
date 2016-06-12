'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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


var TeamListingRow = React.createClass({

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
        dead: false,
      }
    )
  },
  render: function() {
    var {
      teamid,
      navigator,
      ...props
    } = this.props;

    if (this.props.dead) {
      return (
        <View style={styles.playerbrick} >
          <View style={[styles.center, styles.left]} >
            <Image style={styles.im}
                   source={{uri: this.state.team.thumbnail}}/>
          </View>
          <View style={styles.right}>
            <View >
              <Text style={[_cstyles.header_text]}>{this.state.team.name} </Text>
            </View>
          </View>
        </ View>
        )
    }

    return (
      <TouchableOpacity style={styles.playerbrick} 
                        onPress={()=>this.onPress()} >
        <View style={[styles.center, styles.left]} >
          <Image style={styles.im}
                 source={{uri: this.state.team.thumbnail}}/>
        </View>
        <View style={styles.right}>
          <View >
            <Text style={[_cstyles.header_text]}>{this.state.team.name} </Text>
          </View>
        </View>
      </ TouchableOpacity>
    );
  },

  onPress: function() {
    if (this.state.loaded == false) {
      return
    }
    // check if team or is BYE or TBD
    if (this.props.teamid == 'BYE' || this.props.teamid == 'TBD') {
      return
    }

    var TeamPage = require('../screens/teampage')
    this.props.navigator.push({
      id: "TeamPage" + String(_ctools.randomKey()),
      component: TeamPage,
      passProps: {
        navigator: this.props.navigator,
        teamid: this.props.teamid,
        tournamentid: this.props.tournamentid
      }
    })
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
  playerbrick: {
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
    marginHorizontal: 4 * _cvals.dscale,
  },
  left:{
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {

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
    marginTop: _cvals.dscale * -4
  }
});

module.exports = TeamListingRow;
