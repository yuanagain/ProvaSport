'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
import * as _ctools from '../libs/customtools.js'

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
var iconWidth = windowSize.width * 1.5 / 10
var rowWidth = windowSize.width * .85 - leftMargin;
var rowHeight= 32 * _cvals.dscale;

var GameScoreRowAdd_subco = React.createClass({
  getInitialState: function() {
    return (
      {
        val1: this.props.val1,
        val2: this.props.val2
      }
    )
  },
  render: function() {
    var {
      harvest,
      ...props
    } = this.props;

    return (
      <View style={styles.big_container}>
        <View style={styles.container}>
          <View style={[styles.leftmost, styles.left,]}>
            <Text style={[_cstyles.standard_text, ]}>
              {"Add Game"}
            </Text>
          </View>

          <View style={[styles.val1_container, styles.center, ]}>
            <TextInput
              style={[_cstyles.standard_text, _cstyles.centeredText, styles.input]}
              onChangeText={(val1) => this.setState({val1})}
              value={this.state.val1}
            />
          </View>

          <View style={[styles.middle, styles.center]}>
            <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
              {'-'}
            </Text>
          </View>

          <View style={[styles.val2_container, styles.center]}>
            <TextInput
              style={[_cstyles.standard_text, _cstyles.centeredText, styles.input]}
              onChangeText={(val2) => this.setState({val2})}
              value={this.state.val2}
            />
          </View>



        </View>
        <View style={[styles.rightmost, styles.center]}>
          <TouchableOpacity onPress={this.onIconPress}>
            <Image source={require('../assets/add.png')} style={_cstyles.add} />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
  onIconPress: function() {
    if (_ctools.isValidScore(this.state.val1)
        && _ctools.isValidScore(this.state.val2)) {
      this.props.harvest([this.state.val1, this.state.val2])
      this.setState({val1: null, val2: null})
      console.log('is numeric')
    }
  }
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var styles = StyleSheet.create({
  big_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginLeft: leftMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: rowWidth,
    height: rowHeight,
  },
  input: {
    height: rowHeight * 0.7,
    width: 39 * _cvals.dscale,
    borderColor: 'gray',
    borderWidth: 1,
    alignSelf: 'center'
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
  },
  middle: {
    width: rowWidth * 0.5 / 10,
  },
  val2_container: {
    width: rowWidth * 1.5 / 10,
  },
  rightmost: {
    width: iconWidth,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

module.exports = GameScoreRowAdd_subco;
