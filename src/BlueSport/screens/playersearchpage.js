'use strict';

/*
This page implements a UI for a search for player
*/

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')
var Header = require('../parts/header')
var WideButton = require('../smallparts/widebutton')
var TextField = require('../smallparts/textfield')
import * as Player from '../modules/player'

var {
  AppRegistry,
  StyleSheet,
  View,
  Platform,
  Text,
  TextInput,
  ListView,
  Image
} = React;

var PlayerSearchPage = React.createClass({
  getInitialState: function() {
    return (
      {
        players: [],
        searching: false,
        query: ""
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        
      }
    )
  },
  render: function() {
    var {
      navigator,
      ...props
    } = this.props;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(this.state.players)

    return (
    <View style={styles.container}>
      <View>
        <Header title={"SEARCH"}
                mode={'nav'}
                navigator={this.props.navigator} />

        <View style={_cstyles.buttons_container}>
          <TextInput
            value={this.props.value}
            style={[styles.input, _cstyles.standard_text]}
            placeholder={"Player name, email, etc."}
            underlineColorAndroid='rgba(0,0,0,0)' 
            secureTextEntry={false}
            autoCorrect={false}
            maxLength={100}
            keyboardType={'default'}
            onChangeText={(query) => this.setState({query})}
            onEndEditing={()=>this.search()}
            onSubmitEditing={()=>this.search()}
          />
          <View style={_cstyles.blue_divider_line}>
          </View>

          <ListView style={styles.list_container}
                    renderRow={this.renderRow}
                    dataSource={dataSource}>
          </ListView>
        </View>
      </View>
    </View>
    );
  },

  search: function() {
    // don't initiate two searches
    if (this.state.searching == false) {
      return
    }
    // don't search empty input
    if (this.state.query.length == 0) {
      return
    }
    this.setState({searching: true})
    console.log("searching")
  },

  update: function() {
    this.setState({searching: false})
  },

  renderRow: function(playerid) {
    var PlayerRow = require('../smallparts/playerrow')

    return(
      <View>
        <PlayerRow playerid={playerid}
                 navigator={this.props.navigator} />
        <View style={_cstyles.section_divider_line}></View>
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

    // TODO fetch recently searched
  },

  componentWillReceiveProps: function(nextProps) {
    // Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  list_container: {
    width: windowSize.width,
    flexDirection: 'column',

    // TODO BOUND HEIGHT HERE
    flex: 1,
  },
  input: {
    height: 50 * _cvals.dscale,
    fontSize: _cvals.standard_text,
    padding: (Platform.OS === 'ios') ? 10 * _cvals.dscale : 0
  },
})

module.exports = PlayerSearchPage;
