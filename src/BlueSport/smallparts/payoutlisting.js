'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')
import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;

var PayoutSection= React.createClass({
  getInitialState: function() {
    var plus = ''
    if (this.props.mode == 'plus') {
      plus = '+'
    }
    return (
      {
        plus: plus
      }
    );
  },
  getDefaultProps() {
    return (
      {
        earnings: {'cash': 0, 'xp': 0, 'trophies': []},
        mode: 'total',
        title: '',
      }
    )
  },
  render: function() {
    var {
      earnings,
      mode,
      title,
      ...props
    } = this.props;

    var row = [];
    for (var i = 0; i < this.props.score.length; i++) {
        columns.push(<ForkColumn navigator={this.props.navigator}
                        level={i}

                        column={this.props.matches[i]}
                        key={i} />);
    }

    return (
      <View style={[styles.container, ,]}>
      </View>
});

var styles = StyleSheet.create({
  values: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: windowSize.width / 3,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: windowSize.width / 3 - 1 * _cvals.stdmargin,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0,
    paddingRight: _cvals.stdmargin,
    width: windowSize.width
  },
})

module.exports = PayoutSection;
