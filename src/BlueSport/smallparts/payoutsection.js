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

    return (
      <View style={[styles.container, ,]}>
        <View style={styles.title}>
          <Text style={[_cstyles.header_text,
                        {alignSelf: 'flex-start', fontWeight: 'normal'}]}>
            {this.props.title  + ' '}
          </Text>
        </View>

        <View style={styles.values}>
          <Text style={[_cstyles.standard_text,
                       {color: _cvals.sklightgreen, fontWeight: 'bold',
                        paddingVertical: _cvals.stdmargin / 2}]}>
            {this.state.plus + '$'
              + String(this.props.earnings['cash'])}
          </Text>
        </View>

        <View style={styles.values}>

          <Text style={[_cstyles.standard_text,
                       {color: _cvals.skblue, fontWeight: 'normal',
                        paddingVertical: _cvals.stdmargin / 2}]}>
            {'\t' + this.state.plus +
              +String(this.props.earnings['xp']) + ' XP'}
          </Text>

        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  values: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: windowSize.width / 3,
    paddingRight: _cvals.stdmargin,
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
