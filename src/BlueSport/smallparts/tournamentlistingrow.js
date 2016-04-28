'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Tournament from '../modules/tournament'

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


var TournamentListingRow = React.createClass({

  getInitialState: function() {
    return (
      {
        tournament: Tournament.default_tournament,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        tournamentid: 0,
        dead: false,
      }
    )
  },
  render: function() {
    var {
      tournamentid,
      navigator,
      ...props
    } = this.props;

    if (this.props.dead) {
      return (
        <View style={styles.playerbrick} >

            <View >
              <Text style={[_cstyles.header_text]}>{this.state.tournament.name} </Text>
            </View>
        </ View>
        )
    }

    return (
      <TouchableOpacity style={styles.playerbrick} 
                        onPress={()=>this.onPress()} >

        <View style={styles.right}>
          <View >
            <Text style={[_cstyles.header_text]}>{this.state.tournament.name} </Text>
          </View>
        </View>
      </ TouchableOpacity>
    );
  },

  onPress: function() {
    if (this.state.loaded == false) {
      return
    }

    if (this.state.tournament.type == 'Elimination') {
      var BracketPage = require('../screens/bracketpage')
      this.props.navigator.push({
        id: "BracketPage" + String(_ctools.randomKey()),
        component: BracketPage,
        passProps: {
          navigator: this.props.navigator,
          tournamentid: this.props.tournamentid,
        }
      })
    }
    else if (this.state.tournament.type == 'Round Robin') {
      var RoundRobinPage = require('../screens/roundrobinpage')
      this.props.navigator.push({
        id: "RoundRobinPage" + String(_ctools.randomKey()),
        component: RoundRobinPage,
        passProps: {
          navigator: this.props.navigator,
          tournamentid: this.props.tournamentid,
        }
      })
    }
    else {
      return
    }
  },

  fetchTournament: function(data) {
    this.state.tournament = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Tournament._GetTournament(this.props.tournamentid, this.fetchTournament)
  },

  componentWillReceiveProps: function(nextProps) {
    Tournament._GetTournament(nextProps.tournamentid, this.fetchTournament)
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

module.exports = TournamentListingRow;
