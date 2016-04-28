'use strict';
var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

var TeamBrick = require('../parts/teambrick')
var MatchBrick = require('../parts/matchbrick')

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
  RefreshControl,
} = React;

var defaultHeight = _cvals.slength / 2 * _cvals.dscale + 1


// ==================================================

var fork_styles = StyleSheet.create({
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
    backgroundColor: 'black',
    height: 1,
  },
  vline: {
    //marginVertical: 1
    flex: 1,
    backgroundColor: 'black',
    width: 1,
  },
});


var getForkMargin = function(level) {
  var mult = 0;
  for (var i = 0; i < level; i++) {
    mult += Math.pow(2, i - 1)
  }
  return mult * (_cvals.brickheight + 1)
}

var getForkHeight = function(level) {
  return Math.pow(2, level) * (_cvals.brickheight + 1) + 1
}

// ==================================================

var Fork = React.createClass({
  getInitialState: function() {
    // var fmargin = defaultHeight * (Math.pow(3, (this.props.level - 1))) / 2
    // var fheight = defaultHeight  * (Math.pow(2, (this.props.level)))
    var fmargin = getForkMargin(this.props.level)
    var fheight = getForkHeight(this.props.level)

    return (
      {
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
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

    var bricks = []
    for (var i = 0; i < 2; i++) {
      if (this.props.level == 0) {
        bricks.push(
          <TeamBrick teamid={this.props.data[i]}
                     navigator={this.props.navigator} />
          )
      }
      else {
        bricks.push(
         <MatchBrick matchid={this.props.data[i]}
                     navigator={this.props.navigator} />
        )
      }
    }

    return (
      <View style={[fork_styles.fork_wrapper, {marginVertical: 0}]}>
        <View style={[fork_styles.fork, ]}>
          <View style={[{marginVertical: this.state.fmargin}]}>
            {bricks[0]}
            <View style={[fork_styles.hline]}></View>
          </View>
          <View style={[{marginVertical: this.state.fmargin}]}>
            {bricks[1]}
            <View style={[fork_styles.hline]}></View>
          </View>
        </View>
        <View style={fork_styles.vline_wrapper}>
          <View style={[fork_styles.vline,
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
        scrollstyle: styles.scroll,
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
      matches,
      ...props
    } = this.props;

    var tslength = _const.slength + 2 * _cvals.dscale
    var height = Math.pow(2, this.props.matches.length - 1) * (_cvals.brickheight + 1)
    var width = _cvals.bricklength * (this.props.matches.length) + 20

    var columns = [];
    for (var i = 0; i < this.props.matches.length - 1; i++) {
        columns.push(<ForkColumn navigator={this.props.navigator}
                        level={i}
                        column={this.props.matches[i]}
                        key={i} />);
    }

    if (Platform.OS ==='ios') {
        return (
            <ScrollView showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        style={{height: 500 * _cvals.dsc}}
                        contentContainerStyle={[styles.scroll, {height: height + 10, width: width}]}
                        >
              <View style={styles.container}>
              {columns}
              <Final data={this.props.matches[this.props.matches.length - 1]}
                     level={this.props.matches.length - 1}
                     marginBottom={height / 2}
                     navigator={this.props.navigator} />
              </View>
            </ScrollView>
        );
    }
    else {
        return (
          <ScrollView>
            <ScrollView showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        style={{height: 500 * _cvals.dsc}}
                        contentContainerStyle={[styles.scroll, {height: height + 10, width: width}]}
                        horizontal={true}>
              <View style={styles.container}>
              {columns}
              <Final data={this.props.matches[this.props.matches.length - 1]}
                     level={this.props.matches.length - 1}
                     marginBottom={height / 2}
                     navigator={this.props.navigator} />
              </View>
            </ScrollView>
          </ScrollView>
        );
    }
  },

});

var Final = React.createClass({
  getInitialState: function() {
    // TODO: CHECK MATH HERE
    var fmargin = getForkMargin(this.props.level)
    var fheight = getForkHeight(this.props.level)

    if (this.props.level == 0) {
      fmargin = 0
    }

    return (
      {
        match: this.props.data,
        fmargin: fmargin,
        fheight: fheight,
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
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
      <View style={styles.column}>
      <View style={[styles.fork_wrapper, ]}>
        <View style={[styles.fork ]}>
          <View style={[{marginTop: this.state.fmargin}]}>
            <MatchBrick matchid={this.props.data}
                         navigator={this.props.navigator} />
            <View style={[_cstyles.hline, styles.hline, ]}></View>
          </View>
        </View>
      </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  scroll: {
    justifyContent: 'center'
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
    backgroundColor: 'black',
    height: 1,
  },
  vline: {
    //marginVertical: 1
    flex: 1,
    backgroundColor: 'black',
  }
})


module.exports = Bracket;
