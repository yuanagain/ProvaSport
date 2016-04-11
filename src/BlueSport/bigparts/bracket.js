'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

var PlayerBrick = require('../parts/playerbrick')

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

var defaultHeight = _cvals.slength / 2 * _cvals.dscale + 1
// ==================================================
// Style up first for visibility to getDefaultProps
// ==================================================

var styles = StyleSheet.create({
  scroll: {
    flexDirection: 'column',
    flex: 1,
    padding: 15 * _cvals.dscale,
    width: windowSize.width,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 1,
  },
  fork_wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 0,
    flex: 1,
  },
  fork: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 1,
  },
  vline_wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: 1,
    alignSelf: 'flex-end',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  hline: {
    width: _cvals.bricklength,
    flex: 1,
  },
  vline: {
    //marginVertical: 1
    flex: 1,
  }
})

// ==================================================
//
// ==================================================

var Fork = React.createClass({
  getInitialState: function() {
    var fmargin = defaultHeight * (Math.pow(3, (this.props.level - 1))) / 2
    var fheight = defaultHeight  * (Math.pow(2, (this.props.level)))

    if (this.props.level == 0) {
      fmargin = 0
    }

    return (
      {
        type: this.props.data['type'],
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        style: styles.scroll,
        level: 0,

      }
    )
  },

  render: function() {
    var {
      data,
      level,
      navigator,
      ...props
    } = this.props;

    return (
      <View style={[styles.fork_wrapper, {marginVertical: 0}]}>
        <TouchableOpacity style={[styles.fork, ]}>
          <View style={[{marginVertical: this.state.fmargin}]}>
            <PlayerBrick player={this.state.match['team1']}
                         navigator={this.props.navigator} />
            <View style={[_cstyles.hline, styles.hline]}></View>
          </View>
          <View style={[{marginVertical: this.state.fmargin}]}>
            <PlayerBrick player={this.state.match['team2']}
                         navigator={this.props.navigator} />
            <View style={[_cstyles.hline, styles.hline]}></View>
          </View>
        </TouchableOpacity>
        <View style={styles.vline_wrapper}>
          <View style={[_cstyles.vline,
                        {height: this.state.fheight,
                         marginBottom: this.state.fmargin,
                         marginLeft: 0}]}>
          </View>
        </View>
      </View>
    )
  }
});

var ForkColumn = React.createClass({
  render: function() {
    var {
      column,
      navigator,
      level,
      ...props
    } = this.props;

    var forks = [];
    for (var i = 0; i < this.props.column.length; i++) {
      forks.push(<Fork navigator={this.props.navigator}
                       level={this.props.level}

                       data={this.props.column[i]}
                       key={i} />);
    }
    return (
      <View style={styles.column}>
        {forks}
      </View>
    )
  }
})

var Bracket = React.createClass({

  getInitialState: function() {
    return (
      {
        mode: 'normal',
        matches: this.props.matches,
        scrollstyle: styles.scroll,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        style: styles.scroll,
      }
    )
  },

  render: function() {
    var {
      matches,
      style,
      ...props
    } = this.props;

    var tslength = _const.slength + 2 * _cvals.dscale
    var height = Math.pow(2, this.props.matches.length) * (_const.slength + 2)
    var width = _cvals.bricklength * (this.state.matches.length + 1) + 20

    var columns = [];
    for (var i = 0; i < this.props.matches.length; i++) {
        columns.push(<ForkColumn navigator={this.props.navigator}
                        level={i}

                        column={this.props.matches[i]}
                        key={i} />);
    }

    return (
      <View style={[this.props.style, ]}>
        <ScrollView style={[{}]}
                    contentContainerStyle={[styles.container,
                                            {width: width, }]}>

          {columns}
          <Final data={{'team1': 'WINNER'}}
                 level={this.props.matches.length}
                 marginBottom={height / 2}
                 navigator={this.props.navigator} />
        </ScrollView>
      </View>
    );
  },
});

var Final = React.createClass({
  getInitialState: function() {
    // TODO: CHECK MATH HERE
    var fmargin = defaultHeight * (Math.pow(3, (this.props.level - 1))) / 2 * 3/ 4
    var fheight = defaultHeight  * (Math.pow(2, (this.props.level)))

    if (this.props.level == 0) {
      fmargin = 0
    }

    return (
      {
        type: this.props.data['type'],
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        style: styles.scroll,
        level: 0,

      }
    )
  },

  render: function() {
    var {
      data,
      level,
      marginBottom,
      navigator,
      ...props
    } = this.props;

    return (
      <View style={[styles.fork_wrapper, {marginRight: 16 * _cvals.dscale}]}>
        <TouchableOpacity style={[styles.fork, {marginLeft: 1}]}>
          <View style={[{marginTop: this.state.fmargin}]}>
            <PlayerBrick player={this.state.match['team1']}
                         navigator={this.props.navigator} />
            <View style={[_cstyles.hline, styles.hline, ]}></View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
});



module.exports = Bracket;
