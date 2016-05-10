'use strict';

/*
This page lists all friends of a given player
*/


var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
import * as Player from '../modules/player'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  ListView,
  Image
} = React;

var FriendsPage = React.createClass({
  getInitialState: function() {
    return (
      {
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        following: [0]
      }
    )
  },
  render: function() {
    var {
      navigator,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.props.following)

    return (
    <View>
      <Header title={"Friends"}
              mode={'nav'}
              navigator={this.props.navigator} />

      <ListView style={styles.container}
                renderRow={this.renderRow}
                dataSource={dataSource}>
      </ListView>
    </View>
    );
  },

  renderRow: function(playerid) {
    var PlayerRow = require('../smallparts/playerrow')

    return(
      <View>
        <PlayerRow playerid={playerid}
                 navigator={this.props.navigator} />
        <View style={_cstyles.section_divider_line}/>
      </View>
    )
  },

  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  onRefresh: function() {
    this.setState({isRefreshing: true})
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, _cvals.timeout);
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    // Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    // Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    // TODO BOUND HEIGHT HERE
    flex: 1,
    height: windowSize.height - 120 * _cvals.dscale
  },
  matches: {
    height: 200 * _cvals.dscale
  }
})

module.exports = FriendsPage;
