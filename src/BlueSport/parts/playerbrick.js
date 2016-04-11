'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'

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


var PlayerBrick = React.createClass({

  onPress: function() {
    var ProfilePage = require('../screens/profilepage')
    this.props.navigator.push({
      id: "ProfilePage" + String(_ctools.randomKey()),
      component: ProfilePage,
      passProps: {
        navigator: this.props.navigator
      }
    })
  },

  render: function() {
    var {
      player,
      navigator,
      ...props
    } = this.props;

    return (
      <TouchableOpacity style={styles.playerbrick}
                        onPress={() => this.onPress()}>
        <View style={[styles.center, styles.left]} >
          <Image style={styles.im}
                 source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
        </View>
        <View style={styles.right}>
          <View >
            <Text style={[_cstyles.detail_text]}>{this.props.player}</Text>
          </View>
          <View style={styles.compress}>
            <Text style={[_cstyles.detail_text]}>{"Last Name"}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
});

var styles = StyleSheet.create({
  playerbrick: {
    height: _cvals.brickheight,
    width: _cvals.bricklength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 4,
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

module.exports = PlayerBrick;
