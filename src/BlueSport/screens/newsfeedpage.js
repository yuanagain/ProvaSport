'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var MatchList = require('../bigparts/matchlist')
var Header = require('../parts/header')
var _cvals = require('../styles/customvals')
let _cstyles = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ListView,
  RefreshControl,
} = React;

var data = ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6',
            'row 7', 'row 8', 'row 9',]

var NewsFeedPage = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      isRefreshing: false,
    };
  },
  getDefaultProps: function() {
    return (
      {
        data: data
      }
    )
  },
  render: function() {
    var {
      name,
      ...props
    } = this.props;

    return (
    <View style={styles.container}>

    <Header title={"NEWS"} navigator={this.props.navigator} />

      <MatchList
        navigator={this.props.navigator}
        data={this.props.data}
      />

      <View style={styles.divider_line}>
      </View>
    </View>
    );
  },

  goBack: function() {
    this.props.navigator.pop()
  },
})

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

module.exports = NewsFeedPage;
