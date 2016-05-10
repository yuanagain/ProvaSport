'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var Bracket = require('../bigparts/bracket')
import * as _clogic from '../libs/customlogic.js'
var Tournament = require('../modules/tournament')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;


var t2 = {
  teams: [1, 0, 1, 0, 1, 0, 1, 0],
  matches: [1, 0, 1, 0, 1, 0, 1],
}

var t3 = {
  teams: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  matches: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
}

var BracketPage = React.createClass({
  getDefaultProps: function() {
    return (
      {
        
        tournamentid: 0,
        loaded: false
      }
    )
  },

  getInitialState: function() {
    return {
      tournament: Tournament.default_tournament,
    };
  },

  render: function() {
    var {
      tournamentid,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <Header title={this.state.tournament.name}
              mode={'nav'}
              navigator={this.props.navigator} />

      <View style={styles.bracket_container}>

      <Bracket matches={_clogic.bracketMatrix(this.state.tournament)} //this.state.tournament
               navigator={this.props.navigator} />

      </View>
    </View>
    );
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
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  bracket_container: {
    height: 555 * _cvals.dscale,
    width: windowSize.width - 4,
    borderWidth: 0,
    borderColor: 'black'
  }
})

module.exports = BracketPage;
