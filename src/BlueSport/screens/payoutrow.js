'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;

// SHARED FORMATTING.
// TODO: make univeral
var lightgreen = "#7ED321"
var mainfont = 'avenir'
var skblue = '#4A90E2'


var PayoutRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0
      }
    );
  },
  render: function() {
    var {
      row_name,
      payouts,
      ...props
    } = this.props;

    return (
      <View style={[styles.columns_container, {marginTop: -15},]}>
        <View style={[styles.column_l_l, {marginHorizontal: 20, width: windowSize.width / 2 - 45}]}>
          <Text style={styles.value_text}>
            {this.props.row_name}
          </Text>
        </View>
        <View style={styles.column_r_r}>

          <Text style={[styles.value_text, {color: lightgreen}]}>
            {'$' + String(this.props.payouts[0])}
          </Text>

          <Text style={[styles.value_text, {color: skblue}]}>
            {'\t' + String(this.props.payouts[1]) + ' EXP'}
          </Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  value_text: {
    color: 'black',
    fontSize: 20,
    fontFamily: mainfont,
    padding: 10,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  column_l_l: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
})

module.exports = PayoutRow;
