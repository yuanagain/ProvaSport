'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')
import * as _ctools from '../libs/customtools.js'
var SimpleRow = require('../smallparts/simplerow')


var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} = React;

var TeamBlock = React.createClass({
  getInitialState: function() {
    return (
      {

      }
    );
  },
  getDefaultProps() {
    return (
      {
        title: 'Title',
        value: 'Value'
      }
    )
  },
  render: function() {
    var {
      title,
      value,
      team,
      navigator,
      ...props
    } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <SimpleRow title={this.props.title}
                   value={this.props.value} />
      </TouchableOpacity>
    );
  },

  onPress: function() {
      var TeamPage = require('../screens/teampage')
      this.props.navigator.push({
        id: "TeamPage" + String(_ctools.randomKey()),
        component: TeamPage,
        passProps: {
          navigator: this.props.navigator
        }
      })
    },
});

var styles = StyleSheet.create({
  values: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: windowSize.width / 2 - _cvals.stdmargin
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    width: windowSize.width / 2
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 0,
    paddingRight: _cvals.stdmargin,
    width: windowSize.width
  },
})

module.exports = TeamBlock;
