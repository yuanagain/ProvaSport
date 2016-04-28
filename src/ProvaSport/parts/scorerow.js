'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var _cvals = require('../styles/customvals')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;

var ScoreRow = React.createClass({
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
          <Text style={styles.value_text}>
            {String(this.props.scores[0]) + '\t - \t' + String(this.props.scores[1])}
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
    fontFamily: _cvals.mainfont,
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

module.exports = ScoreRow;
