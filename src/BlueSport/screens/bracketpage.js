'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');


var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var Bracket = require('../bigparts/bracket')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var dummymatches = [[{'team1': 'Player 1', 'team2': 'Player 2' },  {'team1': 'Player 3', 'team2': 'Player 4' }, {'team1': 'Player 5', 'team2': 'Player 6' }, {'team1': 'Player 7', 'team2': 'Player 8' }],
                    [{'team1': 'Player 1', 'team2': 'Player 3' }, {'team1': 'Player 5', 'team2': 'Player 8' }],
                    [{'team1': 'Player 3', 'team2': 'Player 5' }],]

var RoundRobinPage = React.createClass({
  getDefaultProps: function() {
    return (
      {
        matches: dummymatches,
      }
    )
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  render: function() {
    var {
      name,
      navigator,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

      <Header title={"BRACKET"}
              mode={'nav'}
              navigator={this.props.navigator} />

      <Bracket matches={dummymatches}
                  navigator={this.props.navigator} />
    </View>
    );
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
