'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

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

var dummymatches = [[{'item': [3,4], 'type': 'blank'}, {'item': 0,  'type': 'icon' }, {'item': 1, 'type': 'icon' }, {'item': 0, 'type': 'icon' },],
                    [{'item': 0, 'type': 'player'}, {'item': 0, 'type': 'empty'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'match'},],
                    [{'item': 1, 'type': 'player'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'empty'}, {'item': 1, 'type': 'match'},],
                    [{'item': 0, 'type': 'player'}, {'item': 0, 'type': 'match'}, {'item': 1, 'type': 'match'}, {'item': 0, 'type': 'empty'},],]


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
