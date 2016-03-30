'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');

var windowSize = Dimensions.get('window');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image
} = React;

let _cvals = require('./customvals')

/* using multiple styles: <View style={[styles.element, this.props.elementStyle]} /> */
var CustomStyles = StyleSheet.create({
  title_text: {
    color: 'white',
    fontSize: 30 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingTop: 30 * _cvals.dscale,
    paddingBottom: 5,
  },
  section_header_text: {
    color: 'black',
    fontSize: 26 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
    paddingHorizontal: 10 * _cvals.dscale,
  },
  standard_text: {
    color: 'black',
    fontSize: 20 * _cvals.dscale,
    fontFamily: _cvals.mainfont,
  },
  header_container: {
    height: _cvals.headerHeight,
    width: windowSize.width,
    alignItems: 'center',
    backgroundColor: _cvals.skblue,
    justifyContent: 'flex-end',
  },
  buttons_container: {
    width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    flex: 0,
    backgroundColor: 'transparent',
  },
  wide_button: {
    color: 'white',
    //height: windowSize.height * 1 / 10,
    //width: windowSize.width,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    fontSize: 24 * _cvals.dscale,
    textAlign: 'center',
    backgroundColor: _cvals.skorange,
    width: windowSize.width,
    padding: 6 * _cvals.dscale,
    fontFamily: 'avenir',
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1}
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    // marginVertical: 0.5,
    width: windowSize.width
  },
  section_divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    marginVertical: 0.5,
    width: windowSize.width
  },
  indented_container: {
    marginLeft: 40 * _cvals.dscale,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  centeredText: {
    textAlign: 'center',
  },
  centering_wrap: {
    justifyContent: 'center',
    width: 60 * _cvals.dscale
  },
  close: {
    height: 20 * _cvals.dscale,
    width: 20 * _cvals.dscale
  },
  add: {
    height: 30 * _cvals.dscale,
    width: 30 * _cvals.dscale
  }
})

module.exports = CustomStyles;
