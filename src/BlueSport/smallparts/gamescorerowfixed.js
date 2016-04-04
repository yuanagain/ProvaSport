'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} = React;

var leftMargin = 50 * _cvals.dscale;
var rowWidth = windowSize.width * 0.85 - leftMargin;
var rowHeight= 32 * _cvals.dscale;

var GameScoreRow_fixed = React.createClass({

  render: function() {
    var {
      index,
      val1,
      val2,
      ...props
    } = this.props;

    return (

      <View style={styles.container}>
        <View style={[styles.leftmost, styles.left,]}>
          <Text style={[_cstyles.standard_text, ]}>
            {"Game "}
          </Text>
        </View>

        <View style={[styles.center, styles.val1_container]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {this.props.val1}
          </Text>
        </View>

        <View style={[styles.middle, styles.center]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {'-'}
          </Text>
        </View>

        <View style={[styles.center, styles.val2_container]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {this.props.val2}
          </Text>
        </View>

      </View>
    );
  },
  onIconPress: function() {
    // this.props.onIconPress()
  }
});

var styles = StyleSheet.create({
  container: {
    marginLeft: leftMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: rowWidth,
    height: rowHeight,

  },
  input: {

    height: rowHeight * 0.8,
    width: 40 * _cvals.dscale,
    borderColor: 'gray',
    borderWidth: 0.5
  },
  left: {
    justifyContent: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftmost: {
    width: rowWidth * 5 / 10,
    justifyContent: 'center'
  },
  val1_container: {
    width: rowWidth * 1.5 / 10,
    alignItems: 'center'
  },
  middle: {
    width: rowWidth * .5 / 10,
    alignItems: 'center'
  },
  val2_container: {
    width: rowWidth * 1.5 / 10,
    alignItems: 'center'
  },
  rightmost: {
    width: rowWidth * 1.5 / 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

module.exports = GameScoreRow_fixed;
