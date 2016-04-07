'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _MatchDefault = require('../modules/match')
import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} = React;

var MatchRow = React.createClass({

  getInitialState: function() {
    return (
      {

      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        match:
      }
    )
  },
  render: function() {
    var {
      match,
      navigator,
      ...props
    } = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.onPress}
                          style={styles.container}>
          <View style={styles.player_row}>
            <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                   style={styles.pic} />

            <View style={styles.name}>
              <Text style={_cstyles.standard_text}>
                {this.props.match['Team1']}
              </Text>
            </View>
            <View style={styles.scores}>
              {this.props.match['scores'].map(createScoreRowTop)}
            </View>
          </View>

          <View style={styles.player_row}>
            <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                   style={styles.pic} />

            <View style={styles.name}>
              <Text style={_cstyles.standard_text}>
                {this.props.match['Team2']}
              </Text>
            </View>
            <View style={styles.scores}>
              {this.props.match['scores'].map(createScoreRowBottom)}
            </View>
          </View>

          <View style={styles.details}>
            <Text style={_cstyles.light_text}>
            /*

            INSERTED CODE Date Location

             */
              {this.state.match.}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={_cstyles.divider_line}></View>
      </View>
    )
  },

  onPress: function() {
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(_ctools.randomKey()),
      component: MatchPage,
      passProps: {
        match: this.props.match,
        navigator: this.props.navigator
      }
    })
  },
})

var Score = React.createClass({
  render: function() {
    var style = {}
    if (this.props.win == false) {
      style = {fontWeight: 'bold', opacity: 0.5}
    }
    return (
      <View style={styles.score}>
        <Text style={[_cstyles.detail_text,
                      _cstyles.centeredText,
                      style]}>
          {this.props.val}
        </Text>
      </View>
    );
  }
});

var createScoreRowTop = function(score, i) {
  return (
    <Score key={i} val={score[0]} win={(score[0] > score[1])}/>
  )
}

var createScoreRowBottom = function(score, i) {
  return (
    <Score key={i} val={score[0]} win={(score[0] < score[1])}/>
  )
}
var picslength = _cvals.dscale * 30

var styles = StyleSheet.create({
  container: {
    width: windowSize.width,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: _cvals.dscale * 8,
    paddingBottom: _cvals.dscale * 4,
  },
  player_row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: _cvals.dscale * 4
  },
  name: {
    paddingHorizontal: 10,
    width: windowSize.width * 2 / 5,
  },
  scores: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: windowSize / 3,
  },
  score: {
    width: picslength
  },
  pic: {
    height: picslength,
    width: picslength,
    borderRadius: picslength / 2
  },
  details: {
    marginTop: _cvals.dscale * 2,
    marginBottom: _cvals.dscale * -3,
    marginLeft: picslength * 1.35
  }
})

module.exports = MatchRow;
