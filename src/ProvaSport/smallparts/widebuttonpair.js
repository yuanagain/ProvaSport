'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} = React;

var WideButtonPair = React.createClass({
  getDefaultProps: function() {
    return (
      {
        isDisabled: false
      }
    )
  },

  render: function() {
    var {
      textRight,
      textLeft,
      onPressRight,
      onPressLeft,
      isDisabled,
      ...props
    } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.buttonLeft, this.canConfirm()]}
          onPress={this.props.onPressLeft}>
          <View>
            <Text style={styles.buttonText}> {this.props.textLeft} </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonRight, this.canConfirm()]}
          onPress={this.props.onPressRight}>
          <View>
            <Text style={styles.buttonText}> {this.props.textRight} </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  },

  // used to hide button
  canConfirm: function() {
    if (this.props.mode == "isDisabled") {
      return {height: 0, opacity: 0.0}
    }
    return {}
  },
});

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonLeft: {
    backgroundColor: 'grey',
    width: windowSize.width / 2,
    shadowRadius: 4 * _cvals.dscale,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1},
    padding: 5 * _cvals.dscale,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRight: {
    backgroundColor: _cvals.skorange,
    width: windowSize.width / 2,
    shadowRadius: 4 * _cvals.dscale,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1},
    padding: 5 * _cvals.dscale,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30 * _cvals.dscale,
    fontFamily: 'avenir',
    fontWeight: 'bold',
  },
})

module.exports = WideButtonPair;