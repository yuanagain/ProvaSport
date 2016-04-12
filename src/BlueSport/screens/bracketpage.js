'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

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

var dummymatches = [[[0, 1], [0, 1], [0, 1], [0, 1] ],
                    [[0, 1], [0, 1]],
                    [[0, 1], ] ]

// need to fix height, width computations.

// var dummymatches = [[[0, 1], [0, 1], ],
//                     [[0, 1], ]]

var dummymatches = [[[0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1], [0, 1] ],
                    [[0, 1], [0, 1], [0, 1], [0, 1] ],
                    [[0, 1], [0, 1]],
                    [[0, 1], ]]

var RoundRobinPage = React.createClass({
  getDefaultProps: function() {
    return (
      {
        matches: dummymatches,
      }
    )
  },

  getInitialState: function() {
    
    return {
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

      <View style={styles.bracket_container}>
      <Bracket matches={dummymatches}
                  navigator={this.props.navigator} />

      </View>
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
  },
  bracket_container: {
    height: 555 * _cvals.dscale,
    width: windowSize.width - 4,
    borderWidth: 0,
    borderColor: 'black'
  }
})

module.exports = RoundRobinPage;
