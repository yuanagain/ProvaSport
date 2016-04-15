'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 ;

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Player from '../modules/player'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Navigator,
  TouchableOpacity,
} = React;


var PlayerSquare = React.createClass({

  onPress: function() {
    // var ProfilePage = require('../screens/profilepage')
    // this.props.navigator.push({
    //   id: "ProfilePage" + String(_ctools.randomKey()),
    //   component: ProfilePage,
    //   passProps: {
    //     navigator: this.props.navigator,
    //     playerid: this.props.playerid
    //   }
    // })
  },

  getInitialState: function() {
    return (
      {
        player: Player.default_player,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerid: -1,
      }
    )
  },
  render: function() {
    var {
      playerid,
      navigator,
      ...props
    } = this.props;

    if (this.state.loaded == false) {
      return (<View></View>)
    }

    return (
      <TouchableOpacity style={styles.playersquare}
                        onPress={() => this.onPress()}>
        <TouchableOpacity style={[styles.icon, ]}>
          <Image style={styles.im}
                 source={{uri: this.state.player.prof_pic}}/>
          <Text style={[_cstyles.standard_text]}>
            {_ctools.getInitials(this.state.player)}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },

  fetchPlayer: function(data) {
    this.setState({loaded : true})
    this.setState({player : data})
    
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = StyleSheet.create({
  playersquare: {
    height: _cvals.slength,
    width: _cvals.slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginRight: 4 * _cvals.dscale,
  },
  left:{
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {

  },
  icon: {
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compress: {
    marginTop: _cvals.dscale * -4
  }
});

module.exports = PlayerSquare;
