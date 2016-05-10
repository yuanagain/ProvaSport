'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')

import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} = React;

var Header = React.createClass({

  getInitialState: function() {
    var rstyle = styles.disabled
    var lstyle = styles.disabled

    if (this.props.mode == 'nav') {
      lstyle = {}
    }

    return (
      {
        rstyle: rstyle,
        lstyle: lstyle
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
        title: '',
        mode: 'normal',
      }
    )
  },
  render: function() {
    var {
      title,
      mode,
      navigator,
      ...props
    } = this.props;
    return (
      <View style={_cstyles.header_container}>
        <TouchableOpacity onPress={this.goBack}
                          style={[styles.button, ]}>
          <Image style={[_cstyles.left_arrow, this.state.lstyle]}
                 source={require('../assets/leftechelon.png')}/>
        </TouchableOpacity>
        <Text style={_cstyles.title_text}>
          {this.props.title}
        </Text>
        <TouchableOpacity onPress={this.goBack}
                          style={styles.button}>
          <Image style={[_cstyles.right_arrow, this.state.rstyle]}
                 source={require('../assets/rightechelon.png')}/>
        </TouchableOpacity>
      </View>
    )

  },

  goBack: function() {
    if (this.props.mode == 'nav') {
      this.props.navigator.pop()
    }
  },
})

var styles = StyleSheet.create({
  button: {
    height: 40 * _cvals.dscale,
    width: 40 * _cvals.dscale,
  },
  disabled: {
    opacity: 0.0
  }
})

module.exports = Header;
