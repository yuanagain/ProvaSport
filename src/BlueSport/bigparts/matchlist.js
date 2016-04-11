'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

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
    return {
      matches: []
    };
  },
  getDefaultProps: function() {
    return (
      {
        matches: [0, 1]
      }
    )
  },
  render: function() {

    var {
      matches,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.matches),
    return (
      <ListView
        dataSource={dataSource}
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
  header_container: {
    // height: windowSize.height * 6 / 10,
    width: windowSize.width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    height: 40,
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
