'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

var RoundRobin = require('../bigparts/roundrobin')
var Header = require('../parts/header')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var dummymatches = [[{'item': [3,4], 'type': 'blank'}, {'item': [3,4],  'type': 'icon' }, {'item': [3,4], 'type': 'icon' }, {'item': [3,4], 'type': 'icon' },],
                    [{'item': 'Player 1', 'type': 'player'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'},],
                    [{'item': 'Player 2', 'type': 'player'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'},],
                    [{'item': 'Player 3', 'type': 'player'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'}, {'item': [3,4], 'type': 'match'},],]


var RoundRobinPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  getDefaultProps: function() {
    return (
      {
        matches: dummymatches,
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

      <Header title={"ROUND ROBIN"}
              mode={'nav'}
              navigator={this.props.navigator} />
      <RoundRobin matches={this.props.matches}
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
