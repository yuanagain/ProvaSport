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
  TouchableOpacity,
  Platform,
} = React;

var slength = _cvals.slength

var RRMatchSquare = React.createClass({
  getInitialState: function() {
    return (
      {
      }
    );
  },
  render: function() {
    var {
      data,
      navigator,
      ...props
    } = this.props;
    if (this.props.data['type'] == 'match') {
      var ScoreSquare = require('../smallparts/scoresquare')
      return (
        <View style={[styles.match, styles.border]}>
          <ScoreSquare matchid={this.props.data['item']}
                       navigator={this.props.navigator} />
        </View>
      )
    }
    if (this.props.data['type'] == 'icon') {
      var TeamSquare = require('../parts/teamsquare')
      return (
        <TouchableOpacity style={[styles.icon, ]}>
          <TeamSquare teamid={this.props.data['item']}
                        navigator={this.props.navigator} />
        </TouchableOpacity>
      )
    }
    if (this.props.data['type'] == "empty") {
      return (
      <TouchableOpacity style={[styles.match, styles.border]}
                        onPress={() => this.onPress()}>
        <TouchableOpacity style={[styles.icon, ]}>
          <Text style={[_cstyles.standard_text]}>
            {""}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      )
    }
    if (this.props.data['type'] == 'player') {
      var PlayerBrick = require('../parts/playerbrick')
      return (
        <TouchableOpacity style={[styles.player, styles.border]}>
          <PlayerBrick playerid={this.props.data['item']}
                       navigator={this.props.navigator} />
        </TouchableOpacity>
      )
    }
    if (this.props.data['type'] == 'team') {
      var TeamBrick = require('../parts/teambrick')
      return (
        <TouchableOpacity style={[styles.player, styles.border]}>
          <TeamBrick teamid={this.props.data['item']}
                       navigator={this.props.navigator} />
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity style={[styles.match, ]}>

      </TouchableOpacity>
    )
  }
});

var RRMatchRow = React.createClass({
  render: function() {
    var {
      matchrow,
      navigator,
      ...props
    } = this.props;
    var renderMatch = (data) => <RRMatchSquare navigator={this.props.navigator}
                                                data={data}
                                                key={_ctools.randomKey()} />;
    return (
      <View style={styles.matchrow}>
        {this.props.matchrow.map(renderMatch)}
      </View>
    )
  }
})

var RoundRobin = React.createClass({

  getInitialState: function() {
    return (
      {
        mode: 'normal',
        scrollstyle: styles.scroll,
      }
    );
  },

  render: function() {
    var {
      matches,
      style,
      ...props
    } = this.props;

    var tslength = slength + 2 * _cvals.dscale
    var height = this.props.matches.length * tslength
    var width = height + tslength * 1.5

    var renderRow = (matchrow) => <RRMatchRow navigator={this.props.navigator}
                                              matchrow={matchrow}
                                              key={_ctools.randomKey()} />;
    if (Platform.OS === 'ios') {
        return (
          <View>
            <ScrollView style={[styles.scroll,
                                {width: windowSize.width },
                                this.props.style]}
                        contentContainerStyle={[styles.container,
                                                {width: width, height: height}]}
                        >
                {this.props.matches.map(renderRow)}
            </ScrollView>
          </View>
        );
    }
    else {
        return (
          <View>
            <ScrollView>
              <ScrollView style={[styles.scroll,
                                  {width: windowSize.width },
                                  this.props.style]}
                          contentContainerStyle={[styles.container,
                                                  {width: width, height: height}]}
                          horizontal={true}>
                  {this.props.matches.map(renderRow)}
              </ScrollView>
            </ScrollView>
          </View>
        );
    }
  },
});

var styles = StyleSheet.create({

  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    opacity: 1.00,
    margin: 1,
  },
  match: {
    height: slength,
    width: slength,
    marginHorizontal: 1,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: slength,
    width: slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  player: {
    height: slength,
    width: 2.5 * slength,
    marginHorizontal: 1,
    justifyContent: 'center',
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
})

module.exports = RoundRobin;
