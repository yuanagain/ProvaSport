'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var PlayerBrick = require('../parts/playerbrick')

import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} = React;

var TeamRow = React.createClass({
  getDefaultProps: function() {
    return (
      {
        team: ['Player 1', 'Player 2', 'Player 3']
      }
    )
  },

  createPlayerBricks: function(player, i) {
    // TODO Somehow navigator is not being passed.
    return (
      <PlayerBrick key={i} player={player}
          navigator={this.props.navigator} />
    )
  },

  render: function() {
    var {
      team,
      navigator,
      ...props
    } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}
                        style={styles.container}>
        <ScrollView style={styles.scroll}
          contentContainerStyle={[styles.content,
                  {width: (_cvals.bricklength + 10) * this.props.team.length,}]}>

          {this.props.team.map(this.createPlayerBricks)}
        </ScrollView>
      </TouchableOpacity>

    )
  },
});

var picslength = _cvals.dscale * 30

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: _cvals.dscale * 4,
  },
  scroll: {
    height: _cvals.brickheight + 12 * _cvals.dscale,
    width: windowSize.width,
  },
  content: {
    height: _cvals.brickheight,
    paddingLeft: 8 * _cvals.dscale,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  }
})

module.exports = TeamRow;
