'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')

import * as Tournament from '../modules/tournament'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var TournamentBlock = React.createClass({
  getInitialState: function() {
    return (
      {
        tournament: Tournament.default_tournament,
        loaded: false,
      }
    );
  },
  getDefaultProps() {
    return (
      {
        /* HOw do we change this based on past screen data?   */
        tournamentid: 0,
      }
    )
  },
  render: function() {
    var {
      title,
      value,
      tournamentid,
      navigator,
      ...props
    } = this.props;


    return (
      <TouchableOpacity onPress={this.onPress}>
        <SimpleRow title={this.state.tournament.name}
                   value={this.props.value} />
      </TouchableOpacity>
    );
  },

  onPress: function() {
      // var TeamPage = require('../screens/teampage')
      // this.props.navigator.push({
      //   id: "TeamPage" + String(_ctools.randomKey()),
      //   component: TeamPage,
      //   passProps: {
      //     teamid: this.props.teamid,
      //     navigator: this.props.navigator
      //   }
      // })
  },


  fetchTournament: function(data) {
    this.state.tournament = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    Tournament._GetTournament(this.props.tournamentid, this.fetchTournament)
  },

  componentWillReceiveProps: function(nextProps) {
    Tournament._GetTournament(nextProps.tournamentid, this.fetchTournament)
  },

  
});

var styles = StyleSheet.create({

})

module.exports = TournamentBlock;
