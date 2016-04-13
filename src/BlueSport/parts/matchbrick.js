'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Match from '../modules/match'
var TeamBrick = require('../parts/teambrick')

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


var MatchBrick = React.createClass({

  onPress: function() {
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(_ctools.randomKey()),
      component: MatchPage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.props.matchid
      }
    })
  },

  getInitialState: function() {
    return (
      {
        match: Match.default_match,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        matchid: -1,
      }
    )
  },
  render: function() {
    var {
      matchid,
      navigator,
      ...props
    } = this.props;

    return (
        <TouchableOpacity onPress={this.onPress}>
          <TeamBrick teamid={_ctools.getWinner(this.state.match)}
                     navigator={this.props.navigator}
                     disabled={true} />
          <View style={styles.scores}>
            <Text style={_cstyles.detail_text}>
              {_ctools.getScoreString(this.state.match)}
            </Text>
          </View>
        </TouchableOpacity>
    );
  },

  fetchMatch: function(data) {
    this.state.match = data
    this.setState({loaded : true})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)
  },

  componentWillReceiveProps: function(nextProps) {
    Match._GetMatch(nextProps.matchid, this.fetchMatch)
  },
});

var styles = StyleSheet.create({
  scores: {
    height: 20 * _cvals.dscale,
    marginBottom: -20 * _cvals.dscale,
    paddingLeft: 5 * _cvals.dscale
  },
  matchbrick: {
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

module.exports = MatchBrick;
