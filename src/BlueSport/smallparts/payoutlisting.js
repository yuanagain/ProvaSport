'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')
import * as _ctools from '../libs/customtools.js'

var PayoutSection = require('../smallparts/payoutsection')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;

var PayoutListing= React.createClass({
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
        earnings: {'sport': {'cash': 0, 'xp': 0, 'trophies': []} },
      }
    )
  },
  render: function() {
    var {
      earnings,
      ...props
    } = this.props;

    var rows = [];
    for (var key in this.props.earnings) {
        rows.push( <PayoutSection
                        title={'\t' + key}
                        mode={'plus'}
                        earnings={this.props.earnings[key]}
                        key={_ctools.randomKey()} />);
    }
    return (
      <View style={[styles.container, ,]}>
        {rows}
      </View>
    )
  }
});

var styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0,
    width: windowSize.width
  },
})

module.exports = PayoutListing;
