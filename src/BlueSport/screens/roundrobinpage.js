'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')
import * as _clogic from '../libs/customlogic.js'
var RoundRobin = require('../bigparts/roundrobin')
var Header = require('../parts/header')
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

var dummymatches = [[{'item': [3,4], 'type': 'blank'}, {'item': 0,  'type': 'icon' }, {'item': 1, 'type': 'icon' }, {'item': 0, 'type': 'icon' },],
                    [{'item': 0, 'type': 'team'}, {'item': 0, 'type': 'empty'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'match'},],
                    [{'item': 1, 'type': 'team'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'empty'}, {'item': 1, 'type': 'match'},],
                    [{'item': 0, 'type': 'team'}, {'item': 0, 'type': 'match'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'empty'},],]


var rr1 = {
  teams: [1, 0, 1, 0, 1],
  matches: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
}


var RoundRobinPage = React.createClass({
  getInitialState: function() {

    return {
      tournament: tournament.default_tournament,
    }
  },

  getDefaultProps: function() {
    return (
      {
        tournamentid: 0,
      }
    )
  },
  render: function() {
    var {
      name,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <Header title={this.state.tournament.name}
              mode={'nav'}
              navigator={this.props.navigator} />
      <RoundRobin matches={_clogic.RRMatrix(this.state.tournament.matches)}
                  navigator={this.props.navigator} />
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
  }
})

module.exports = RoundRobinPage;
