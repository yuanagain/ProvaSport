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
} = React;



var slength = _cvals.slength

var RRMatchSquare = React.createClass({
  getInitialState: function() {
    return (
      {
        type: this.props.data['type'],
        item: this.props.data['item'],
      }
    );
  },
  render: function() {
    var {
      data,
      navigator,
      ...props
    } = this.props;
    if (this.state.type == 'match') {
      var ScoreSquare = require('../smallparts/scoresquare')
      return (
        <TouchableOpacity style={[styles.match, styles.border]}>
          <ScoreSquare matchid={this.state.item}
                       navigator={this.props.navigator} />
        </TouchableOpacity>
      )
    }
    if (this.state.type == 'icon') {
      var PlayerSquare = require('../parts/playersquare')
      return (
        <TouchableOpacity style={[styles.icon, ]}>
          <PlayerSquare playerid={this.state.item}
                        navigator={this.props.navigator} />
        </TouchableOpacity>
      )
    }
    if (this.state.type == "empty") {
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
    if (this.state.type == 'player') {
      var PlayerBrick = require('../parts/playerbrick')
      console.log("======")
      console.log(this.state.item)
      return (
        <TouchableOpacity style={[styles.player, styles.border]}>
          <PlayerBrick playerid={this.state.item}
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
        matches: this.props.matches,
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
    var height = this.state.matches.length * tslength
    var width = height + tslength * 1.5

    var renderRow = (matchrow) => <RRMatchRow navigator={this.props.navigator}
                                              matchrow={matchrow}
                                              key={_ctools.randomKey()} />;

    return (
      <View>
        <ScrollView style={[styles.scroll,
                            {width: windowSize.width },
                            this.props.style]}
                    contentContainerStyle={[styles.container,
                                            {width: width, height: height}]}>
            {this.state.matches.map(renderRow)}
        </ScrollView>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  scroll: {

  },
  playersquare: {
    height: _cvals.slength,
    width: _cvals.slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

module.exports = RoundRobin;
