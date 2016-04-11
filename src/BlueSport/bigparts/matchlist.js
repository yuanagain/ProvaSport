'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var Header = require('../parts/header')
var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

var MatchRow = require('../parts/matchrow')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView
} = React;

var MatchList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.data),
    };
  },
  getDefaultProps: function() {
    return (
      {
        data: ['row 1', 'row 2', 'row 3', 'row 4',]
      }
    )
  },
  render: function() {

    var {
      data,
      ...props
    } = this.props;

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMatchRow}
        style={styles.listView}
      />
    );
  },

  goBack: function() {
    this.props.navigator.pop()
  },

  renderMatchRow(rowData) {
    return (
        <MatchRow
        navigator={this.props.navigator} />
    )
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    opacity: 1.00,
    marginTop: 0,
  },
  section_container: {
    width: windowSize.width,
    backgroundColor: 'transparent',
    opacity: 1.0,
  },
  listView: {
    backgroundColor: 'transparent',
  }
})

module.exports = MatchList;
