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
  ListView,
  RefreshControl,
  Platform,
} = React;

var MatchList = React.createClass({
  getInitialState: function() {
    return {
      isRefreshing: false,
      matches: []
    };
  },
  getDefaultProps: function() {
    return (
      {
      }
    )
  },

  render: function() {

    var {
      matches,
      onRefresh,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.matches)

    return (
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor={'white'}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            backgroundColor={(Platform.OS === 'ios') ? _cvals.skorange : 'white'}
          />
        }
        dataSource={dataSource}
        renderRow={this.renderMatchRow}
        style={styles.listView}
      />
    );
  },


  onRefresh: function() {
    // TODO refresh cached player object, pull list of matches

    this.setState({isRefreshing: true})
    if (this.props.onRefresh) {
      this.props.onRefresh()
    }
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, _cvals.timeout);
  },

  goBack: function() {
    this.props.navigator.pop()
  },

  renderMatchRow(rowData) {
    return (
        <MatchRow
        matchid={rowData}
        navigator={this.props.navigator} />
    )
  },

  componentDidMount() {

  }
});


var MatchList_Player = React.createClass({
  getInitialState: function() {
    return {
      entity: {
        matches: this.props.matches
      }
    };
  },
  getDefaultProps: function() {
    return (
      {
        matches: []
      }
    )
  },
  render: function() {

    var {
      matches,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.state.entity.matches)

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
        matchid={rowData}
        navigator={this.props.navigator} />
    )
  },
});

var styles = StyleSheet.create({
  listView: {
    backgroundColor: 'transparent',
    flex: 1,
  }
})

module.exports = MatchList;
