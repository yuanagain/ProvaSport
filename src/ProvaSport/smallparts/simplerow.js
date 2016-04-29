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
  TouchableOpacity,
} = React;

var SimpleRow= React.createClass({
  getInitialState: function() {
    return (
      {

      }
    );
  },
  getDefaultProps() {
    return (
      {
        title: 'Title',
        value: 'Value'
      }
    )
  },
  render: function() {
    var {
      title,
      value,
      onPress,
      ...props
    } = this.props;

    var value = String(this.props.value)
    if (value.length > 16) {
      value = value.slice(0, 16) + '...'
    }

    return (
      <View style={[styles.container,]}>
        <View style={styles.title}>
          <Text style={[_cstyles.header_text,
                        {fontWeight: 'normal'}]}>
            {this.props.title + ' '}
          </Text>
        </View>

        <TouchableOpacity
            style={styles.values}
            onPress={this.props.onPress}>
          <Text style={[_cstyles.header_text,
                        {color: _cvals.skblue, fontWeight: 'normal'}]}>
            {value  + ' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  values: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    //width: windowSize.width / 2 - _cvals.stdmargin,
    flex: .5,
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    //width: windowSize.width / 2,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0,
    alignItems: 'center',
    paddingRight: _cvals.stdmargin,
    width: windowSize.width
  },
})

module.exports = SimpleRow;
